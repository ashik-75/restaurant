"use server";
// Import Drizzle database instance
import { db } from "@/db/drizzle";
import { category } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

// ✅ Function to add a category
export async function addCategory(name: string) {
  try {
    // Insert new category
    const [newCategory] = await db
      .insert(category)
      .values({ name })
      .returning({ id: category.id });

    if (!newCategory) throw new Error("Failed to create category");

    revalidateTag("categories");

    return { success: true, categoryId: newCategory.id };
  } catch (error) {
    console.error("Error adding category:", error);
    return { success: false, error: "Something went wrong" };
  }
}

// ✅ Function to delete a category
export async function deleteCategory(categoryId: number) {
  try {
    // Delete the category
    await db.delete(category).where(eq(category.id, categoryId));

    return { success: true };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, error: "Something went wrong" };
  }
}
