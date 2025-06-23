import { PrismaClient} from "@generated/client"
import { ICategoryRepository } from "src/domain/repositories/ICategoryRepository";
import { Book_category } from "../../domain/entities/book_category";

export class PrismaCategoryRepository implements ICategoryRepository{
  private prisma: PrismaClient;

  constructor(){
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<Book_category[] | null> {
    const categories = await this.prisma.category.findMany({
      orderBy: {created_at: "desc"},
    });
    if(!categories){
      throw new Error("404: Category is not found");
    }
    return categories.map(category=> new Book_category(
      category.id, 
      category.name, 
      category.description, 
      category.created_at, 
      category.updated_at
    ));
  }

  async findById(id: string): Promise<Book_category | null> {
    const category = await this.prisma.category.findUnique({
      where:{id}
    });
    if(!category){
      throw new Error("404: Category is not found");
    }
    return new Book_category(
      category.id,
      category.name,
      category.description,
      category.created_at,
      category.updated_at
    )
  }

  async create(category: Book_category): Promise<Book_category> {
    const createdC = await this.prisma.category.create({
      data: { 
        name: category.name, 
        description: category.description,
      }
    });
    return new Book_category(
      createdC.id,
      createdC.name,
      createdC.description,
      createdC.created_at,
      createdC.updated_at
    )
  }

  async update(id: string, updates: Partial<Book_category>): Promise<Book_category> {
  // トランザクション内でカテゴリの更新を実施
  const updatedCategory = await this.prisma.$transaction(async (prisma) => {
    // 該当カテゴリが存在するか確認
    const existingCategory = await prisma.category.findUnique({
      where: { id: id },
    });
    if (!existingCategory) {
      throw new Error("404: Category not found");
    }

    // カテゴリの更新
    return await prisma.category.update({
      where: { id },
      data: updates,
    });
  });

  // トランザクション外で整形
  return new Book_category(
    updatedCategory.id,
    updatedCategory.name,
    updatedCategory.description,
    updatedCategory.created_at,
    updatedCategory.updated_at
  );
}
  
  async delete(id: string): Promise<void> {
    await this.prisma.$transaction(async (prisma)=>{
      //該当カテゴリが存在するか確認
      const existingCategory = await prisma.category.findUnique({
        where : {id},
      });
      if(!existingCategory){
        throw new Error("404: Category not found");
      }
      //関連するbookのcategory_idをnullに更新
      await prisma.book.updateMany({
        where: {category_id: id},
        data: {category_id: null},
      });
      //カテゴリを削除
      await prisma.category.delete({
        where: {id: id},
      });
    });
  }
}