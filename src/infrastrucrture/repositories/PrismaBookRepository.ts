import { PrismaClient} from "@generated/client"
import { IBooksRepository } from "src/domain/repositories/IBooksRepository";
import { Book } from "../../domain/entities/book";
import { Book as PrismaBook } from "@generated/client";
import { SearchCriteria } from "../../common/dtos/SearchCriteria";
export class PrismaBookRepository implements IBooksRepository{
  private prisma: PrismaClient;

  constructor(){
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<Book[]> {
    const foundBooks = await this.prisma.$transaction(async (prisma)=>{
      const books = await prisma.book.findMany({
        orderBy: {created_at:"desc"},
      });
      if(!books){
        throw new Error("404: Book is not found");
      }
      return books
    })
    return foundBooks.map(book=> new Book(
      book.id, book.title, book.isbn, book.author_id, book.category_id, book.created_at, book.updated_at
    ));
  }

  async searchBook(criteria: SearchCriteria): Promise<Book[]> {
  // トランザクションで条件を適用して本を検索
  const foundBooks = await this.prisma.$transaction(async (prisma) => {
    const whereClause = {
      ...(criteria.title && { title: { contains: criteria.title } }),
      ...(criteria.name && { author: { name: { contains: criteria.name } } }),
      ...(criteria.category && { category: { name: { contains: criteria.category } } }),
      ...(criteria.isbn && { isbn: criteria.isbn }),
    };

    // 検索クエリ実行
    const result = await prisma.book.findMany({
      where: whereClause,
      orderBy: { created_at: "desc" },
      include: { author: true, category: true },
    });
    if(!result || result.length === 0){
      throw new Error("book is not found");
    }
    // 結果を返す
    return result;
  });

  // 結果を整形して返す
  return foundBooks.map((book) => {
    const authorName = book.author?.name ?? "Unknown";
    const categoryName = book.category?.name ?? "Uncategorized";

    return new Book(
      book.id,
      book.title,
      book.isbn,
      authorName,
      categoryName,
      book.created_at,
      book.updated_at
    );
  });
}

  async findById(id: string): Promise<Book | null> {
    const foundBook = await this.prisma.$transaction(async(prisma)=>{
      const existingbook = await prisma.book.findUnique({
      where:{id}
    });
    if(!existingbook){
      throw new Error("404: Book is not found");
    }
    return existingbook;
    })
    
    return new Book(
      foundBook.id,
      foundBook.title,
      foundBook.isbn,
      foundBook.author_id,
      foundBook.category_id,
      foundBook.created_at,
      foundBook.updated_at
    )
  }

  async create(book: Book): Promise<Book> {
    const createdB = await this.prisma.book.create({
      data: {
        title: book.title,
        isbn: book.isbn,
        author_id: book.author_id,
        category_id: book.category_id, 
      }
    });
    return new Book(
      createdB.id,
      createdB.title,
      createdB.isbn,
      createdB.author_id,
      createdB.category_id,
      createdB.created_at,
      createdB.updated_at,
    )
  }

  async update(id: string, updates: Partial<Book>): Promise<Book> {
    // console.log("updates.title:", updates.title);
    const updatedBook = await this.prisma.$transaction(async (prisma)=>{
      //IDで本があるかチェック
      const existingBook = await prisma.book.findUnique({
        where: {id},
      })
      if(!existingBook){
        throw new Error("404: Book is not found");
      }
      return await prisma.book.update({
        where: {id},
        data: {
          ...(updates.title !== undefined && { title: updates.title }),
          ...(updates.isbn !== undefined && { isbn: updates.isbn }),
          ...(updates.author_id !== undefined && { author_id: updates.author_id }),
          ...(updates.category_id !== undefined && { category_id: updates.category_id }),
        },
      });
    })
    return new Book(
      updatedBook.id,
      updatedBook.title,
      updatedBook.isbn,
      updatedBook.author_id,
      updatedBook.category_id,
      updatedBook.created_at,
      updatedBook.updated_at,
    )
  }
  
  async delete(id: string): Promise<void> {
    await this.prisma.$transaction(async(prisma)=>{
      //IDで本があるかチェック
      const existingBook = await prisma.book.findUnique({
        where: {id},
      })
      if(!existingBook){
        throw new Error("404: Book is not found");
      }
      //bookを削除
      await prisma.book.delete({
        where: {id},
      });
    })
  }
}