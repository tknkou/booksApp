import {z} from "zod";

export const createBookSchema = z.object({
  title: z.string().min(1),
  isbn: z.string().nullable().default(null),
  author_id: z.string().nullable().default(null),
  category_id: z.string().nullable().default(null),
})

export const updateBookSchema = z.object({
  id: z.string().min(1),
  title: z.string().optional(),
  isbn: z.string().optional(),
  author_id: z.string().optional(),
  category_id: z.string().optional(),
});

export const deleteBookSchema = z.object({
  id: z.string().min(1, "IDは必須です"),
});

export const getBookByIdSchema = z.object({
  id: z.string().min(1, "IDは必須です"),
});

export const searchBooksSchema = z.object({
  title: z.string().optional(),
  author_id: z.string().optional(),
  isbn: z.string().optional(),
  category_id: z.string().optional(),
});
