import { Router } from "express";
import { usersManager } from "../managers/UsersManager.js";
import { hashData, compareData } from "../utils.js";

const router = Router();

router.post('/signup', async (req, res) => {
    const { password } = req.body;
    const hashedPassword = await hashData(password);
    const createdUser = await usersManager.createOne({...req.body, password: hashedPassword});
    res.status(200).json({ message: "usuario creado con exito.", createdUser });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const userDB = await usersManager.findByEmail(email);
    if (!userDB) {
        return res.json({ error: "El usuario o la contraseña son incorrectos." });
    }

    const comparePassword = await compareData(password, userDB.password);

    if(!comparePassword)
        return res.json({ error: "El usuario o la contraseña son incorrectos." });

    req.session["email"] = email;
    req.session["name"] = userDB.name;
    req.session["isAdmin"] = email === "adminCoder@coder.com" && password === "Cod3r123" ? true : false;

    res.redirect("/api/home");

});

router.get("/logout", (req,res) => {
    req.session.destroy(() => { res.redirect("/api/") });
});

export default router;