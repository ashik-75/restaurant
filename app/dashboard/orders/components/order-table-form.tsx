"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteOrder from "./delete-order";
import EditOrder from "./edit-order";

// Order Type
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

const OrderTableForm = ({ orders }: { orders: Order[] }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  return (
    <div className=" py-10">
      <h2 className="text-2xl font-semibold mb-4">Orders</h2>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Actions</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Note</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Modify</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order) => (
            <TableRow key={order.id}>
              {/* View Menu Items Button */}
              <TableCell>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setSelectedOrder(order);
                    setOpenDetailsDialog(true);
                  }}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </TableCell>

              <TableCell>{order.customer_name}</TableCell>
              <TableCell>{order.note || "—"}</TableCell>
              <TableCell>
                {order.is_completed ? "✅ Completed" : "⏳ Pending"}
              </TableCell>

              <TableCell className="flex gap-2">
                {/* Edit Button */}
                <EditOrder order={order} />

                {/* Delete Button */}
                <DeleteOrder orderId={order.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog for Viewing Order Details */}
      <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
        <DialogContent>
          <DialogTitle>Order Details</DialogTitle>
          {selectedOrder && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Menu Item</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedOrder.menuItems.length > 0 ? (
                  selectedOrder.menuItems.map((item) => (
                    <TableRow key={item.menu_id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>${item.price}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${item.price * item.quantity}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      No menu items found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderTableForm;
