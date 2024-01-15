import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SaveButton from "../Buttons/saveButton";
import PublishButton from "../publish/publishButton";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { toast } from "react-toastify";
import { SaveChangesPopup } from "../Buttons/savePopup";

const Contacthome = () => {
  const [email, setEmail] = useState("");
  const [reEnterEmail, setReEnterEmail] = useState("");
  const [toggleSwitch, setToggleSwitch] = useState(false);
  const [togglePop, setTogglePop] = useState(false);
  const [activeSlideId, setActiveSlideId] = useState(1);
  const openPopUp = (slideId) => {
    setActiveSlideId(slideId);
    setTogglePop(true);
    setToggleSwitch(!toggleSwitch);
  };
  const closePopUp = () => {
    setActiveSlideId(1);
    setTogglePop(false);
  };
  async function handleSwitch() {
    // e.stopPropagation();
    try {
      const config = {
        method: "PUT",
        mode: "cors",
        url: `${API_BASE_URL}/V1/updateDatacontact/${1}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { Published: toggleSwitch },
      };
      await axios(config);
    } catch (e) {
      console.log("Error:", e);
    }
  }
  const onSaveChanges = async () => {
    closePopUp();
    if (activeSlideId !== null) {
      await handleSwitch();
    }
  };
  async function saveEmail() {
    if (reEnterEmail.length === 0 || email.length === 0) {
      toast.error("Please Enter the Email");
    }
    if (reEnterEmail !== email) {
      toast.error("Please check the Email");
    }
    if (reEnterEmail !== email) return;
    try {
      const payload = {
        id: 1,
        Email: email,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${API_BASE_URL}/V1/createcontact`,
        payload,
        config
      );

      if (response?.data?.status) {
        toast.success("Email saved successfully");
      }
      setEmail(response?.data?.data?.Email);
    } catch (e) {
      console.log("Error:", e);
    }
  }
  const getContactData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/V1/getDatacontact`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmail(response.data.data?.Email);
      setReEnterEmail(response.data.data?.Email);
      setToggleSwitch(response.data.data?.Published);
    } catch (e) {
      console.log("err", e);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getContactData();
    }
  }, []);

  const handleCancel = () => {
    setEmail("");
    setReEnterEmail("");
  };

  return (
    <>
      <div className="flex flex-col mt-[2rem] ml-[12rem] ">
        <h1
          className="my-2 lg:mt-2 font-bold text-3xl  lg:ml-2 text-[#1A2338]"
          style={{ fontFamily: "Raleway, sans-serif" }}
        >
          Home Page
        </h1>
        <p
          className="text-xl font-normal lg:ml-2 "
          style={{
            color: "rgba(26, 35, 56, 0.70)",
            fontFamily: "Raleway, sans-serif",
          }}
        >
          <span
            className="border-b-2 border-gray-700 "
            style={{ fontFamily: "Raleway, sans-serif" }}
          >
            {" "}
            Enquiries
          </span>
        </p>
      </div>
      <div className="bg-[#F1F5F9] bg-cover ml-[10rem] ">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <h1
              className="lg:ml-[3rem] mt-[2rem]  font-['Roboto'] text-[24px] font-semibold text-[#1A2338] opacity-70"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              Home page
            </h1>
          </div>
        </div>
        <div className="2xl:w-[469px]  2xl:h-[290px] lg:w-[480px]  lg:h-[290px] rounded lg:mt-[1rem] bg-[#FFFFFF] lg:ml-[3rem] ">
          <SaveChangesPopup
            open={togglePop}
            onSave={onSaveChanges}
            onClose={closePopUp}
          />
          <Box
            className="pt-[31px] pl-[20px] flex flex-row justify-between"
            component="form"
            sx={{
              "& > :not(style)": { m: 1 },
            }}
            autoComplete="off"
          >
            <Box sx={{ flexGrow: 1, maxWidth: "642px" }}>
              {" "}
              {/* Ensures that the box takes up available space but doesn't grow beyond 642px */}
              <TextField
                id="outlined-email"
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Example@gmail.com"
                fullWidth // This makes the TextField take up the full width of its parent Box
                margin="normal"
              />
              <TextField
                id="outlined-reenter-email"
                label="Re-enter email address"
                value={reEnterEmail}
                onChange={(e) => setReEnterEmail(e.target.value)}
                placeholder="Example@gmail.com"
                fullWidth // Same as above
                margin="normal"
              />
            </Box>
            <PublishButton
              isPublished={toggleSwitch}
              openPopUp={() => openPopUp(1)}
              slideId={1}
              className="self-end" // Aligns the PublishButton to the end of the container along the cross axis
            />
          </Box>
          <div className="lg:mx-[16rem] ">
            <SaveButton onCancel={handleCancel} onSave={saveEmail} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacthome;
