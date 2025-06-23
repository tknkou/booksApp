import { Book } from "../entities/book";
import { SearchCriteria } from "src/common/dtos/SearchCriteria";
export interface IBooksRepository{
  // 一覧
  findAll(): Promise<Book[]>;
  searchBook(criteria: SearchCriteria):Promise<Book[]>;
  findById(id:string): Promise<Book|null>;
  create(book:Book): Promise<Book>;
  update(id: string, updates: Partial<Book>): Promise<Book>;
  delete(id: string):Promise<void>;
}