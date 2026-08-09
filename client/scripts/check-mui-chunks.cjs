// Verifica que los chunks de MUI pre-bundlizados por Vite (node_modules/.vite/deps)
// se inicialicen correctamente. Detecta de forma temprana el bug de interop
// CJS/ESM del optimizador de dependencias de Vite ("styled_default is not a
// function") que provoca una pantalla negra en el navegador.
//
// La comprobación reproduce el test manual de Node: importa los chunks ESM
// generados por Vite y confirma que las exportaciones clave de MUI (`styled`,
// `createTheme`) sean funciones reales, no `undefined`.
//
// ORDEN DE IMPORTS: los módulos de MUI usan inicialización perezosa (init_*()),
// así que el chunk de estilos (donde se inicializa `styled`) debe evaluarse
// ANTES que el chunk principal, igual que hace la app en el navegador (importa
// @mui/material/styles al inicio para crear el tema). Se validan TODOS los
// chunks @mui/* (intencionalmente conservador: aunque el navegador no cargue
// algunos subchunks de iconos, cualquier chunk mal cableado debe detectarse).
//
// Requisitos: Node >= 22 (detección de sintaxis ESM en archivos .js).
//
// Uso:
//   node scripts/check-mui-chunks.cjs                 # valida la caché existente
//   node scripts/check-mui-chunks.cjs --wait 90       # espera hasta 90s a que Vite construya la caché
//   node scripts/check-mui-chunks.cjs --start-dev     # inicia Vite, espera, valida y lo detiene
//
// Nota: --start-dev requiere que NO haya un servidor en el puerto 5173 (verifica
// el puerto antes de iniciar Vite). El script usa rutas relativas a __dirname.
const { spawnSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const net = require('net');

const clientRoot = path.join(__dirname, '..');
const depsDir = path.join(clientRoot, 'node_modules', '.vite', 'deps');
const metadataPath = path.join(depsDir, '_metadata.json');

const args = process.argv.slice(2);
const startDev = args.includes('--start-dev');
const waitIndex = args.indexOf('--wait');
const waitSeconds = waitIndex !== -1 ? (parseInt(args[waitIndex + 1], 10) || 60) : 0;
const startDevTimeoutMs = 120000;

let exitCode = 0;

const reportFailure = (message) => {
    if (exitCode === 0) {
        console.error(`\n[check-mui-chunks] ERROR: ${message}`);
        console.error('[check-mui-chunks] La caché de pre-bundlización de Vite está corrupta o incompleta.');
        console.error('[check-mui-chunks] Es la causa conocida de la pantalla negra ("styled_default is not a function").');
        console.error('[check-mui-chunks] Solución: "npm run clear:vite-cache" y después "npm run dev".');
        exitCode = 1;
    }
};

const sleep = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);

// Espera a que la caché exista. En modo --start-dev, exige además que la
// metadata sea NUEVA (mtime posterior al arranque de Vite), porque `vite --force`
// borra y reconstruye la caché y no queremos validar metadata de una corrida vieja.
const waitForCache = (timeoutMs, sinceMs) => {
    const cacheReady = () => {
        if (!fs.existsSync(metadataPath)) return false;
        if (sinceMs === 0) return true;
        try {
            return fs.statSync(metadataPath).mtimeMs >= sinceMs;
        } catch (error) {
            return false;
        }
    };

    if (cacheReady()) return;

    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
        sleep(500); // 500ms entre intentos; la caché tarda unos segundos en construirse
        if (cacheReady()) return;
    }
    throw new Error(`No se encontró la caché de Vite tras ${Math.round(timeoutMs / 1000)}s. ` +
        'Inicia el servidor de desarrollo (npm run dev) para que Vite la construya.');
};

// Comprueba (síncrono) si el puerto está ocupado, para avisar antes de lanzar Vite.
// 'localhost' en lugar de '127.0.0.1' porque Vite suele escuchar en loopback IPv6 ([::1]).
const isPortInUse = (port) => {
    const probe = spawnSync(process.execPath, ['-e', `
        const s = require('net').connect({ port: ${port}, host: 'localhost' });
        s.once('connect', () => process.exit(0));
        s.once('error', () => process.exit(1));
    `], { timeout: 3000 });
    return probe.status === 0;
};

// Genera el script ESM inline que Node ejecutará dentro del directorio de la
// caché. Importa todos los chunks @mui/* (estilos primero, luego el principal)
// y verifica los puntos de fallo reales del bug.
const buildEsmCheck = (metadata) => {
    const optimized = metadata.optimized || {};
    const allFiles = Object.keys(optimized)
        .filter((key) => key.startsWith('@mui/'))
        .map((key) => optimized[key].file);

    if (allFiles.length === 0) {
        throw new Error('La metadata de Vite no contiene chunks de MUI (@mui/*).');
    }

    const stylesFile = optimized['@mui/material/styles'] && optimized['@mui/material/styles'].file;
    const mainFile = optimized['@mui/material'] && optimized['@mui/material'].file;

    // Orden equivalente al navegador: estilos -> chunk principal -> resto
    const files = [
        ...(stylesFile ? [stylesFile] : []),
        ...(mainFile ? [mainFile] : []),
        ...allFiles.filter((file) => file !== stylesFile && file !== mainFile),
    ];

    const importLines = files
        .map((file, i) => `import * as chunk${i} from './${file}';`)
        .join('\n');

    const asserts = [];
    const mainIndex = files.indexOf(mainFile);
    const stylesIndex = files.indexOf(stylesFile);

    if (mainIndex !== -1) {
        asserts.push(
            `if (Object.keys(chunk${mainIndex}).length === 0) throw new Error('El chunk @mui/material no exporta nada');`
        );
    }
    if (stylesIndex !== -1) {
        asserts.push(
            `if (typeof chunk${stylesIndex}.styled !== 'function') throw new Error('styled no es una funcion (bug "styled_default is not a function")');`
        );
        asserts.push(
            `if (typeof chunk${stylesIndex}.createTheme !== 'function') throw new Error('createTheme no es una funcion');`
        );
    }

    asserts.push(`console.log('OK: ${files.length} chunks de MUI validados correctamente');`);

    return `${importLines}\n${asserts.join('\n')}`;
};

const runCheck = () => {
    let metadata;
    try {
        metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    } catch (error) {
        throw new Error(`No se pudo leer la metadata de Vite: ${error.message}`);
    }

    const inline = buildEsmCheck(metadata);
    const result = spawnSync(process.execPath, ['--input-type=module', '-e', inline], {
        cwd: depsDir,
        encoding: 'utf8',
        timeout: 60000,
    });

    if (result.error) {
        throw new Error(`No se pudo ejecutar la validación: ${result.error.message}`);
    }
    if (result.status !== 0) {
        throw new Error(`Los chunks de MUI no se inicializan correctamente.\n${result.stdout || ''}${result.stderr || ''}`);
    }

    console.log(`\n[check-mui-chunks] ${(result.stdout || '').trim()}`);
    console.log('[check-mui-chunks] La caché de Vite es válida. ✅');
};

let viteProcess = null;

if (startDev) {
    if (isPortInUse(5173)) {
        reportFailure('Ya hay un servidor escuchando en el puerto 5173. ' +
            'Detén el servidor de desarrollo o usa "npm run check:mui" (sin --start-dev) en su lugar.');
    } else {
        const viteBin = path.join(clientRoot, 'node_modules', 'vite', 'bin', 'vite.js');
        if (!fs.existsSync(viteBin)) {
            reportFailure('vite no está instalado. Ejecuta "npm install" primero.');
        } else {
            console.log('[check-mui-chunks] Iniciando Vite para construir la caché de dependencias...');
            viteProcess = spawn(process.execPath, [viteBin, '--force'], {
                cwd: clientRoot,
                stdio: 'ignore',
                windowsHide: true,
            });
            const startedAt = Date.now();
            try {
                waitForCache(startDevTimeoutMs, startedAt);
            } catch (error) {
                reportFailure(error.message);
            }
        }
    }
} else {
    try {
        waitForCache(waitSeconds * 1000, 0);
    } catch (error) {
        reportFailure(error.message);
    }
}

try {
    runCheck();
} catch (error) {
    reportFailure(error.message);
} finally {
    // IMPORTANTE: detener Vite ANTES de salir (process.exit no ejecuta finally)
    if (viteProcess) {
        viteProcess.kill();
    }
}

process.exit(exitCode);
