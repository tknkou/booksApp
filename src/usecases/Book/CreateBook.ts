import { Book } from "../../domain/entities/book";
import { IBooksRepository } from "src/domain/repositories/IBooksRepository";

export class CreateBook{
   constructor(private booksRepository: IBooksRepository){}

   async execute (book: Book): Promise<Book>{
    return this.booksRepository.create(book);
   }
} 