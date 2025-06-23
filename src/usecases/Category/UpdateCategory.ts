import { Book_category } from "../../domain/entities/book_category";
import { ICategoryRepository } from "src/domain/repositories/ICategoryRepository";

export class UpdateCategory{
  constructor(private categoryRepository: ICategoryRepository){}

  async execute(_id: string, _name?: string, _description?: string){
    const existingCategory = await this.categoryRepository.findById(_id);
    if(!existingCategory){
      throw new Error("Category is not found");
    }
    const updates: Partial<Book_category> = {
      name:_name !== undefined ? _name: existingCategory.name,
      description: _description !== undefined ? _description: existingCategory.description,
      updated_at: new Date(),
    }
    return await this.categoryRepository.update(_id, updates);
  }
}