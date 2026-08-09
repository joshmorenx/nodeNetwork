// Elimina el caché de pre-bundlización de Vite (node_modules/.vite).
// Evita errores de interop CJS/ESM como "styled_default is not a function"
// cuando las dependencias (@mui, @emotion, etc.) cambian entre instalaciones.
const fs = require('fs');
const path = require('path');

const viteCacheDir = path.join(process.cwd(), 'node_modules', '.vite');

try {
    if (fs.existsSync(viteCacheDir)) {
        fs.rmSync(viteCacheDir, { recursive: true, force: true });
        console.log('[postinstall] Caché de Vite eliminada:', viteCacheDir);
    } else {
        console.log('[postinstall] No hay caché de Vite que limpiar.');
    }
} catch (error) {
    console.warn('[postinstall] No se pudo limpiar la caché de Vite:', error.message);
}
