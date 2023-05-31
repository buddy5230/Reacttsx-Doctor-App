import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import logo from "../../images/logo.png";

const Appheader = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <nav className="flex items-center h-20 mx-auto px-4 text-back sticky top-0 bg-white max-[520px]: flex-row justify-start">
      <img
        src={logo}
        className="rounded-full w-12 h-12 mb-0 mt-0 ml-40 max-[520px]: ml-0"
      />
      <h1 className="w-full text-3xl font-bold text-green-700 mx-5">
        หมอพร้อม
      </h1>

      <ul className="hidden md:flex">
        <li
          className="m-2 p-2 font-bold  text-2 hover:text-green-700"
          style={{ whiteSpace: "nowrap" }}
        >
          <Link to={"/home"}>หน้าหลัก</Link>
        </li>
        <li
          className="m-2 p-2 font-bold text-2 hover:text-green-700"
          style={{ whiteSpace: "nowrap" }}
        >
          <Link to={"/book"}>จองวัคซีน</Link>
        </li>

        <li
          className="m-2 p-2 font-bold  text-2 hover:text-green-700"
          style={{ whiteSpace: "nowrap" }}
        >
          <Link to={"/detailvac"}>ข้อมูลวัคซีน</Link>
        </li>
        <li
          className="m-2 p-2 font-bold  text-2 hover:text-green-700"
          style={{ whiteSpace: "nowrap" }}
        >
          <Link to={"/assess"}>ประเมินอาการ</Link>
        </li>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-[Poppins] duration-500 px-4 py-2 mx-4 hover:bg-cyan-500 rounded "
          style={{ whiteSpace: "nowrap" }}
        >
          <Link to={"/"}>ออกจากระบบ</Link>
        </button>
      </ul>
      <nav onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </nav>
      <ul
        className={
          nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-white ease-in-out duration-500"
            : "ease-in-out duration-500 fixed left-[-100%]"
        }
      >
        <h1 className="w-full text-3xl font-bold text-green-700 m-4">
          หมอพร้อม
        </h1>
        <li
          className="m-2 p-2 border-b border-gray-600 hover:text-green-700"
          style={{ whiteSpace: "nowrap" }}
        >
          <Link to={"/"}>หน้าหลัก</Link>
        </li>
        <li
          className="m-2 p-2 border-b border-gray-600 hover:text-green-700"
          style={{ whiteSpace: "nowrap" }}
        >
          <Link to={"/book"}>จองวัคซีน</Link>
        </li>

        <li
          className="m-2 p-2 border-b border-gray-600 hover:text-green-700"
          style={{ whiteSpace: "nowrap" }}
        >
          <Link to={"/detailvac"}>ข้อมูลวัคซีน</Link>
        </li>
        <li
          className="m-2 p-2 border-b border-gray-600 hover:text-green-700"
          style={{ whiteSpace: "nowrap" }}
        >
          <Link to={"/assess"}>ประเมินอาการ</Link>
        </li>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-[Poppins] duration-500 px-6 py-2 mx-4 hover:bg-cyan-500 rounded "
          style={{ whiteSpace: "nowrap" }}
        >
          <Link to={"/"}>ออกจากระบบ</Link>
        </button>
      </ul>
    </nav>
  );
};

export default Appheader;
