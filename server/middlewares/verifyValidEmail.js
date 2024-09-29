const dns = require('dns');

const verifyValidEmail = async (req, res, next) => {
    const { option, email } = req.body;

    // Verifica que el formato del correo sea correcto
    try {
        if (option === 'email' || option === 'register') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ message: 'El formato del correo es inválido.' });
            }

            // Extrae el dominio del correo
            const domain = email.split('@')[1];

            // Verifica si el dominio tiene registros MX
            dns.resolveMx(domain, async (err, addresses) => {
                if (err || addresses.length === 0) {
                    return res.status(400).json({ msg: 'Parece que el correo ingresado no es valido', message: 'Parece que el correo ingresado no es valido', regState: false });
                }

                // Si todo es correcto, pasa al siguiente middleware
                await next();
            });
        } else {
            await next();
        }

    } catch (error) {
        return res.status(500).json({ msg: 'Ocurrio un error en el servidor', message: 'Ocurrio un error en el servidor ' })
    }
};

module.exports = verifyValidEmail;
