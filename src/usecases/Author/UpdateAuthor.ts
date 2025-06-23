import { Author } from "../../domain/entities/author";
import { IAuthorRepository } from "src/domain/repositories/IAuthorRepository";

export class UpdateAuthor{
  constructor(private authorRepository: IAuthorRepository){}

  async execute(_id: string, _name?: string,){

    const existingAuthor = await this.authorRepository.findById(_id);
    if(!existingAuthor){
      throw new Error("Author is not found");
    }
    const updates: Partial<Author> = {
      name: _name!==undefined?_name: existingAuthor.name,
      updated_at: new Date(),
    }
    return await this.authorRepository.update(_id, updates);
  }

  
}