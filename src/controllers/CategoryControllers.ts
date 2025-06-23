import { Request, Response } from "express";
import { CreateCategory } from "../usecases/Category/CreateCategory";
import { DeleteCategory } from "../usecases/Category/DeleteCategory";
import { GetCategoryById } from "../usecases/Category/GetCategoryById";
import { ListCategories } from "../usecases/Category/ListCategories";
import { UpdateCategory } from "../usecases/Category/UpdateCategory";
import { createCategorySchema, updateCategorySchema, deleteCategorySchema, getCategoryByIdSchema, } from "@validation/categorySchema";
import { Book_category } from "src/domain/entities/book_category";

export class CategoryControllers{
  constructor(private readonly useCases:{
    createCategoryUsecase: CreateCategory,
    deleteCategoryUsecase: DeleteCategory,
    getCategoryByIdUsecase: GetCategoryById,
    listCategoriesUsecase: ListCategories,
    updateCategoryUsecase: UpdateCategory,
  }){}

  async createCategory(req: Request, res: Response){
    try{
      const validatedData = createCategorySchema.parse(req.body);
      const categoryData = new Book_category(
        null,
        validatedData.name,
        validatedData.description??null,
        new Date(),
        new Date(),
      )
      const result = await this.useCases.createCategoryUsecase.execute(categoryData);
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
      const validatedData = deleteCategorySchema.parse({id});
      //カテゴリ削除のユースケースを実行
      await this.useCases.deleteCategoryUsecase.execute(validatedData.id);
      //正常に終了した場合:204
      res.status(204).json({"message": "Category is deleted correctly." });
    } catch (error: any) {
      if(error.message.startsWith("404")){
        res.status(404).json({error: "Category not found"})
      }else{
        //予期せぬエラー:500
        res.status(500).json({error: "Unknown error occurred"})
      }
    }
  }

  async getCategoryById(req: Request, res: Response){
    try {
      const id = req.params.id;
      const validatedData = getCategoryByIdSchema.parse({id});
      const result = await this.useCases.getCategoryByIdUsecase.execute(validatedData.id);
      res.status(200).json(result);
    } catch (error: any) {
      if(error.message.startsWith("404")){
        res.status(404).json({error: "Category not found"})
      }else{
        res.status(400).json({"error": "unknown error occured"});
      }
    }
  }

  async listCategories(req:Request, res: Response){
    try {
      const result = await this.useCases.listCategoriesUsecase.execute();
      res.status(201).json(result); 
    } catch (error:any) {
      if(error.message.startsWith("404")){
        res.status(404).json({error: "Category not found"})
      }else{
        res.status(400).json({"error": "Unknown error occured"});
      }
    }
  }

  async updateCategory(req:Request, res: Response){
      try {
        const id = req.params.id;
        const body = req.body;
        const validatedData = updateCategorySchema.parse({id, ...body});
        const result = await this.useCases.updateCategoryUsecase.execute(
          validatedData.id, 
          validatedData.name, 
          validatedData.description
        );
        res.status(200).json(result);
      } catch (error:any) {
          if(error.message.startsWith("404")){
        res.status(404).json({error: "Category not found"})
        }else{
          res.status(400).json({"error": "Unknown error occured"});
      }
      }
    }
}