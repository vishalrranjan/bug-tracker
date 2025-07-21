import { z } from "zod";

export const bugValidationSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
});

export const statusEnum = z.enum(["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"]);

export const bugUpdateSchema = z.object({
  id: z.number().min(1, "ID is required"),
  status: statusEnum,
});
