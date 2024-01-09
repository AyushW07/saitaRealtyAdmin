import React, { useEffect, useState } from "react";
import { MdAdd, MdCancel } from "react-icons/md";

import { API_BASE_URL } from "../../src/config";

import axios from "axios";

const Gallery = () => {
  const [imageList, setImageList] = useState([null, null, null]);

  const handleImageChange = (index) => (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImageList = [...imageList];
        newImageList[index] = reader.result;
        setImageList(newImageList);
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

  //   const handleCancel = () => {
  //     setImageList(null);
  //   };

  //   const openPopUp = (slideId) => {
  //     setActiveSlideId(slideId);
  //     setTogglePop(true);
  //     setToggleSwitch(!toggleSwitch);
  //   };

  //   async function handleSwitch(e, activeSlideId) {
  //     // e.stopPropagation();
  //     try {
  //       const config = {
  //         method: "PUT",
  //         mode: "cors",
  //         url: `${API_BASE_URL}/updategalleryData/${1}`,
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         data: { Published: toggleSwitch },
  //       };
  //       const response = await axios(config);
  //       console.log(response?.data?.status);
  //       if (response?.data?.status) {
  //         toast.success("Published Successfully");
  //       }
  //     } catch (e) {
  //       console.log("Error:", e);
  //     }
  //   }
  //   async function saveHomeData() {
  //     try {
  //       const payload = {
  //         id: 1,
  //         Photos: imageList,
  //         Published: toggleSwitch,
  //       };
  //       const config = {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       };
  //       const response = await axios.post(
  //         `${API_BASE_URL}/creategalleryData`,
  //         payload,
  //         config
  //       );
  //       if (response.data.status) {
  //         toast.success("Data created successfully");
  //       }
  //     } catch (e) {
  //       console.log("Error:", e);
  //     }
  //   }
  //   const [activeSlideId, setActiveSlideId] = useState(null);
  const getHomeData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getgalleryData`);

      const photos = response.data.data?.Photos;
      if (Array.isArray(photos) && photos.length > 0) {
        setImageList(photos);
      } else {
        const defaultPhotos = ["", "", ""];
        setImageList(defaultPhotos);
      }
    } catch (e) {
      console.log("err", e);
    }
  };
  useEffect(() => {
    getHomeData();
  }, []);

  return (
    <div className="flex flex-col">
      <p className=" text-lg font-medium text-[#1A2338B2]">Image</p>
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
                  document.getElementById(`fileInput-${index}`).click()
                }
                onChange={handleImageChange(index)}
                className="flex flex-col justify-center w-16 h-16 p-2 text-center border-2 border-gray-300 border-dashed rounded cursor-pointer"
                style={{ background: "rgba(194, 194, 194, 0.56)" }}
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
  );
};

export default Gallery;
