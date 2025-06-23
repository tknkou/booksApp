import { Request, Response } from "express";
import { CreateAuthor } from "../usecases/Author/CreateAuthor";
import { DeleteAuthor } from "../usecases/Author/DeleteAuthor";
import { GetAuthorById } from "../usecases/Author/GetAuthorByID";
import { ListAuthors } from "../usecases/Author/LIstAuthors";
import { UpdateAuthor } from "../usecases/Author/UpdateAuthor";
import { createAuthorSchema,deleteAuthorSchema, updateAuthorSchema, getAuthorByIdSchema, } from "@validation/authorSchema"; 
import { Author } from "src/domain/entities/author";
export class AuthorControllers{
  constructor(private readonly useCases:{
    createAuthorUsecase: CreateAuthor,
    deleteAuthorUsecase: DeleteAuthor,
    getAuthorByIdUsecase: GetAuthorById,
    listAuthorsUsecase: ListAuthors,
    updateAuthorUsecase: UpdateAuthor,
  }){}

  async create(req: Request, res: Response){
    try{
      const validatedData = createAuthorSchema.parse(req.body);

      const authorData = new Author(
        null, 
        validatedData.name,
        new Date(),
        new Date(),
      )
      const result = await this.useCases.createAuthorUsecase.execute(authorData);
      res.status(201).json(result);
    }catch(error){
      if(error instanceof Error){
        res.status(400).json({"error": error.message})
      }else{
        res.status(400).json({"error": "unknown error occured"});
      }
      
    }
  }

  async delete(req: Request, res: Response){
    try {
      //requestのparamsにあるidを受け取り、変数に格納
      const id = req.params.id;
      const validatedData = deleteAuthorSchema.parse({id});
      await this.useCases.deleteAuthorUsecase.execute(validatedData.id);
      res.status(204).json({"message": "Author deleted correctly"});
    } catch (error: any) {
      if(error.message.startsWith("404")){
        res.status(404).json({error: "Author not found"});
      }else{
       res.status(500).json({error: "unknown error occured"}); 
      }
    }
  }

  async getAuthorById(req: Request, res: Response){
    try {
      console.log('req.params.id:', req.params.id);  // ここを追加
      const id = req.params.id;
      const validatedData = getAuthorByIdSchema.parse({id});
      const result = await this.useCases.getAuthorByIdUsecase.execute(validatedData.id);
      res.status(200).json(result);
    } catch (error: any) {
      console.error('Error in getAuthorById:', error);
      if(error.message.startsWith("404")){
        res.status(404).json({error: "Author not found"});
      }else{
        res.status(400).json({"error": "unknown error occured"});
      }
    }
  }

  async listAuthors(req:Request, res: Response){
    try {
      const result = await this.useCases.listAuthorsUsecase.execute();
      res.status(201).json(result); 
    } catch (error :any) {
      console.error('Error in getAuthorById:', error);
      if(error.message.startsWith("404")){
        res.status(404).json({error: "Author not found"});
      }else{
        res.status(400).json({"error": "Unknown error occured"});
      }
    }
  }

  async updateAuthor(req:Request, res: Response){
      try {
        const id = req.params.id;
        const body = req.body;

        const validatedData = updateAuthorSchema.parse({id, ...body});

        const result = await this.useCases.updateAuthorUsecase.execute(id, validatedData.name);

        res.status(200).json(result);
      } catch (error: any) {
          if(error.message.startsWith("404")){
        res.status(404).json({error: "Author not found"});
        }else{
          res.status(400).json({"error": "Unknown error occured"});
      }
      }
    }
}