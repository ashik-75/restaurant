"use server";
// Import your Drizzle database instance
import { db } from "@/db/drizzle";
import { Order, order, OrderMenu, orderMenu } from "@/db/schema"; // Import tables
import { eq } from "drizzle-orm";

// Function to get a single order by ID
export async function getSingleOrder(orderId: number): Promise<{
  success: boolean;
  order?: Order;
  menuItems?: OrderMenu[];
  error?: string;
}> {
  try {
    // Fetch the order details by ID
    const orderDetails = await db
      .select()
      .from(order)
      .where(eq(order.id, orderId))
      .limit(1)
      .execute(); // This will be typed as `Order[]`

    if (orderDetails.length === 0) {
      return { success: false, error: "Order not found" };
    }

    // Fetch the associated menu items for the order
    const menuItems = await db
      .select()
      .from(orderMenu)
      .where(eq(orderMenu.order_id, orderId))
      .execute(); // This will be typed as `OrderMenu[]`

    // Return the order along with its menu items
    return { success: true, order: orderDetails[0], menuItems };
  } catch (error) {
    console.error("Error fetching order:", error);
    return { success: false, error: "Something went wrong" };
  }
}
