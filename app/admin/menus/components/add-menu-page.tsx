import { getCategories } from "@/lib/queries";
import AddMenuForm from "./add-menu-form";

const AddMenuPage = async () => {
  const categories = await getCategories();

  return <AddMenuForm categories={categories} />;
};

export default AddMenuPage;
