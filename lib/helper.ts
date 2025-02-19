import { revalidateTag } from "next/cache";

export function invalidateOrder() {
  revalidateTag("orders-menu");
  revalidateTag("order-count");
}

export function invalidateMenu() {
  revalidateTag("menus-count");
  revalidateTag("menus");
  revalidateTag("category-menus");
}
