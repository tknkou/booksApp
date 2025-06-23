import { normalize } from "path";
import { IAuthorRepository } from "src/domain/repositories/IAuthorRepository";

export class DeleteAuthor {
  constructor(private authorRepository: IAuthorRepository){}

  async execute(id: string):Promise<void>{
    await this.authorRepository.delete(id);
  
  }
}