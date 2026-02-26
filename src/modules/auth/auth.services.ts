import { db } from "../../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
const SALT_ROUNDS = 10;

const loginHR = async (email: string, password: string) => {
  const user = await db("hr_users").where({ email }).first();
  if (!user) throw new Error("Invalid email or password");

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new Error("Invalid email or password");

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: "8h" },
  );

  return { token, user: { id: user.id, name: user.name, email: user.email } };
};

export const authServices = {
  loginHR,
};
