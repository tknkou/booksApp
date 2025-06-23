import { Book } from "../../domain/entities/book";
import { IBooksRepository } from "src/domain/repositories/IBooksRepository";

export class GetBookById{
  constructor(private booksRepository: IBooksRepository){}

  async execute(id: string):Promise<Book | null>{
    return this.booksRepository.findById(id); 
  }
}