"use client";

import { Menu } from "@/db/schema";
import SingleImage from "./single-image";

const ImageList = ({ title, menus = [] }: { title: string; menus: Menu[] }) => {
  return (
    <div className="space-y-4 p-5">
      <h1 className="font-bold text-lg">{title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {menus.map((image) => (
          <SingleImage key={image.id} {...image} />
        ))}
      </div>
    </div>
  );
};

export default ImageList;
