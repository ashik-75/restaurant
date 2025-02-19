"use client";

import { imageList } from "@/data/image-url";
import { usePathname, useSearchParams } from "next/navigation";

const Sidebar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Get existing categories from URL as a comma-separated string
  const categoryParam = searchParams.get("category") || "";
  const selectedCategories = categoryParam ? categoryParam.split(",") : [];

  // Function to update search params
  const updateSearchParams = (inputCategory: string, isChecked: boolean) => {
    let updatedCategories = [...selectedCategories];

    if (isChecked) {
      if (!updatedCategories.includes(inputCategory)) {
        updatedCategories.push(inputCategory);
      }
    } else {
      updatedCategories = updatedCategories.filter((cat) => cat !== inputCategory);
    }

    // Convert updatedCategories array into a comma-separated string
    const updatedCategoryParam = updatedCategories.join(",");

    // Create a new URLSearchParams object
    const params = new URLSearchParams(searchParams);

    if (updatedCategoryParam) {
      params.set("category", updatedCategoryParam);
    } else {
      params.delete("category");
    }

    // Update URL without page reload
    window.history.pushState(null, "", `${pathname}?${params.toString()}`);
  };

  const categories = [...new Set(imageList.map((item) => item.category))];

  return (
    <div className="max-w-[400px] pt-[150px]">
      {categories.map((category) => (
        <div key={category}>
          <label htmlFor={category} className="flex gap-2 py-2">
            <input
              type="checkbox"
              id={category}
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={(e) => updateSearchParams(category, e.target.checked)}
            />
            <p className="text-sm">{category}</p>
          </label>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
