import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma/client"; // Adjust the import path as necessary
import {
  bugUpdateSchema,
  bugValidationSchema,
} from "../../../ValidationSchemas/bugValidationSchema";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const { title, description } = await request.json();

  const validation = bugValidationSchema.safeParse({ title, description });

  if (!validation.success) {
    // Optionally map or return directly
    return new Response(JSON.stringify({ error: validation.error.format() }), {
      status: 400,
    });
  }

  // Here you would typically save the bug to a database
  const newBug = await prisma.bug.create({
    data: {
      title: validation.data.title,
      description: validation.data.description,
    },
  });
  // For demonstration, we will just return the data
  return NextResponse.json(newBug, {
    status: 201,
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("bugId");

  if (id) {
    // If id is provided, return the bug with that id
    const bug = await prisma.bug.findUnique({
      where: { id: Number(id) },
    });
    if (!bug) {
      return NextResponse.json({ error: "Bug not found" }, { status: 404 });
    }
    return NextResponse.json(bug, { status: 200 });
  }

  // If no id, return all bugs
  const bugs = await prisma.bug.findMany();
  return NextResponse.json(bugs, { status: 200 });
}

export async function PUT(request: NextRequest) {
  const { id, status } = await request.json();

  const validations = bugUpdateSchema.safeParse({ id, status });

  if (!validations.success) {
    return new Response(JSON.stringify({ error: validations.error.issues }), {
      status: 400,
    });
  }

  try {
    await prisma.bug.update({
      where: { id },
      data: { status },
    });
    revalidatePath(`/issues/${id}`);
    return NextResponse.json(
      { message: "Bug status updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Bug not found or update failed." },
      { status: 404 }
    );
  }
}
