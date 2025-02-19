import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { FC, PropsWithChildren } from "react";

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="p-5 lg:p-0 space-y-2">
      <Link
        href={"/"}
        className="px-2 inline-flex gap-2 py-1 rounded border border-gray-500/50"
      >
        <ChevronLeft />
        <span>Back to App</span>
      </Link>

      <div>{children}</div>
    </div>
  );
};

export default AdminLayout;
