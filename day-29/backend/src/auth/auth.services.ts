import "dotenv/config";
import prisma from "../db/database.js";
import bcrypt from "bcrypt";
import type { UserRole } from "../generated/prisma/enums.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export async function registerUser(
  name: string,
  email: string,
  password: string,
  role: UserRole,
) {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("EMAIL ALREADY EXISTS");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role,
    },
    select: {
      id: true,
      name: true,
      role: true,
      email: true,
      createdAt: true,
    },
  });

  const token = jwt.sign(
    {
      userId: user.id,
      userRole: user.role,
    },
    JWT_SECRET!,
    { expiresIn: "12h" },
  );

  return {
    user,
    token,
  };
}

export async function loginUser(email: string, password: string) {
  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (!userExists) {
    throw new Error("INVALID CREDENTIALS");
  }

  const validPassword = await bcrypt.compare(password, userExists.passwordHash);

  if (!validPassword) {
    throw new Error("INVALID CREDENTIALS");
  }

  const token = jwt.sign(
    { userId: userExists.id, userRole: userExists.role },
    JWT_SECRET!,
    {
      expiresIn: "12h",
    },
  );

  return {
    user: {
      id: userExists.id,
      name: userExists.name,
      email: userExists.email,
      role: userExists.role,
      createdAt: userExists.createdAt,
    },
    token,
  };
}
