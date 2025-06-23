
export class Book {
  private _id: string | null;
  private _title: string;
  private _isbn: string | null; // unique nullable
  private _author_id: string | null; // id user_comes in/ nullable
  private _category_id: string | null; // nullable
  private _created_at: Date; 
  private _updated_at: Date;
  constructor(id: string | null, title:string, isbn: string | null, author_id: string | null, category_id: string | null, created_at: Date, updated_at: Date,
  ){
    this._id = id;
    this._title = title;
    this._isbn = isbn; 
    this._author_id = author_id; 
    this._category_id = category_id; 
    this._created_at = created_at; 
    this._updated_at = updated_at;   
  }
  get id():string | null{
    return this._id;
  }
  set id(newId: string){
    this._id = newId;
  }

  get title(){
    return this._title;
  }
  set title(newTitle: string){
    this._title = newTitle;
  }

  get isbn(): string | null{
    return this._isbn;
  }
  set isbn(newIsbn: string | null){
    this._isbn = newIsbn;
  }

  get author_id(): string | null {
  return this._author_id;
  }
  set author_id(newAuthor_id: string | null){
    this._author_id = newAuthor_id;
  }

  get category_id(): string | null{
    return this._category_id;
  }
  set category_id(newCategory_id: string | null){
    this._category_id = newCategory_id;
  }

  get created_at(){
    return this._created_at;
  }
  set created_at(newCreated_at: Date){
    this._created_at = newCreated_at;
  }

  get updated_at(){
    return this._updated_at;
  }
  set updated_at(newUpdated_at: Date){
    this._updated_at = newUpdated_at;
  }
  
}