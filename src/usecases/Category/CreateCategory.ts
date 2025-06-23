import { Book_category } from "../../domain/entities/book_category";
import { ICategoryRepository } from "src/domain/repositories/ICategoryRepository";

export class CreateCategory{
  constructor(private categoryRepository: ICategoryRepository){}

  async execute (book_category: Book_category): Promise<Book_category>{
    return await this.categoryRepository.create(book_category);
  }
}