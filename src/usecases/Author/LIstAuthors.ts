import { IAuthorRepository } from "src/domain/repositories/IAuthorRepository";

export class ListAuthors{
  constructor(private authorRepository: IAuthorRepository){}

  async execute(){
    return this.authorRepository.findAll();
  }
}