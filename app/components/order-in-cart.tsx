"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { addOrder } from "@/lib/action";

import { useCart } from "@/store/use-cart";
import { Minus, Plus, ShoppingCart, Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const OrderInCart = () => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { items, updateCart, removeItemFromCart, clearCart } = useCart();
  const [note, setNote] = useState("");

  const handlePlaceOrder = async () => {
    try {
      setIsLoading(true);
      const menus = items.map((i) => ({ menuId: i.id, quantity: i.quantity }));
      await addOrder(name, note, menus);
      toast.success("Order placed");
      clearCart();
      setName("");
      setNote("");
    } catch {
      toast.error("Order placing failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger className="flex gap-1 items-center">
        <ShoppingCart />({items.length})
      </SheetTrigger>

      <SheetContent className="fixed top-0 right-0 h-screen w-80 bg-white shadow-lg border-l z-[100] transition-transform duration-300">
        <div className="p-4 space-y-4">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          {items.length === 0 ? (
            <p className="text-gray-500">No items in your cart.</p>
          ) : (
            <div className="mt-4 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="border-b pb-2">
                  <h1 className="font-medium">
                    {item.name}({item.quantity})
                  </h1>
                  <span>
                    {item.price} X {item.quantity} = $
                    {parseFloat(item?.price) * item.quantity}
                  </span>

                  <div className="space-x-2">
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      onClick={() => updateCart(item.id, item.quantity + 1)}
                      className="border rounded border-slate-300"
                    >
                      <Plus className="text-slate-600" />
                    </Button>
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      onClick={() =>
                        updateCart(
                          item.id,
                          item.quantity > 1 ? item.quantity - 1 : item.quantity
                        )
                      }
                      className="border rounded border-slate-300"
                    >
                      <Minus className="text-slate-600" />
                    </Button>
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      onClick={() => removeItemFromCart(item.id)}
                      className="border rounded border-slate-300"
                    >
                      <Trash size={18} className="text-slate-600" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <Input
              placeholder="Enter your name"
              className="placeholder:italic "
              disabled={items.length === 0}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add note if you want"
              name="note"
              id=""
              className="bg-transparent border placeholder:text-sm placeholder:italic border-gray-500 w-full outline-none p-5"
              rows={5}
              disabled={items.length === 0}
            ></Textarea>
          </div>

          <div>
            <Button
              onClick={handlePlaceOrder}
              disabled={items.length === 0 || isLoading}
            >
              {isLoading ? "Placing ...." : "Place Order"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default OrderInCart;
