"use client";

import { addCategory } from "@/app/actions/category-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// ✅ Zod Validation Schema
const categorySchema = z.object({
  name: z.string().min(3, "Category name must be at least 3 characters"),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

const AddCategory = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      await addCategory(data.name);
      toast.success("Category added");
      reset({ name: "" });
    } catch {
      toast.error("Category adding failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 border border-gray-300 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Add New Category</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Category Name */}
        <div>
          <Label htmlFor="name">Category Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Adding..." : "Add Category"}
        </Button>
      </form>
    </div>
  );
};

export default AddCategory;
