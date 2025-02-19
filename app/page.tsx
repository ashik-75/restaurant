import { getMenusGroupedByCategory } from "@/lib/queries";
import ImageList from "./components/image-list";

export default async function Home() {
  const menus = await getMenusGroupedByCategory();

  return (
    <div className="space-y-5">
      {menus.map((menu) => (
        <ImageList
          key={menu.category}
          title={menu.category}
          menus={menu.menus}
        />
      ))}
    </div>
  );
}
