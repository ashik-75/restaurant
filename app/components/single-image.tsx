import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Menu } from "@/db/schema";
import { useCart } from "@/store/use-cart";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";
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
      <div className="relative group overflow-hidden flex gap-2 justify-between cursor-pointer outline outline-1 outline-gray-800/10 p-3 rounded-sm">
        <div className="space-y-2">
          <p className="font-bold">{name}</p>
          <p className="text-sm">${price}</p>
          <p>{description}</p>

          <button
            onClick={() => {
              setOpen(true);
              setSelectedMenu(menu);
            }}
            className="underline underline-offset-2"
          >
            view details
          </button>
        </div>

        <div className="relative w-[100px] sm:w-[200px] h-[150px]">
          <Image
            className="rounded-lg object-cover"
            src={image_url!}
            alt="product image"
            fill
            sizes="(max-width: 640px) 100px, 200px"
          />
        </div>

        <button
          onClick={() => {
            addItemToCart(menu);
            toast.success("Item Added");
          }}
          className="absolute bottom-5 z-10 right-5 border p-2 border-zinc-800 rounded-full text-zinc-500 bg-white"
        >
          <Plus />
        </button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Product Details</DialogTitle>
          {selectedMenu && (
            <div className="space-y-2">
              <div className="relative w-full h-[200px]">
                <Image
                  className="rounded-lg object-cover"
                  src={selectedMenu.image_url!}
                  alt="product image"
                  fill
                  sizes="100vw"
                  priority
                />
              </div>
              <h2 className="text-xl font-semibold">{selectedMenu.name}</h2>
              <DialogDescription className="text-lg font-bold">
                ${selectedMenu.price}
              </DialogDescription>
              <p>{selectedMenu.description}</p>
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
