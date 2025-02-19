import { Button } from "@/components/ui/button";
import { deleteOrder } from "@/lib/action";
import { Loader2, Trash } from "lucide-react";
import { FC, useState } from "react";

const DeleteOrder: FC<{ orderId: number }> = ({ orderId }) => {
  const [loading, setIsLoading] = useState(false);
  const handleDeleteOrder = async (orderId: number) => {
    try {
      setIsLoading(true);
      await deleteOrder(orderId);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      variant="destructive"
      size="icon"
      onClick={() => handleDeleteOrder(orderId)}
    >
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Trash className="w-4 h-4" />
      )}
    </Button>
  );
};

export default DeleteOrder;
