import {
  boolean,
  integer,
  numeric,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";

// ✅ Category Table
export const category = pgTable("category", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

// ✅ Menu Table (Updated with Category Reference)
export const menu = pgTable("menu", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(), // Supports decimals
  category_id: integer("category_id")
    .references(() => category.id, { onDelete: "cascade" }) // Foreign key reference
    .notNull(),
  image_url: text("image"),
});

// ✅ Order Table
export const order = pgTable("order", {
  id: serial("id").primaryKey(),
  customer_name: text("customer_name").notNull(),
  note: text("note"),
  is_completed: boolean("is_completed").default(false).notNull(),
});

// ✅ OrderMenu Table (Many-to-Many Relation Between Orders and Menus)
export const orderMenu = pgTable("order_menu", {
  id: serial("id").primaryKey(),
  order_id: integer("order_id").references(() => order.id, {
    onDelete: "cascade",
  }),
  menu_id: integer("menu_id").references(() => menu.id, {
    onDelete: "cascade",
  }),
  quantity: integer("quantity").notNull().default(1),
});

// ✅ Inferring the types of the tables
export type Category = typeof category.$inferSelect;
export type Menu = typeof menu.$inferSelect;
export type Order = typeof order.$inferSelect;
export type OrderMenu = typeof orderMenu.$inferSelect;
