import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import Maincontact from "./component/contacts/Maincontact";
import Login from "./component/Login";
import useLoginStore from "./store/useLoginStore";

function App() {
  const { isLoggedIn } = useLoginStore();
  return (
    <>
      <Router>
        <ToastContainer className="!z-[999999]" />
        <div className="flex w-full bg-[#F1F5F9] ">
          {isLoggedIn && <Navbar />}
          <div className="flex-grow">
            <Routes>
              {!isLoggedIn ? (
                <>
                  <Route path="*" element={<Login />} />
                </>
              ) : (
                <>
                  <Route path="/Home" element={<Home />} />
                  <Route path="/Maincontact" element={<Maincontact />} />
                </>
              )}
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
