import { Book_category } from "../../domain/entities/book_category";
import { ICategoryRepository } from "src/domain/repositories/ICategoryRepository";

export class ListCategories { 
  constructor(private categoryRepository: ICategoryRepository){}

  async execute(): Promise<Book_category[] | null>{
    return await this.categoryRepository.findAll();
  }
  
}