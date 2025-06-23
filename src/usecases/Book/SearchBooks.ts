import { Book } from "../../domain/entities/book";
import { IBooksRepository } from "src/domain/repositories/IBooksRepository";
import { SearchCriteria } from "../../common/dtos/SearchCriteria";
export class SearchBooks{
  constructor(private booksRepository: IBooksRepository){}

  async execute(criteria: SearchCriteria):Promise<Book[]>{
    return await this.booksRepository.searchBook(criteria)
  }
}