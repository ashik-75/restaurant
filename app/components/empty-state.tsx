import { ShieldAlert } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div>
        <ShieldAlert />
      </div>
      <p>Uffs! Nothings found</p>
    </div>
  );
};

export default EmptyState;
