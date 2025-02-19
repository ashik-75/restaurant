"use client";

import { Button } from "@/components/ui/button";
import { deleteMenuItem } from "@/lib/action";
import { Loader, Trash } from "lucide-react";
import { FC, useState } from "react";

const DeleteMenu: FC<{ menuId: number }> = ({ menuId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteMenuItem(menuId);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button variant="destructive" size="icon" onClick={handleDelete}>
      {isLoading ? (
        <Loader className="animate-spin" size={16} />
      ) : (
        <Trash className="w-4 h-4" />
      )}
    </Button>
  );
};

export default DeleteMenu;
