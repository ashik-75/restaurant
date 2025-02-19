import { getAllMenusCount, getOrderCount } from "@/lib/queries";
import Link from "next/link";

const Admin = async () => {
  // Fetch menus
  const menuCount = await getAllMenusCount();
  const orderCount = await getOrderCount();
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex gap-5">
        <div className="p-5">
          <h1>Total menu : {menuCount.at(0)?.count.toLocaleString()}</h1>
          <Link href={"/admin/menus"} className="underline underline-offset-1">
            {" "}
            visit menu{" "}
          </Link>
        </div>

        <div className="p-5">
          <h1>Total orders: {orderCount.at(0)?.count.toLocaleString()}</h1>
          <Link href={"/admin/orders"} className="underline underline-offset-1">
            {" "}
            visit order{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Admin;
