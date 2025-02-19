import Link from "next/link";
import OrderInCart from "./order-in-cart";

const Header = () => {
  return (
    <header className="border-b backdrop-blur bg-white w-full flex justify-between p-10 fixed top-0 left-0 h-[100px] z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
        <h1 className="font-bold  text-3xl">The Indian Night</h1>
        <div className="flex gap-5 items-center">
          <Link href={"/dashboard"} className="rounded px-2 py-1 border">
            Dashboard
          </Link>
          <OrderInCart />
        </div>
      </div>
    </header>
  );
};

export default Header;
