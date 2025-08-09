import { Link2 } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
        <Link2 className="h-5 w-5 text-white" />
      </div>
      <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        ShortLink
      </span>
    </div>
  );
}