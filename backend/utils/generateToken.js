import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, ENV_VARS.JWT_SECRET, {expiresIn: "15d"});

    res.cookie("jwt-netflix", token, {
        maxAge: 15 *24 * 60 *60 * 1000,
        httpOnly: true,
        sametime: "strict",
        secure: ENV_VARS.NODE_ENV !== "delevopment", 
    });

    return token;
}