import { z } from "zod";

export const StartGameSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  complexity: z
    .number()
    .min(1)
    .max(10, { message: "Difficulty must be between 1 and 10" }),
});
