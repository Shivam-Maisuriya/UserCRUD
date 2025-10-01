import { Router } from "express";
import { ChangePassword, Login, SignUp, Update } from "../controller/user.controller.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = Router()

router.get("/SignUp", SignUp);
router.get("/Login", Login);
router.get("/Update", verifyJWT, Update);
router.get("/ChangePassword", verifyJWT, ChangePassword);

export default router;