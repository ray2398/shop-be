import { Request, Response } from "express";
import { loginUser } from "../services/auth";

const loginCtrl = async ({ body }: Request, res: Response) => {
  const { email, password } = body;
  const responseUser = await loginUser({ email, password });

  res.send(responseUser);
};

export { loginCtrl };
