import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { getSingleMenu } from "../actions/menu-actionts";
import AddOrder from "./components/add-order";

const Page = async ({ params }: { params: { menuId: string } }) => {
  // Decode the URL-encoded menu name
  const menuId = Number(params.menuId);

  console.log({ menuId });

  // Find the menu item using the decoded name
  const response = await getSingleMenu(menuId);
  if (!response.success) {
    return <div>Nothing found here</div>;
  }

  const menu = response.menu;

  console.log({ menu });

  return (
    <div className=" flex gap-10 max-w-5xl mx-auto">
      <div className="space-y-2">
        <Link href={"/"}>
          <button className="flex text-sm gap-2 p-2 border items-center">
            <ChevronLeft size={16} /> <span>Back</span>
          </button>
        </Link>

        <img src={menu?.image_url} alt={menu?.name} />
      </div>

      <div className="space-y-3">
        <h1 className="font-bold">{menu?.name}</h1>
        <p>{menu?.description}</p>
        <p>${menu?.price}</p>

        <AddOrder menu={menu} />
      </div>
    </div>
  );
};

export default Page;
