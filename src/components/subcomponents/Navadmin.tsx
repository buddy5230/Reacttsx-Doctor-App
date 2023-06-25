import React from "react";
import { Link } from "react-router-dom";
const Navadmin = () => {
  return (
    <div>
      <nav className="h-20 mx-auto px-4 sticky top-0 bg-green-700 ">
  <h1 className="text-center text-white text-4xl font-bold pt-4">
    Admin
  </h1>
  <button
    className="absolute right-0 top-0 mr-5 mt-5 bg-red-500 hover:bg-red-700 text-white font-[Poppins] duration-500 px-6 py-2 rounded "
    style={{ whiteSpace: "nowrap" }}
  >
    <Link to={"/"}>ออกจากระบบ</Link>
  </button>
</nav>
    </div>
  );
};

export default Navadmin;
