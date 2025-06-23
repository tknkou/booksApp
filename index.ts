import express from "express";
import { PrismaBookRepository } from "./src/infrastrucrture/repositories/PrismaBookRepository";
import { PrismaAuthorRepository } from "./src/infrastrucrture/repositories/PrismaAuthorRepository";
import { PrismaCategoryRepository } from "./src/infrastrucrture/repositories/PrismaCategpryRepository";
import { CreateBook } from "./src/usecases/Book/CreateBook";
import { UpdateBook } from "./src/usecases/Book/UpdateBook";
import { DeleteBook } from "./src/usecases/Book/DeleteBook";
import { GetBookById } from "./src/usecases/Book/GetBookById";
import { ListBooks } from "./src/usecases/Book/ListBooks";
import { SearchBooks } from "./src/usecases/Book/SearchBooks";
import { CreateAuthor } from "./src/usecases/Author/CreateAuthor";
import { UpdateAuthor } from "./src/usecases/Author/UpdateAuthor";
import { DeleteAuthor } from "./src/usecases/Author/DeleteAuthor";
import { ListAuthors } from "./src/usecases/Author/LIstAuthors";
import { GetAuthorById } from "./src/usecases/Author/GetAuthorByID";
import { CreateCategory } from "./src/usecases/Category/CreateCategory";
import { DeleteCategory } from "./src/usecases/Category/DeleteCategory";
import { UpdateCategory } from "./src/usecases/Category/UpdateCategory";
import { ListCategories } from "./src/usecases/Category/ListCategories";
import { GetCategoryById } from "./src/usecases/Category/GetCategoryById";
import { bookRouter } from "./src/routes/bookRoutes";
import { categoryRouter } from "./src/routes/categoryRoutes";
import { authorRouter } from "./src/routes/authorRouts";

const app = express();

app.use(express.json());

const prismaBookRepo = new PrismaBookRepository();
const prismaAuthorRepo = new PrismaAuthorRepository();
const prismaCategoryRepo = new PrismaCategoryRepository();
//本作成の操作を実行  ユースケース＋レポジトリの実装
const createBookUsecase = new CreateBook(prismaBookRepo);
const deleteBookUsecase = new DeleteBook(prismaBookRepo);
const updateBookUsecase = new UpdateBook(prismaBookRepo);
const searchBooksUsecase = new SearchBooks(prismaBookRepo);
const getBookByIdUsecase = new GetBookById(prismaBookRepo)
const listBooksUsecase = new ListBooks(prismaBookRepo);

const createCategoryUsecase = new CreateCategory(prismaCategoryRepo);
const deleteCategoryUsecase = new DeleteCategory(prismaCategoryRepo);
const updateCategoryUsecase = new UpdateCategory(prismaCategoryRepo);
const getCategoryByIdUsecase = new GetCategoryById(prismaCategoryRepo)
const listCategoriesUsecase = new ListCategories(prismaCategoryRepo);

const createAuthorUsecase = new CreateAuthor(prismaAuthorRepo);
const deleteAuthorUsecase = new DeleteAuthor(prismaAuthorRepo);
const updateAuthorUsecase = new UpdateAuthor(prismaAuthorRepo);
const getAuthorByIdUsecase = new GetAuthorById(prismaAuthorRepo)
const listAuthorsUsecase = new ListAuthors(prismaAuthorRepo);

app.use("/book", bookRouter({
  createBookUsecase,
  deleteBookUsecase,
  updateBookUsecase,
  getBookByIdUsecase,
  listBooksUsecase,
  searchBooksUsecase,
}));

app.use("/category", categoryRouter({
  createCategoryUsecase,
  deleteCategoryUsecase,
  updateCategoryUsecase,
  getCategoryByIdUsecase,
  listCategoriesUsecase,
}));

app.use("/author", authorRouter({
  createAuthorUsecase,
  deleteAuthorUsecase,
  updateAuthorUsecase,
  getAuthorByIdUsecase,
  listAuthorsUsecase,
}));

app.listen(3000, ()=>{
  console.log("Server is running on http://localhost3000");
})