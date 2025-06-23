export class Author{
  private _id : string | null;
  private _name :string;
  private _created_at: Date;
  private _updated_at: Date;
  constructor(id: string | null, name: string, created_at: Date, updated_at: Date){
    this._id = id;
    this._name = name;
    this._created_at = created_at;
    this._updated_at = updated_at;
  }

  get id(){
    if(!this._id){
      throw new Error("ID is not defined")
    }
    return this._id;
  }
  set id(newId: string){
    this._id = newId;
  }

  get name(){
    return this._name;
  }
  set name(newName: string){
    this._name = newName;
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