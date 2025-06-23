import { Router } from "express";
import { CategoryControllers } from "../controllers/CategoryControllers";
import { CreateCategory } from "../usecases/Category/CreateCategory";
import { GetCategoryById } from "../usecases/Category/GetCategoryById";
import { DeleteCategory } from "../usecases/Category/DeleteCategory";
import { ListCategories } from "../usecases/Category/ListCategories";
import { UpdateCategory } from "../usecases/Category/UpdateCategory";

export function categoryRouter(useCases: {
  createCategoryUsecase: CreateCategory;
  deleteCategoryUsecase: DeleteCategory;
  getCategoryByIdUsecase: GetCategoryById;
  listCategoriesUsecase: ListCategories;
  updateCategoryUsecase: UpdateCategory;
}) {
  const router = Router();

  // コントローラーのインスタンスを作成
  const controllers = new CategoryControllers(useCases);

  // メソッドを分割代入
  const {
    createCategory,
    getCategoryById,
    delete: deleteCategory,
    listCategories,
    updateCategory,
  } = controllers;

  router.get("/", listCategories.bind(controllers));
  router.get("/:id", getCategoryById.bind(controllers));
  router.post("/", createCategory.bind(controllers));
  router.delete("/:id", deleteCategory.bind(controllers));
  router.put("/:id", updateCategory.bind(controllers));

  return router;
}