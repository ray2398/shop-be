import { Request, Response } from "express";
import { getAll } from "../services/producto";

const getAllProducts = async ({ body }: Request, res: Response) => {
  const responseProducts = await getAll();
  res.send(responseProducts);
};

export { getAllProducts };
