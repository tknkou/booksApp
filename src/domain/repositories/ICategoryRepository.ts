import { Book_category } from "../entities/book_category";

export interface ICategoryRepository{
  findAll(): Promise<Book_category[] | null>;
  findById(id: string): Promise<Book_category| null>;
  create(book_category: Book_category): Promise<Book_category>;
  update(id: string, updates: Partial<Book_category>): Promise<Book_category>;
  delete(id: string): Promise<void>;
}