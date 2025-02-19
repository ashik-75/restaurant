"use client";

import { Menu } from "@/db/schema";
import SingleImage from "./single-image";

const ImageList = ({ title, menus = [] }: { title: string; menus: Menu[] }) => {
  return (
    <div className="space-y-4 p-5">
      <h1 className="font-bold text-lg">{title}</h1>
      <div className="grid grid-cols-3 gap-2">
        {menus.map((image) => (
          <SingleImage key={image.id} {...image} />
        ))}
      </div>
    </div>
  );
};

export default ImageList;
