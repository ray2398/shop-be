import { Router } from "express";
import { getAllProducts } from "../controllers/producto";

const router = Router();
router.get("/", getAllProducts);

export { router };
