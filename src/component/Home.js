import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import Namepopups from "../component/namePopups";
import { MdAdd, MdCancel } from "react-icons/md";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { API_BASE_URL } from "../../src/config";
// import PublishButton from "../component/Buttons/publishButton";
import { SaveChangesPopup } from "../component/Buttons/savePopup";
import SaveButton from "../component/Buttons/saveButton";
import { toast } from "react-toastify";
import { AiOutlinePlus } from "react-icons/ai";
import PublishButton from "./publish/publishButton";

const Home = () => {
  const [toggleSwitch, setToggleSwitch] = React.useState({});
  const [locations, setLocations] = useState([""]);
  const handleAddProperty = (propertyData) => {
    const newSlidesData = [
      ...slidesData,
      {
        id: slidesData.length + 1,
        Heading: propertyData.propertyName, // This will be the slide's name
        PropertyType: propertyData.propertyType, // Corrected reference to propertyType
      },
    ];
    setSlidesData(newSlidesData);
    setRowPopup(false);
  };
  const [imageList, setImageList] = useState([null, null, null]);

  const handleImageChange = (index, e, slideId) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImageList = [...imageList];
        newImageList[index] = reader.result;
        setImageList(newImageList);
        setSlidesData((prevSlidesData) =>
          prevSlidesData.map((slide) =>
            slide.id === slideId ? { ...slide, Photos: newImageList } : slide
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const addImageBox = () => {
    setImageList([...imageList, null]);
  };

  const removeImageBox = (index) => {
    const newImageList = [...imageList];
    newImageList.splice(index, 1);
    setImageList(newImageList);
  };
  const [features, setFeatures] = useState([""]);

  const addFeature = () => {
    setFeatures([...features, ""]);
  };

  const handleFeatureChange = (index, event, slideId) => {
    const newFeatures = [...features];
    newFeatures[index] = event.target.value;
    setFeatures(newFeatures);
    setSlidesData((prevSlidesData) =>
      prevSlidesData.map((slide) =>
        slide.id === slideId ? { ...slide, Key: newFeatures } : slide
      )
    );
  };

  const handleLocation = (index, value) => {
    const newLocations = [...locations];
    newLocations[index] = value;
    setLocations(newLocations);
  };

  // Function to add a new location input field
  const addLocationField = () => {
    setLocations([...locations, ""]);
  };

  const [slidesData, setSlidesData] = useState([
    {
      id: 1,
      Location: [""],
      Description: "",
      Photos: [""],
      Price: "",
      propertyName: "",
      Dollar: "",
      Key: [""],
      Bedrooms: "",
      Bathrooms: "",
      Area: "",
      Published: false,
    },
  ]);
  const getFeePrograms = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/V1/gethomeData`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("res", response?.data?.data);
      // const fetchedData = response.data.data;
      const initialSwitchState = {};
      // fetchedData.forEach((slide) => {
      //   initialSwitchState[slide.id] = slide.Published;
      // });
      const data = response.data.data;
      if (Array.isArray(data) && data.length > 0) {
        setSlidesData(data);
      } else {
        const defaultData = [{ id: "1", Photos: "" }];
        setSlidesData(defaultData);
      }
      setToggleSwitch(initialSwitchState);
    } catch (e) {
      console.log("err", e);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getFeePrograms();
    }
  }, []);

  const handleDescriptionChange = (slideId, value) => {
    setSlidesData((prevSlidesData) =>
      prevSlidesData.map((slide) =>
        slide.id === slideId ? { ...slide, Description: value } : slide
      )
    );
  };

  const handlePriceChange = (slideId, value) => {
    setSlidesData((prevSlidesData) =>
      prevSlidesData.map((slide) =>
        slide.id === slideId ? { ...slide, Price: value } : slide
      )
    );
  };

  const handleDollarChange = (slideId, value) => {
    setSlidesData((prevSlidesData) =>
      prevSlidesData.map((slide) =>
        slide.id === slideId ? { ...slide, Dollar: value } : slide
      )
    );
  };

  const handleBedroomsChange = (slideId, value) => {
    setSlidesData((prevSlidesData) =>
      prevSlidesData.map((slide) =>
        slide.id === slideId ? { ...slide, Bedrooms: value } : slide
      )
    );
  };
  const handleBathroomsChange = (slideId, value) => {
    setSlidesData((prevSlidesData) =>
      prevSlidesData.map((slide) =>
        slide.id === slideId ? { ...slide, Bathrooms: value } : slide
      )
    );
  };
  const handleAreaChange = (slideId, value) => {
    setSlidesData((prevSlidesData) =>
      prevSlidesData.map((slide) =>
        slide.id === slideId ? { ...slide, Area: value } : slide
      )
    );
  };
  const saveFeePrograms = async (slideId) => {
    const slideData = slidesData.find((slide) => slide.id === slideId);
    try {
      const config = {
        method: "POST",
        mode: "cors",
        url: `${API_BASE_URL}/V1/createhomeData`,
        headers: {
          "Content-Type": "application/json",
        },
        data: slideData,
      };
      const response = await axios(config);
      if (response?.data?.status) {
        toast.success("Data created successfully");
      }
    } catch (e) {
      console.log("Error:", e);
    }
  };

  const handleSwitch = async (slideId) => {
    //e.stopPropagation();
    // const slideData = slidesData.find((slide) => slide.id === slideId);
    const isPublished = !toggleSwitch[slideId];
    setToggleSwitch((prev) => ({
      ...prev,
      [slideId]: isPublished,
    }));
    try {
      const config = {
        method: "PUT",
        mode: "cors",
        url: `${API_BASE_URL}/V1/updatehomeData/${slideId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { id: slideId, Published: isPublished },
      };
      const response = await axios(config);
      if (response?.data?.status) {
        toast.success("Data updated successfully");
      }
    } catch (e) {
      console.log("Error:", e);
    }
  };

  const [togglePop, setTogglePop] = useState(false);
  const [rowPopup, setRowPopup] = useState(false);
  const [activeSlideId, setActiveSlideId] = useState(null);

  useEffect(() => {
    setRowPopup(true);
  }, []);

  const handleAddRow = async () => {
    setRowPopup(true);
    // await addRow();
  };
  async function addRow() {
    setSlidesData((prevSlidesData) => [
      ...prevSlidesData,
      {
        id: prevSlidesData.length + 1,
        Location: [""],
        Description: "",
        Photos: [""],
        Price: "",
        Dollar: "",
        propertyName: "",
        Key: [""],
        Bedrooms: "",
        Bathrooms: "",
        Area: "",
        Published: false,
      },
    ]);
  }
  const openPopUp = (slideId) => {
    setActiveSlideId(slideId); // Set the slide ID that is being edited
    setTogglePop(true);
  };

  // Reset active slide and close popup
  const closePopUp = () => {
    setActiveSlideId(null); // Reset the active slide ID
    setTogglePop(false);
  };

  // Handle the actual switch action when "Save" is clicked
  const onSaveChanges = async () => {
    // Close the popup first
    closePopUp();
    // Proceed with saving changes
    if (activeSlideId !== null) {
      await handleSwitch(activeSlideId);
    }
  };

  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleDeleteAccord = (id) => {
    const updatedSlidesData = slidesData.filter((slide) => slide.id !== id);
    setSlidesData(updatedSlidesData);

    if (expanded === `panel${id}`) {
      setExpanded(null);
    }
  };

  // console.log("slidesData:", slidesData);

  return (
    <>
      <div className="flex flex-col mt-[2rem] ml-2 ">
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
          <span className="border-b-2 border-gray-700 ">
            {" "}
            Property Listings
          </span>
        </p>
      </div>

      <div className="flex flex-col ">
        {slidesData.map((slide, index) => (
          <div
            className="flex lg:ml-2 2xl:w-[900px] lg:w-[600px] my-2 rounded-3xl"
            key={slide.id}
          >
            <SaveChangesPopup
              open={togglePop}
              onSave={onSaveChanges}
              onClose={closePopUp}
            />

            {/* {!rowPopup && ( */}
            <Accordion
              key={slide.id}
              expanded={expanded === `panel${slide.id}`}
              onChange={handleChange(`panel${slide.id}`)}
            >
              <AccordionSummary
                className="text-base text-opacity-60 font-base text-[#2C2C2C]"
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${slide.id}a-content`}
                id={`panel${slide.id}a-header`}
              >
                <Typography>
                  {slide.Heading && slide.PropertyType
                    ? `${slide.Heading} - ${slide.PropertyType}`
                    : `Property ${index + 1}`}
                </Typography>
                <span className="ml-auto publish-button-wrapper">
                  <PublishButton
                    isPublished={toggleSwitch[slide.id]}
                    openPopUp={() => openPopUp(slide.id)}
                    slideId={slide.id}
                  />
                </span>
              </AccordionSummary>
              <AccordionDetails className="flex flex-col">
                <div className="flex flex-row space-x-4">
                  <div className="flex flex-col ">
                    <div className="flex flex-row">
                      <div className="flex flex-col">
                        <div>
                          <label className="2xl:text-[14px] font-semibold text-[#1A233899]">
                            Description
                          </label>
                        </div>
                        <div>
                          <textarea
                            className=" text-[12px] border border-1 border-[#0000003B] px-2 py-2 rounded  lg:text-[12px] font-semibold text-[#1A233899] lg:w-[344px] lg:h-[117px]"
                            value={slide.Description}
                            placeholder="Type Description.."
                            name="chapterDescription"
                            onChange={(e) =>
                              handleDescriptionChange(slide?.id, e.target.value)
                            }
                          ></textarea>
                          <p className="text-[#1A233899] font-sm ">
                            {
                              slide?.Description?.split(" ").filter(Boolean)
                                .length
                            }
                            /250 Words Remaining
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div>
                          <label className="pl-[1rem] 2xl:[14px] mt-4 font-semibold text-[#1A233899]">
                            Choose currency/ Price
                          </label>
                        </div>
                        <div className="flex space-x-2 pl-[1rem] pb-4">
                          <input
                            disabled
                            className=" text-[12px] border border-1 border-[#0000003B] text-center px-2 py-2 w-[41px] h-[56px] rounded"
                            placeholder="د.إ"
                          />
                          <input
                            type="text"
                            className=" text-[12px] lg:w-[8rem]   border border-1 border-[#0000003B] px-2 py-2 w-[41px] h-[56px]  rounded"
                            value={slide.Price}
                            placeholder="Type price here.."
                            name="Heading"
                            onChange={(e) =>
                              handlePriceChange(slide?.id, e.target.value)
                            }
                          />
                        </div>
                        <div className="flex space-x-2 pl-[1rem]">
                          <input
                            disabled
                            className=" text-[12px] border border-1 border-[#0000003B] text-center px-2 py-2 w-[41px] h-[56px]  rounded"
                            placeholder="$"
                          />
                          <input
                            type="text"
                            className=" text-[12px] lg:w-[8rem]   border border-1 border-[#0000003B] px-2 py-2 w-[41px] h-[56px]  rounded"
                            value={slide.Dollar}
                            placeholder="Type price here.."
                            name="Heading"
                            onChange={(e) =>
                              handleDollarChange(slide?.id, e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="2xl:[14px] mt-4 font-semibold text-[#1A233899]">
                        Location
                      </label>
                      {locations.map((location, index) => (
                        <div key={index}>
                          <input
                            id={`id${index}${slide?.id}`}
                            type="text"
                            className="text-[12px] border border-1 border-[#0000003B] px-2 py-2 2xl:w-[344px] 2xl:h-[56px] lg:w-[256px] lg:h-[40px] rounded"
                            value={location}
                            placeholder="Type location here.."
                            onChange={(e) =>
                              handleLocation(
                                `id${index}${slide?.id}`,
                                e.target.value
                              )
                            }
                          />
                        </div>
                      ))}
                      <button onClick={addLocationField}>+ Add Location</button>
                    </div>
                    <div className="flex flex-row mt-8 space-x-4 ">
                      <div className="flex flex-col">
                        <label className="] 2xl:[14px]  font-semibold text-[#1A233899]">
                          Bedrooms
                        </label>
                        <input
                          type="text"
                          className=" text-[12px]  border border-1 border-[#0000003B] px-2 py-2 2xl:w-[10rem] 2xl:h-[56px] lg:w-[6rem] lg:h-[40px]  rounded"
                          value={slide.Bedrooms}
                          placeholder="Add here"
                          name="Bedrooms"
                          onChange={(e) =>
                            handleBedroomsChange(slide?.id, e.target.value)
                          }
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className=" 2xl:[14px]  font-semibold text-[#1A233899]">
                          Bathrooms
                        </label>
                        <input
                          type="text"
                          className=" text-[12px]  border border-1 border-[#0000003B] px-2 py-2 2xl:w-[10rem] 2xl:h-[56px] lg:w-[6rem] lg:h-[40px]  rounded"
                          value={slide.Bathrooms}
                          placeholder="Add here"
                          name="Bathrooms"
                          onChange={(e) =>
                            handleBathroomsChange(slide?.id, e.target.value)
                          }
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className=" 2xl:[14px]  font-semibold text-[#1A233899]">
                          Area
                        </label>
                        <input
                          type="text"
                          className=" text-[12px]   border border-1 border-[#0000003B] px-2 py-2 2xl:w-[10rem] 2xl:h-[56px] lg:w-[6rem] lg:h-[40px]  rounded"
                          value={slide.Area}
                          placeholder="Enter square feet"
                          name="Area"
                          onChange={(e) =>
                            handleAreaChange(slide?.id, e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className=" text-lg font-medium text-[#1A2338B2]">
                      Key Features and Amenities
                    </label>
                    <div
                      className="pl-[1rem] flex flex-col space-y-2 rounded-lg  bg-[#FFFFFF] w-[300px] h-[478px]"
                      style={{ border: "2px solid #D9D9D9" }}
                    >
                      <div className="pt-[2rem] ">
                        {features.map((feature, index) => (
                          <input
                            key={index}
                            type="text"
                            placeholder="Type features here.."
                            value={feature}
                            onChange={(event) =>
                              handleFeatureChange(index, event, slide.id)
                            }
                            className="  border border-1 border-[#0000003B] px-2 py-2 w-[270px] h-[56px] rounded"
                          />
                        ))}

                        {/* {features.map((feature, index) => (
                          <input
                            key={`${slide.id}-${index}`}
                            id={`${slide.id}-${index}`}
                            type="text"
                            placeholder="Type features here.."
                            value={feature}
                            onChange={(event) =>
                              handleFeatureChange(slide?.id, index, event)
                              // handleFeatureChange(index, event, slide?.id)
                            }
                            className="border border-1 border-[#0000003B] px-2 py-2 w-[270px] h-[56px] rounded"
                          />
                        ))} */}
                      </div>
                      <div className="flex justify-center">
                        <button
                          className="border border-1 border-[#0000003B] px-2 py-2 w-[270px] h-[56px] rounded"
                          onClick={addFeature}
                        >
                          <AiOutlinePlus />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className=" text-lg font-medium text-[#1A2338B2]">
                      Image
                    </p>
                    <div
                      className="pl-[1rem] flex flex-col  rounded-lg   bg-[#FFFFFF] w-[300px] h-[478px]"
                      style={{ border: "2px solid #D9D9D9" }}
                    >
                      <p className="my-2 font-bold   text-xs text-[#1A2338B2] opacity-70 ">
                        Drag & Drop or Double click to upload image.
                      </p>
                      <div className="flex flex-wrap gap-4">
                        {imageList?.map((imageSrc, index) => (
                          <div className="flex flex-col">
                            <div
                              key={index}
                              onClick={() =>
                                document
                                  .getElementById(`fileInput-${index}`)
                                  .click()
                              }
                              onChange={(e) =>
                                handleImageChange(index, e, slide?.id)
                              }
                              className="flex flex-col justify-center w-16 h-16 p-2 text-center border-2 border-gray-300 border-dashed rounded cursor-pointer"
                              style={{
                                background: "rgba(194, 194, 194, 0.56)",
                              }}
                            >
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id={`fileInput-${index}`}
                              />
                              {imageSrc ? (
                                <img
                                  src={imageSrc}
                                  alt={`uploaded-${index}`}
                                  className="object-cover w-full h-full rounded"
                                />
                              ) : (
                                <MdAdd className="flex self-center mx-auto text-gray-500 cursor-pointer" />
                              )}
                            </div>
                            {imageSrc && (
                              <MdCancel
                                size={24}
                                className="text-red-500 cursor-pointer"
                                onClick={() => removeImageBox(index)}
                              />
                            )}
                          </div>
                        ))}
                        <div
                          className="flex w-16 h-16 p-2 text-center border-2 border-gray-300 border-dashed rounded cursor-pointer"
                          onClick={addImageBox}
                        >
                          <MdAdd className="flex self-center mx-auto text-gray-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex self-end">
                  <SaveButton
                    onSave={() => saveFeePrograms(slide.id)}
                    onCancel={() => handleDeleteAccord(slide.id)}
                  />
                </div>
              </AccordionDetails>
            </Accordion>
            {/* )} */}
          </div>
        ))}
        <button
          className="flex self-center px-6 py-3 mt-4 mb-8 border-2 border-gray-500 rounded-lg"
          onClick={handleAddRow}
        >
          ADD ROW +
        </button>

        <Namepopups
          open={rowPopup}
          onClose={() => setRowPopup(false)}
          onAdd={handleAddProperty}
        />
      </div>
    </>
  );
};

export default Home;
