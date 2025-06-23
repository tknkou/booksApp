import {z} from "zod";

export const createAuthorSchema = z.object({
  name: z.string().min(1),
})

export const updateAuthorSchema = createAuthorSchema.partial();

export const deleteAuthorSchema = z.object({
  id: z.string().min(1, "IDは必須です"),
});

export const getAuthorByIdSchema = z.object({
  id: z.string().min(1, "IDは必須です"),
});