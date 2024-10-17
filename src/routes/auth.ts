import { Router } from "express";
import { loginCtrl, userCtrl } from "../controllers/auth";
import { checkJwt } from "../middleware/session";

const router = Router();
router.post("/login", loginCtrl);
router.get("/:id", checkJwt, userCtrl);
router.get("/isauthenticated/token", checkJwt, (req, res) => {
  res.json({
    message: "Token is valid",
  });
});

export { router };
