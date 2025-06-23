import { Book_category } from "../../domain/entities/book_category";
import { ICategoryRepository } from "src/domain/repositories/ICategoryRepository";

export class GetCategoryById {
  constructor(private categoryRepository: ICategoryRepository){}

  async execute (id: string): Promise<Book_category| null> {
    return await this.categoryRepository.findById(id);
    
  }
}