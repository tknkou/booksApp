import { Author } from "../../domain/entities/author";
import { IAuthorRepository } from "src/domain/repositories/IAuthorRepository";

export class CreateAuthor{
  constructor(private authorRepository: IAuthorRepository){}

    async execute(author: Author){
      return this.authorRepository.create(author);
    }
  
}