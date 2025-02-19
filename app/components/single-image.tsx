import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Menu } from "@/db/schema";
import { useCart } from "@/store/use-cart";
import { Trash } from "lucide-react";
import { FC, useState } from "react";
import toast from "react-hot-toast";

const SingleImage: FC<Menu> = (menu) => {
  const [open, setOpen] = useState(false);
  const { addItemToCart, removeItemFromCart, items } = useCart();
  const [selectedMenu, setSelectedMenu] = useState<Menu>();
  const { name, description, price, image_url, id } = menu;

  const cartItem = items.find((i) => i.id === id);

  return (
    <>
      <div className="relative group grid grid-cols-4 overflow-hidden cursor-pointer shadow-md rounded-sm">
        <div
          onClick={() => {
            setOpen(true);
            setSelectedMenu(menu);
          }}
          className="p-2 col-span-3 space-y-2"
        >
          <p className="font-semibold">{name}</p>
          <span className="text-sm font-mono">{description}</span>
          <p className="font-bold italic">${price}</p>
        </div>
        <img
          className="duration-600 aspect-square group-hover:scale-105 group-hover:transition-all h-[150px] object-cover w-full"
          src={image_url!}
          alt="product image"
        />
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Product Details</DialogTitle>
          {selectedMenu && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">{selectedMenu.name}</h2>
              <p>{selectedMenu.description}</p>
              <DialogDescription className="text-lg font-bold">
                ${selectedMenu.price}
              </DialogDescription>
              <div className="space-x-2">
                <Button
                  onClick={() => {
                    addItemToCart(menu);
                    toast.success("Item Added");
                  }}
                  variant={"outline"}
                  disabled={!!cartItem?.id}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    removeItemFromCart(selectedMenu.id);
                    toast.success("Item removed");
                  }}
                  disabled={!cartItem?.id}
                >
                  <Trash className="w-4 h-4" />
                  Remove from Cart
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SingleImage;
