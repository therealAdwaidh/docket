import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs"; // using bcryptjs for compatibility

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: "User already exists." },
      { status: 400 }
    );
  }

  const hashed = await hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashed },
  });

  return NextResponse.json({ ok: true, user });
}
