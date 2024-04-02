const { request, response } = require("express")
const bcrypt = require("bcrypt");
const User = require("../models/User.js");

const register = async (req = request, res = response) => {
    try {
        const { firstName, lastName, email, username, password, pwdConfirmation } = req.body;
        const existingUser = await User.findOne({ username });
        const existingEmail = await User.findOne({ email });
        errExisting = (err) => {
            return res.status(401).json({ error: err });
        };
        if (firstName=='' || lastName=='' || email=='' || username=='' || password=='' || pwdConfirmation=='') {
            errExisting("Aún faltan datos por llenar");          
        } else if (existingUser && existingEmail) {
            errExisting("El usuario y el correo ya existen");
        } else if (existingUser || existingEmail) {
            errExisting("El usuario o el correo ya existen");
        } else if (password !== pwdConfirmation) {
            errExisting("Las contraseñas no coinciden");
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const lastUser = await User.findOne({}, {}, { sort: { id: -1 } });
            const newId = lastUser ? lastUser.id + 1 : 1;
            const user = new User({ 
                id: newId,
                firstName,
                lastName,
                email,
                username,
                password: hashedPassword,
            });
            
            await user.save();

            return res.status(200).json({ msg: " Usuario registrado con éxito, redirigiendo al inicio de sesión", regState: true });
        }
    } catch (error) {
        return res.status(500).json({ error: "Ha ocurrido un error en el servidor" });
    }
};


module.exports = register;