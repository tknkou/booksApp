
import { IBooksRepository } from "src/domain/repositories/IBooksRepository";

export class DeleteBook{
  constructor(private booksRepository: IBooksRepository){}

  async execute(id: string): Promise<void>{
    await this.booksRepository.delete(id)
  }
}