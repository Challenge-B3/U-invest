import React from "react";
import { AiOutlineUser, AiOutlineStar } from "react-icons/ai";

const Course = ({ image, subtitle, title, ucoins, rating, price }) => {
  return (
    <div className="p-2 shadow-lg min-w-[15rem] bg-white rounded-md">
      <img src={image} alt="" />
      <div className="mt-2 text-xs text-Teal">{subtitle}</div>
      <div className="text-sm mt-2 font-bold">{title}</div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-Solitude p-1 rounded-full">
            <AiOutlineUser className="text-Teal" />
          </div>
          <div className="text-sm font-bold">{ucoins}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-Solitude p-1 rounded-full">
            <AiOutlineStar className="text-yellow" />
          </div>
          <div className="text-sm font-bold">{rating}</div>
        </div>
      </div>
    </div>
  );
};

export default Course;
