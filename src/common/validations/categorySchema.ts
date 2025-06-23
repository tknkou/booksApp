import {z} from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
})

export const updateCategorySchema = z.object({
  id: z.string().min(1),
  name: z.string().optional(),
  description: z.string().optional(),
})

export const deleteCategorySchema = z.object({
  id: z.string().min(1, "IDは必須です"),
});

export const getCategoryByIdSchema = z.object({
  id: z.string().min(1, "IDは必須です"),
});