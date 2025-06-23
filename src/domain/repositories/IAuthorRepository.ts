import { Author } from "../entities/author";

export interface IAuthorRepository{
  findAll():Promise<Author[]>;
  findById(id: string): Promise<Author | null>;
  create(Author: Author): Promise<Author>;
  update(id: string, updates: Partial<Author>):Promise<Author>;
  delete(id: string): Promise<void>;
}