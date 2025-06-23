import { IAuthorRepository } from "src/domain/repositories/IAuthorRepository";

export class GetAuthorById {
  constructor(private authorRepository: IAuthorRepository){}

  async execute(id: string){
    return await this.authorRepository.findById(id);
  }
}