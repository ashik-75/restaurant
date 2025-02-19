import { getOrders } from "@/lib/queries";
import OrderTableForm from "./order-table-form";

const OrderPage = async () => {
  const orders = await getOrders();

  // @ts-expect-error fuck
  return <OrderTableForm orders={orders} />;
};

export default OrderPage;
