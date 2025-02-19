import { getAllMenus, getCategories } from "@/lib/queries";
import MenusTable from "./meus-table";

const MenusPage = async () => {
  const [menus, categories] = await Promise.all([
    getAllMenus(),
    getCategories(),
  ]); // Fetch both menus & categories

  console.log("MENUS", menus);
  return <MenusTable menus={menus} categories={categories} />;
};

export default MenusPage;
