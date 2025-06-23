import { resourceUsage } from "process";
import { ICategoryRepository } from "src/domain/repositories/ICategoryRepository";

export class DeleteCategory{
  constructor(private categoryRepository: ICategoryRepository){}

  async execute(id: string):Promise<void>{
    await this.categoryRepository.delete(id);  
    }
}