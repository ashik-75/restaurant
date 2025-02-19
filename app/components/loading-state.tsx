import { Loader2 } from "lucide-react";
import { FC } from "react";

const LoadingState: FC<{ text: string }> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 w-full ">
      <Loader2 className="animate-spin" size={18} />
      <p>{text}</p>
    </div>
  );
};

export default LoadingState;
