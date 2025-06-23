import { Book } from "../../domain/entities/book";
import { IBooksRepository } from "src/domain/repositories/IBooksRepository";

export class ListBooks {
  constructor(private booksRepository: IBooksRepository){}

  async execute(): Promise<Book[]>{
    return await this.booksRepository.findAll(); 
  }
}