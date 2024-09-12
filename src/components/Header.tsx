import React from 'react';
import { GiNotebook } from "react-icons/gi";

const Header: React.FC = () => {
  return (
    <div className="flex justify-center bg-[#E4B958] py-2 md:py-4 border border-black">
      <h1 className="text-lg md:text-2xl font-semibold flex items-center gap-3"> <span><GiNotebook/></span>My Note's...</h1>
    </div>
  );
};

export default Header;
