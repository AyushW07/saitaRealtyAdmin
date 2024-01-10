import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { MdCall } from "react-icons/md";
const Navbar = () => {
  const [toggleColor, setToggleColor] = useState();
  return (
    <>
      <div
        className="bg-[#2E2E2E] bg-cover w-[160px] min-h-screen"
        style={{ fontFamily: "Raleway, sans-serif" }}
      >
        <div className="flex flex-row">
          <div>
            <img
              src="/saitalogo.png"
              alt="images"
              className="ml-[24px] mt-[31px] w-[6rem] h-[5rem]"
            />
          </div>
        </div>
        <ul className="flex flex-col">
          <li className="flex flex-row items-center">
            <Link
              to="/Home"
              onClick={() => setToggleColor("Home")}
              className={`flex items-center w-full h-[48px] mt-10 ${
                toggleColor === "Home"
                  ? "bg-gradient-to-r from-[#3CBBA4] to-[#C1F430] shadow-[0px_4px_11.6px_0px_rgba(0,0,0,0.25)]"
                  : ""
              }`}
            >
              <AiOutlineHome className="w-[30px] h-[30px] text-black ml-[1rem]" />
              <h1
                className="lg:ml-[10px] text-black 2xl:text-lg !text-sm font-medium"
                style={{ lineHeight: "15px" }}
              >
                Home Page
              </h1>
            </Link>
          </li>
          <li className="flex flex-row items-center">
            <Link
              to="/Maincontact"
              onClick={() => setToggleColor("Maincontact")}
              className={`flex items-center w-full h-[48px] mt-10 ${
                toggleColor === "Maincontact"
                  ? "bg-gradient-to-r from-[#3CBBA4] to-[#C1F430] shadow-[0px_4px_11.6px_0px_rgba(0,0,0,0.25)]"
                  : ""
              }`}
            >
              <MdCall className="w-[30px] h-[30px] text-black ml-[1rem]" />
              <h1
                className="lg:ml-[10px] text-black 2xl:text-lg !text-sm font-medium"
                style={{ lineHeight: "15px" }}
              >
                Enquires
              </h1>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;