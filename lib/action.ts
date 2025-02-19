"use server";

import { db } from "@/db/drizzle";
import { Menu, menu, order, orderMenu } from "@/db/schema";
import { eq } from "drizzle-orm";
import { invalidateMenu, invalidateOrder } from "./helper";

export async function addOrder(
  customerName: string,
  note: string,
  menus: { menuId: number; quantity: number }[]
) {
  const [newOrder] = await db
    .insert(order)
    .values({
      customer_name: customerName,
      note,
      is_completed: false,
    })
    .returning({ id: order.id });

  if (!newOrder) throw new Error("Failed to create order");

  await db.insert(orderMenu).values(
    menus.map((menu) => ({
      order_id: newOrder.id,
      menu_id: menu.menuId,
      quantity: menu.quantity,
    }))
  );

  invalidateOrder();

  return newOrder.id;
}

export async function deleteOrder(orderId: number) {
  await db.delete(order).where(eq(order.id, orderId));

  invalidateOrder();

  return { success: true };
}

export async function updateOrder({
  orderId,
  customerName,
  note,
  isCompleted,
}: {
  orderId: number;
  customerName: string;
  note?: string;
  isCompleted: boolean;
}) {
  await db
    .update(order)
    .set({
      customer_name: customerName,
      note,
      is_completed: isCompleted,
    })
    .where(eq(order.id, orderId));

  invalidateOrder();

  return { success: true };
}

export async function deleteMenuItem(id: number) {
  await db.delete(menu).where(eq(menu.id, id));

  invalidateMenu();
  return { success: true };
}

export async function addMenuItem({
  name,
  description,
  price,
  image_url,
  category_id,
}: Omit<Menu, "id">) {
  const [newMenu] = await db
    .insert(menu)
    .values({
      name,
      description,
      price: price,
      category_id,
      image_url,
    })
    .returning({ id: menu.id });

  invalidateMenu();

  return { success: true, menuId: newMenu.id };
}

type UpdateMenuParams = {
  id: number;
  name?: string;
  description?: string;
  price?: number;
  category_id?: number;
  image_url?: string;
};

export async function updateMenuItem({
  id,
  name,
  description,
  price,
  category_id,
  image_url,
}: UpdateMenuParams) {
  await db
    .update(menu)
    .set({
      ...(name && { name }),
      ...(description && { description }),
      ...(price !== undefined && { price: price.toString() }),
      ...(category_id && { category_id }),
      ...(image_url && { image_url }),
    })
    .where(eq(menu.id, id));

  invalidateMenu();

  return { success: true };
}
