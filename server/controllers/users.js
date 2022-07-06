import { UserModel } from "../models/UserModel.js";
import * as bcrypt from "bcrypt";

export const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await UserModel.findOne({ userName });
        if (!user) {
        res.status(401).json({ error: "User not found" });
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
        res.status(401).json({ error: "Invalid password" });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

export const register = async (req, res) => {
    try {
        const newUser = req.body;
        newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(10));
        const user = new UserModel(newUser);
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}