import { Router } from "express";
import { usersManager } from "../managers/UsersManager.js";
const router = Router();

router.post('/signup', async (req, res) => {
    const createdUser = await usersManager.createOne(req.body);
    res.status(200).json({ message: "usuario creado con exito.", createdUser });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const userDB = await usersManager.findByEmail(email);
    if(!userDB) {
        return res.json({error: "El usuario o la contraseña son incorrectos."});
    }

    

});

export default router;