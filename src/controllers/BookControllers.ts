import { Request, Response } from "express";
import { CreateBook } from "../usecases/Book/CreateBook";
import { DeleteBook } from "../usecases/Book/DeleteBook";
import { GetBookById } from "../usecases/Book/GetBookById";
import { ListBooks } from "../usecases/Book/ListBooks";
import { SearchBooks } from "../usecases/Book/SearchBooks";
import { UpdateBook } from "../usecases/Book/UpdateBook";
import { createBookSchema, deleteBookSchema, updateBookSchema, searchBooksSchema, getBookByIdSchema, } from "../common/validations/bookSchema";
import { Book } from "src/domain/entities/book";
import { ZodError } from "zod";
import { bookRouter } from "src/routes/bookRoutes";

export class BookControllers {
  constructor(private readonly useCases:{
    createBookUsecase: CreateBook,
    deleteBookUsecase: DeleteBook,
    getBookByIdUsecase: GetBookById,
    listBooksUsecase: ListBooks,
    searchBooksUsecase: SearchBooks,
    updateBookUsecase: UpdateBook,
  }){}

  async create(req: Request, res: Response){
    try{
      //validationを行う
      const validatedData = createBookSchema.parse({
        ...req.body,
        isbn: req.body.isbn??null, 
        author_id: req.body.author_id?? null,
        category_id:req.body.category_id?? null, 
      });
      // console.log("Validated Data:", validatedData); // ログを追加
      //validationgatrueの場合、trueの値を格納
      const bookData: Book=  new Book(
        null,
        validatedData.title,
        validatedData.isbn,
        validatedData.author_id,
        validatedData.category_id,
        new Date(),
        new Date(),
      )
      const result = await this.useCases.createBookUsecase.execute(bookData);
      res.status(201).json(result);
    }catch(error){if(error instanceof Error){
        res.status(400).json({"error": error.message})
      }else{
        res.status(400).json({"error": "unknown error occured"});
      }
      throw error;
    }
  }

  async delete(req: Request, res: Response){
    try {
      //requestのparamsにあるidを受け取り、変数に格納
      const id = req.params.id;
      const validatedData = deleteBookSchema.parse({id});
     console.log("Validated Data:", validatedData); // デバッグ用 
     
      await this.useCases.deleteBookUsecase.execute(validatedData.id);
      res.status(204).json({"message": "book deleted correctly"});
    } catch (error:any) {
      if(error.message.startsWith("404")){
        res.status(404).json({error: "Book not found"});
      }else{
       res.status(400).json({"error": "unknown error occured"}); 
      }
    }
  }

  async getBookById(req: Request, res: Response){
    try {
      const id = req.params.id;
      const validatedData = getBookByIdSchema.parse({id});
      const result = await this.useCases.getBookByIdUsecase.execute(validatedData.id);
      res.status(200).json(result);
    } catch (error: any) {
      if (error instanceof ZodError) { // Zodエラーの場合
        res.status(400).json({ error: "Invalid input format" })
      }else if(error.message.startsWith("404")){
        res.status(404).json({error: "Book not found"});
      }else{
        res.status(400).json({"error": "unknown error occured"});
      }
    }
  }

  async listBooks(req:Request, res: Response){
    try {
      const result = await this.useCases.listBooksUsecase.execute();
      res.status(201).json(result); 
    } catch (error:any) {
      if(error.message.startsWith("404")){
        res.status(404).json({error: "Book not found"});
      }else{
        res.status(400).json({"error": "Unknown error occured"});
      }
    }
  }

  async searchBooks(req: Request, res:Response){
    try {
      const criteria = {
        title: req.query.title as string | undefined,
        author: req.query.author as string | undefined,
        category: req.query.category as string | undefined,
        isbn: req.query.isbn as string | undefined,
      };
      const validatedData = searchBooksSchema.parse(criteria);

      const result = await this.useCases.searchBooksUsecase.execute(validatedData);
      res.status(200).json(result);
    } catch (error : any) {
      if(error.message.startsWith("404")){
        res.status(404).json({error: "Book not found"});
      }else{
        res.status(400).json({"error": "Unknown error occured"});
      }
      }
    }

    async updateBook(req:Request, res: Response){
      try {
        const id = req.params.id;
        const body = req.body;
        const validatedData = updateBookSchema.parse({id, ...body});

        const result = await this.useCases.updateBookUsecase.execute(validatedData.id,{
          title: validatedData.title,
          isbn: validatedData.isbn,
          author_id: validatedData.author_id,
          category_id: validatedData.category_id,
          }
        );

        res.status(200).json(result);
      } catch (error: any) {
          if(error.message.startsWith("404")){
        res.status(404).json({error: "Book not found"});
        }else{
          res.status(400).json({"error": "Unknown error occured"});
      }
      }
    }
  
}