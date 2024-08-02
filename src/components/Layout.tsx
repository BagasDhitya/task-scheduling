import { FC } from "react";
import { LayoutProps } from "@/utils/interface/component";
import Navbar from "./Navbar";

const Layout: FC<LayoutProps> = ({ children, isHidden }) => {
  return (
    <div className="flex flex-col justify-center items-center my-20 w-screen h-full text-black">
      <Navbar isHidden={isHidden} />
      <main className="container mx-auto p-4 h-full">{children}</main>
    </div>
  );
};

export default Layout;
