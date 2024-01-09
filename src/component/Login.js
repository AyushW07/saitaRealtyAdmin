import React, { useState } from "react";
import { API_BASE_URL } from "../config";
import axios from "axios";
import useLoginStore from "../store/useLoginStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useLoginStore();
  async function Loginfunction() {
    try {
      const config = {
        method: "POST",
        mode: "cors",
        url: `${API_BASE_URL}/V1/userLogin`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          Email: email,
          Password: password,
        },
      };
      const response = await axios(config);
      console.log("res", response);
      if (response.status === 200) {
        toast.success("User created successfully");
        login();
      } else {
        toast.error("Something went wrong");
      }
    } catch (e) {
      console.log("Error:", e);
      // toast.error(e.response?.data?.message || "An error occurred");
    }
  }
  return (
    <>
      <ToastContainer position="top-center" />
      <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <div className="w-[40rem] p-20 m-auto bg-[#2E2E2E] rounded-md shadow-xl shadow-gray-200">
          <div className="flex flex-col items-center ">
            <img className="w-[6rem] h-[5rem]" src="/logos.png" alt="i" />
          </div>
          <div className="flex flex-col items-center justify-center mt-6">
            <div className="mb-2 w-[20rem]">
              <label
                for="email"
                className="block text-sm font-semibold text-white"
              >
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Type login ID"
                className="block w-full px-4 py-2 mt-2 text-[#000] bg-white border rounded-md"
              />
            </div>
            <div className="mb-2 w-[20rem]">
              <label
                for="password"
                className="block text-sm font-semibold text-white"
              >
                password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Type Password"
                className="block w-full px-4 py-2 mt-2 text-[#000] bg-white border rounded-md"
              />
            </div>

            <div onClick={Loginfunction} className="mt-6 w-[20rem]">
              <button
                className="w-full px-4 py-2 font-bold tracking-wide text-black transition-colors duration-200 rounded-md transdiv hover:bg-blue-700 focus:outline-none"
                style={{
                  borderRadius: "var(--borderRadius, 4px)",

                  background:
                    "linear-gradient(263deg, #3CBBA4 6.02%, #C1F430 96.65%)",

                  boxShadow: "0px 4px 11.6px 0px rgba(0, 0, 0, 0.25) inset",
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
