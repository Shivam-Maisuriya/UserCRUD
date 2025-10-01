import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

const verifyJWT = async (req, res, next) => {
  try {
    // console.log(req.cookies.token)
    const token = req.cookies.token;

    if (!token) {
      return res.status(404).json({ error: "token not found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(400).json({ error: "Wrong token" });
    }

    req.id = decoded.id;

    next();
  } catch (error) {
    console.log("Error in verifing user by id: ", error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

export default verifyJWT;
