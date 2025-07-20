import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma/client"; // Adjust the import path as necessary
import { bugValidationSchema } from "../../../ValidationSchemas/bugValidationSchema";

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
  //   return new Response(JSON.stringify({ title, description }), {
  //     status: 201,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
}
