import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai"; // Assuming you're using react-icons for the plus icon

const Key = () => {
  const [features, setFeatures] = useState([""]); // Start with one empty feature

  const addFeature = () => {
    setFeatures([...features, ""]); // Add an empty string to the features array
  };

  const handleFeatureChange = (index, event) => {
    const newFeatures = [...features];
    newFeatures[index] = event.target.value;
    setFeatures(newFeatures);
  };

  return (
    <div className="flex flex-col">
      <p className=" text-lg font-medium text-[#1A2338B2]">
        Key Features and Amenities
      </p>
      <div
        className="pl-[1rem] flex flex-col space-y-2   rounded-lg   bg-[#FFFFFF] w-[300px] h-[478px]"
        style={{ border: "2px solid #D9D9D9" }}
      >
        <div className="pt-[2rem] ">
          {features.map((feature, index) => (
            <input
              key={index}
              type="text"
              placeholder="Type features here...."
              value={feature}
              onChange={(event) => handleFeatureChange(index, event)}
              className="  border border-1 border-[#0000003B] px-2 py-2 w-[270px] h-[56px]    rounded"
            />
          ))}
        </div>
        <div className="flex justify-center">
          <button
            className=" border border-1 border-[#0000003B] px-2 py-2  w-[270px] h-[56px] rounded"
            onClick={addFeature}
          >
            <AiOutlinePlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Key;
