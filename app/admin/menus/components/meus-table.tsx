"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Category } from "@/db/schema";
import DeleteMenu from "./delete-menu";
import EditMenu from "./edit-menu";

const MenusTable = ({
  menus,
  categories,
}: {
  menus: any[];
  categories: Category[];
}) => {
  return (
    <div className="py-10">
      <h2 className="text-2xl font-semibold mb-4">Menus</h2>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menus.map((menu) => (
            <TableRow key={menu.id}>
              <TableCell>{menu.name}</TableCell>
              <TableCell>${menu.price}</TableCell>
              <TableCell>{menu.category_name}</TableCell>
              <TableCell className="flex gap-2">
                <EditMenu menu={menu} categories={categories} />
                <DeleteMenu menuId={menu.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MenusTable;
