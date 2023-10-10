import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="flex flex-row gap-5 bg-slate-400 p-2 text-lg font-semibold shadow-md shadow-gray-900 mb-1">
      <Link to="/" className="text-2xl text-red-500 hover:text-red-700">
        <AiFillHome />
      </Link>
      <Link to="/all" className="hover:text-blue-700">
        MERN
      </Link>
      <Link to="/" className="hover:text-blue-700">
        Create Post
      </Link>
    </div>
  );
};

export default Navbar;
