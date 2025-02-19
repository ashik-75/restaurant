"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Category, Menu } from "@/db/schema";
import { updateMenuItem } from "@/lib/action";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Pencil } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Validation Schema for Editing
const menuSchema = z.object({
  id: z.number(),
  name: z.string().min(3, "Name is required"),
  description: z.string().optional(),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  category_id: z.coerce.number().min(1, "Category is required"),
  image_url: z.string().url("Invalid URL").optional(),
});

type MenuSchemaType = z.infer<typeof menuSchema>;

const EditMenu: FC<{
  categories: Category[];
  menu: Menu & { category_name: string; category_id: number };
}> = ({ categories, menu }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form for editing
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MenuSchemaType>({
    resolver: zodResolver(menuSchema),
  });

  const onSubmit = async (data: MenuSchemaType) => {
    try {
      setIsLoading(true);
      await updateMenuItem(data);
      setEditDialogOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setEditDialogOpen(true);
            reset({
              ...menu,
              // @ts-expect-error fuck
              category_id: String(menu.category_id),
            });
          }}
        >
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-lg font-semibold mb-2">
          Edit Menu
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <Input {...register("name")} placeholder="Name" />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
          <Input {...register("price")} placeholder="Price" />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
          {/* Category Dropdown */}
          <select
            {...register("category_id")}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category_id && (
            <p className="text-red-500 text-sm">{errors.category_id.message}</p>
          )}
          <Button disabled={isLoading} type="submit">
            {isLoading ? (
              <Loader className="animate-spin" size={16} />
            ) : (
              <span>Save Changes</span>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMenu;
