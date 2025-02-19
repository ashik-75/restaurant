import { Menu } from "@/db/schema";

// Now extend the `CartItemType`
export interface CartItemType extends Menu {
  quantity: number;
}
