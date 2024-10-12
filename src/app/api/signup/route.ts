import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const salt = bcrypt.genSaltSync();

  let user;

  try {
    user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
      },
    });
  } catch (e) {
    prisma.$disconnect();
    return NextResponse.json({ error: "User already exist" }, { status: 401 });
  }

  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
      time: Date.now(),
    },
    "hello",
    { expiresIn: "8h" }
  );

  const response = NextResponse.json(user, {
    status: 200,
  });

  response.cookies.set("JIFFYFY_ACCESS_TOKEN", token, {
    httpOnly: true,
    maxAge: 8 * 60 * 60,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  prisma.$disconnect();
  return response;
}
