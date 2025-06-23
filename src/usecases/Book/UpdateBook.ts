import { Book } from "../../domain/entities/book";
import { IBooksRepository } from "src/domain/repositories/IBooksRepository";

export class UpdateBook {
  constructor(private booksRepository: IBooksRepository){}

  async execute(_id: string, updates:{
    title?: string;
    isbn?: string;
    author_id?: string;
    category_id?: string
    }
  ): Promise<Book>{

    const existingBook = await this.booksRepository.findById(_id);

    if(!existingBook){
    throw new Error("Book is not found");
    }
    
    const updatedData = {
      title: updates.title || existingBook.title,
      isbn: updates.isbn || existingBook.isbn,
      author_id: updates.author_id || existingBook.author_id,
      category_id: updates.category_id || existingBook.category_id,
      updated_at: new Date(),
    }
    console.log("Corrected Updates object:", updatedData);
    return await this.booksRepository.update(_id, updatedData);
  }
}