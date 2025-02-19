"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/db/schema";
import { addMenuItem } from "@/lib/action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// 🛠 Zod Validation Schema
const menuSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string(),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  category_id: z.coerce.number().min(1, "Category is required"), // Use category ID instead of name
  image_url: z.string().url("Invalid URL"),
});

type MenuFormValues = z.infer<typeof menuSchema>;

const AddMenuForm = ({ categories }: { categories: Category[] }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MenuFormValues>({
    resolver: zodResolver(menuSchema),
  });

  const onSubmit = async (data: MenuFormValues) => {
    try {
      setLoading(true);
      await addMenuItem({ ...data, price: String(data.price) });
      toast.success("Menu added");
      reset({});
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" p-5 border border-gray-300 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Add New Menu Item</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register("description")} />
        </div>

        {/* Price */}
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            step="0.01" // Allows decimal values
            {...register("price", { valueAsNumber: true })} // Converts input to a number
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        {/* Category Selection */}
        <div>
          <Label htmlFor="category">Category</Label>
          <div className="flex space-x-2">
            <select
              id="category"
              {...register("category_id")}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select a category</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          {errors.category_id && (
            <p className="text-red-500 text-sm">{errors.category_id.message}</p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <Label htmlFor="image_url">Image URL</Label>
          <Input id="image_url" {...register("image_url")} />
          {errors.image_url && (
            <p className="text-red-500 text-sm">{errors.image_url.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Adding..." : "Add Menu"}
        </Button>
      </form>
    </div>
  );
};

export default AddMenuForm;
