import AddCategory from "./components/add-category";
import AddMenuPage from "./components/add-menu-page";
import MenusPage from "./components/menus-page";

const Menus = () => {
  return (
    <div className="grid grid-cols-2 gap-5 p-5">
      <div>
        <MenusPage />
      </div>

      <div className="space-y-3">
        <AddMenuPage />
        <AddCategory />
      </div>
    </div>
  );
};

export default Menus;
