import { PrismaClient } from "@generated/client";
import { IAuthorRepository } from "src/domain/repositories/IAuthorRepository";
import { Author } from "../../domain/entities/author";

export class PrismaAuthorRepository implements IAuthorRepository{
  private prisma: PrismaClient;

  constructor(){
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<Author[]> {
    const foundAuthors = await this.prisma.$transaction(async(prisma)=>{
      const authors = await prisma.author.findMany({
       orderBy: { name: "asc" }, // 名前順に並べる（昇順）
      });
      if(!authors){
        throw new Error("404: Author is not found");
      }
      return authors;
    })
    return foundAuthors.map(author=> new Author(
      author.id, author.name, author.created_at, author.updated_at
    ));
  }

  async findById(id: string): Promise<Author | null> {
    const foundAuthor = await this.prisma.$transaction(async(prisma)=>{
      const author = await prisma.author.findUnique({
      where:{id}
    });
    if(!author){
      throw new Error("404: Author is not found");
    }
    return author;
    })
    return new Author(
      foundAuthor.id,
      foundAuthor.name,
      foundAuthor.created_at,
      foundAuthor.updated_at
    )
  }

  async create(author: Author): Promise<Author> {
    const createdA = await this.prisma.author.create({
      data: { name: author.name, }
    });
    return new Author(
      createdA.id,
      createdA.name,
      createdA.created_at,
      createdA.updated_at
    )
  }

  async update(id: string, updates: Partial<Author>): Promise<Author> {
    const updatedAuthor = await this.prisma.$transaction(async (prisma)=>{
      const existingAuthor = await prisma.author.findUnique({
        where: {id},
      });
      if(!existingAuthor){
        throw new Error("404: Author is not found");
      }
      return await prisma.author.update({
      where: {id},
      data: updates,
      });
    });
    
    return new Author(
      updatedAuthor.id,
      updatedAuthor.name,
      updatedAuthor.created_at,
      updatedAuthor.updated_at
    )
  }
  
  async delete(id: string): Promise<void> {
    //トランザクションの実行
    await this.prisma.$transaction(async (prisma)=>{
      //該当するAuthorが存在するか確認
      const existingAuthor = await prisma.author.findUnique({
        where: {id},
      });
      if(!existingAuthor){
        throw new Error("404: Category not found");
      }
      //関連するbookのcauthor_idをnullに更新
      await prisma.book.updateMany({
        where: {author_id: id},
        data: {category_id: null},
      });
      //Authorを削除
      await prisma.author.delete({
        where: {id},
      });
    });
  }
}