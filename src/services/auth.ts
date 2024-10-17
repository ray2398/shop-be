import { Auth } from "../interfaces/auth.interface";
import { verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";
import DB from "../database/db.json";

const loginUser = async ({ email, password }: Auth) => {
  const checkIs = DB.users.find((u) => u.email === email);
  if (!checkIs) return "NOT_FOUND_USER";

  const passwordHash = checkIs.password;
  const isCorrect = await verified(password, passwordHash);

  if (!isCorrect) return "PASSWORD_INCORRECT";

  const token = generateToken(checkIs.email);
  const data = {
    token,
    user: {
      id: checkIs.id
    },
  };
  return data;
};

const getUser = async (id: number) => {
  const userIs = DB.users.find((u) => u.id === id);
  if (!userIs) throw Error;
  const data = {
    user: {
      name: userIs.name,
      email: userIs.email
    },
  };
  return data;
};

export { loginUser, getUser };
