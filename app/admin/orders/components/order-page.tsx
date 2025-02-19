import { getOrders } from "@/lib/queries";
import OrderTableForm from "./order-table-form";

const OrderPage = async () => {
  const orders = await getOrders();

  return <OrderTableForm orders={orders} />;
};

export default OrderPage;
