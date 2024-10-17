import { Router } from "express";
import { getAllProducts } from "../controllers/producto";
import { checkJwt } from "../middleware/session";

const router = Router();
router.post("/all", checkJwt, getAllProducts);

export { router };
