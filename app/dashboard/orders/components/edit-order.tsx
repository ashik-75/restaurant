import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { updateOrder } from "@/lib/action";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Pencil } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Order = {
  id: number;
  customer_name: string;
  note?: string;
  is_completed: boolean;
  menuItems: {
    menu_id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
};

// Zod Schema for Validation
const orderSchema = z.object({
  id: z.number(),
  customer_name: z.string().min(3, "Customer name is required"),
  note: z.string().optional(),
  is_completed: z.boolean(),
});

type OrderSchemaType = z.infer<typeof orderSchema>;

const EditOrder: FC<{ order: Order }> = ({ order }) => {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  // Form for Editing
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrderSchemaType>({
    resolver: zodResolver(orderSchema),
  });

  const onSubmit = async (data: OrderSchemaType) => {
    try {
      setLoading(true);
      await updateOrder({
        orderId: data.id,
        isCompleted: data.is_completed,
        note: data.note,
        customerName: data.customer_name,
      });
      setOpenDialog(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            reset(order);
            setOpenDialog(true);
          }}
        >
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit Order</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <Input {...register("customer_name")} placeholder="Customer Name" />
          {errors.customer_name && (
            <p className="text-red-500 text-sm">
              {errors.customer_name.message}
            </p>
          )}
          <Input {...register("note")} placeholder="Note (optional)" />
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("is_completed")} />
            Mark as Completed
          </label>
          <Button type="submit" disabled={loading}>
            {loading ? <Loader className="animate-spin" /> : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditOrder;
