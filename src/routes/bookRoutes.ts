import { Router } from "express";
import { BookControllers } from "../controllers/BookControllers";
import { CreateBook } from "../usecases/Book/CreateBook";
import { GetBookById } from "../usecases/Book/GetBookById";
import { DeleteBook } from "../usecases/Book/DeleteBook";
import { ListBooks } from "../usecases/Book/ListBooks";
import { UpdateBook } from "../usecases/Book/UpdateBook";
import { SearchBooks } from "../usecases/Book/SearchBooks";
import { CategoryControllers } from "../controllers/CategoryControllers";

export function bookRouter(useCases:{createBookUsecase: CreateBook;
  deleteBookUsecase: DeleteBook;
  getBookByIdUsecase: GetBookById;
  listBooksUsecase: ListBooks;
  updateBookUsecase: UpdateBook;
  searchBooksUsecase: SearchBooks;
}){
  const router = Router();
  const controllers = new BookControllers(useCases);

  const {
    create: createBook,
    getBookById,
    delete: deleteBook,
    listBooks,
    updateBook,
    searchBooks,
  } = controllers;
 
  router.get("/", listBooks.bind(controllers));
  router.get("/:id", getBookById.bind(controllers));
  router.post("/", createBook.bind(controllers));
  router.delete("/:id", deleteBook.bind(controllers));
  router.put("/:id", updateBook.bind(controllers));
  router.get("/search", searchBooks.bind(controllers));

  return router;
}