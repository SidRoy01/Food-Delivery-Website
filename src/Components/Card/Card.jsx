import React from "react";

function Card(props) {
  return (
    <>
      <div className="w-[200px] mt-5">
        <div className=" group h-[120px] rounded-3xl overflow-hidden relative">
          <img
            src={
              "https://media-assets.swiggy.com/swiggy/image/upload/" +
              props.cloudinaryImageId
            }
            className=" group-hover:scale-125 duration-100 object-cover w-full h-full"
          />
          <div className="image-overlay w-full h-full absolute top-0  flex items-end p-2 font-bold text-md text-white">
            {props.aggregatedDiscountInfoV3?.header}{" "}
            {props.aggregatedDiscountInfoV3?.subHeader}
          </div>
        </div>

        <div className="m-2">
          <div className="mt-2 font-bold text-xl whitespace-nowrap overflow-hidden text-ellipsis">
            {props.name}
          </div>
          <div className="font-semibold overflow-hidden">
            {props.avgRating} Stars. {props.sla.slaString}
            <p>{props.costForTwo}</p>
          </div>
          <div className="text-gray-600">
            <p className="whitespace-nowrap overflow-hidden text-ellipsis">
              {props.cuisines.join(", ")}
            </p>
            <p>{props.areaName}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
