import { Router } from "express";
import { AuthorControllers } from "../controllers/AuthorControllers";
import { CreateAuthor } from "../usecases/Author/CreateAuthor";
import { GetAuthorById } from "../usecases/Author/GetAuthorByID";
import { DeleteAuthor } from "../usecases/Author/DeleteAuthor";
import { UpdateAuthor } from "../usecases/Author/UpdateAuthor";
import { ListAuthors } from "../usecases/Author/LIstAuthors";
export function authorRouter(useCases: {
  createAuthorUsecase: CreateAuthor;
  deleteAuthorUsecase: DeleteAuthor;
  getAuthorByIdUsecase: GetAuthorById;
  listAuthorsUsecase: ListAuthors;
  updateAuthorUsecase: UpdateAuthor;
}) {
  const router = Router();

  // コントローラーのインスタンスを作成
  const controllers = new AuthorControllers(useCases);

  // メソッドを分割代入
  const {
    create: createAuthor,
    getAuthorById,
    delete: deleteCategory,
    listAuthors,
    updateAuthor,
  } = controllers;

  router.get("/", listAuthors.bind(controllers));
  router.get("/:id", getAuthorById.bind(controllers));
  router.post("/", createAuthor.bind(controllers));
  router.delete("/:id", deleteCategory.bind(controllers));
  router.put("/:id", updateAuthor.bind(controllers));

  return router;
}