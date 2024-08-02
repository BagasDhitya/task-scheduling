import { FC } from "react";
import { LoadingProps } from "@/utils/interface/component";

const Loading: FC<LoadingProps> = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-white text-xl">{message}</p>
      </div>
    </div>
  );
};

export default Loading;
