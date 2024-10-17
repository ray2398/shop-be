import { Request, Response } from "express";
import { loginUser, getUser } from "../services/auth";
import { handleHttp } from "../utils/error.handle";

/* Function to login user. */
const loginCtrl = async ({ body }: Request, res: Response) => {
  const { email, password } = body;
  const responseUser = await loginUser({ email, password });
  res.send(responseUser);
};

/* Function to get one user. */
const userCtrl = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const responseUser = await getUser(Number(id));
    const data = responseUser ? responseUser : "NOT_FOUND";
    res.send(data);
  } catch (error) {
    handleHttp(res, "ERROR_GET_USER");
  }
};

export { loginCtrl, userCtrl };
