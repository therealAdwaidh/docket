import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
  request: Request,
   context: { params:Promise< { id: string }> }
  ) {
    const {params} = await context;
  const session = await getServerSession(authOptions);
  if (!session)
  {
     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
    
  const { title, completed } = await request.json();
  const todo = await prisma.todo.updateMany({
    where: { id: (await params).id, userId: session.user.id },
    data: { title, completed },
  });
  return NextResponse.json(todo);
}

export async function DELETE(
  request: Request,
     context: { params: Promise<{ id: string }> }
    ) {
      const {params} = await context;

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.todo.deleteMany({
    where: { id:  (await params).id, userId: session.user.id },
  });
  return NextResponse.json({ success: true });
}
