import { Request, Response } from "express";
import { getAll } from "../services/producto";
import { handleHttp } from "../utils/error.handle";

/* Function to get all products. */
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { lastVisible, search } = req.body;
    const responseProducts = await getAll(
      lastVisible as number,
      search as string
    );
    res.status(200).send({ products: responseProducts });
  } catch (error) {
    handleHttp(res, "ERROR_GET_PRODUCTS");
  }
};

export { getAllProducts };
