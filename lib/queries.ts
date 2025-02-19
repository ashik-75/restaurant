import { db } from "@/db/drizzle";
import { category, menu, order, orderMenu } from "@/db/schema";
import { count, eq } from "drizzle-orm";
import { unstable_cache } from "./unstable-cache";

export const getAllMenusCount = unstable_cache(
  () => db.select({ count: count() }).from(menu),
  ["menus-count"],
  {
    revalidate: 60 * 60 * 2,
    tags: ["menus-count"],
  }
);

export const getOrderCount = unstable_cache(
  () => db.select({ count: count() }).from(order),
  ["order-count"],
  {
    revalidate: 60 * 60 * 2,
    tags: ["order-count"],
  }
);

export const getAllMenus = unstable_cache(
  () =>
    db
      .select({
        id: menu.id,
        name: menu.name,
        description: menu.description,
        price: menu.price,
        image_url: menu.image_url,
        category_id: menu.category_id,
        category_name: category.name, // Fetch category name
      })
      .from(menu)
      .innerJoin(category, eq(menu.category_id, category.id)),
  ["menus"],
  {
    revalidate: 60 * 60 * 2,
    tags: ["menus"],
  }
);

// ✅ Get Single Menu by ID
export const getSingleMenu = unstable_cache(
  async (menuId: number) =>
    await db.select().from(menu).where(eq(menu.id, menuId)).limit(1).execute(),
  ["single-menu"],
  {
    revalidate: 60 * 60 * 2,
  }
);

// ✅ Function to get all categories
export const getCategories = unstable_cache(
  () => db.select().from(category),
  ["categories"],
  { revalidate: 60 * 60 * 2, tags: ["categories"] }
);

export const getOrders = unstable_cache(
  async () => {
    // Fetch all orders
    const orders = await db.select().from(order);

    if (!orders.length) {
      return [];
    }

    // Fetch menu items with menu details for each order
    const ordersWithMenuItems = await Promise.all(
      orders.map(async (orderItem) => {
        const menuItems = await db
          .select({
            menu_id: menu.id,
            name: menu.name,
            price: menu.price,
            image_url: menu.image_url,
            quantity: orderMenu.quantity,
          })
          .from(orderMenu)
          .innerJoin(menu, eq(orderMenu.menu_id, menu.id)) // Join menu table
          .where(eq(orderMenu.order_id, orderItem.id));

        return { ...orderItem, menuItems };
      })
    );

    return ordersWithMenuItems;
  },
  ["orders-menu"],
  { revalidate: 60 * 60 * 2, tags: ["orders-menu"] }
);

export const getMenusGroupedByCategory = unstable_cache(
  async () => {
    const menus = await db
      .select({
        id: menu.id,
        name: menu.name,
        description: menu.description,
        price: menu.price,
        image_url: menu.image_url,
        category_id: menu.category_id,
        category_name: category.name, // Fetch category name
      })
      .from(menu)
      .innerJoin(category, eq(menu.category_id, category.id));

    // Group menus by category and return in desired structure
    const groupedMenus = Object.values(
      menus.reduce((acc, menu) => {
        const category = menu.category_name;
        if (!acc[category]) {
          acc[category] = { category, menus: [] };
        }
        acc[category].menus.push(menu);
        return acc;
      }, {} as Record<string, { category: string; menus: typeof menus }>)
    );

    return groupedMenus;
  },
  ["category-menus"],
  { revalidate: 60 * 60 * 2, tags: ["category-menus"] }
);
