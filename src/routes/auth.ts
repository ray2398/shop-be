import { Router } from "express";
import { loginCtrl, userCtrl } from "../controllers/auth";
import { checkJwt } from "../middleware/session";

const router = Router();
router.post("/login", loginCtrl);
router.get("/user/:id", checkJwt, userCtrl);

export { router };
