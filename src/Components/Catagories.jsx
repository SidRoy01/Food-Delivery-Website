import React, { useState, useEffect } from "react";
import { LuArrowBigRight, LuArrowBigLeft } from "react-icons/lu";
import axios from "axios";

function Catagories() {
  const [catSlide, setCatSlide] = useState(0);
  const [catImg, setCatImg] = useState([]);

  const nextCat = () => {
    if (catImg.length - 6 == catSlide) return false;
    setCatSlide(catSlide + 2);
  };

  const prevCat = () => {
    if (catSlide == 0) return false;
    setCatSlide(catSlide - 2);
  };

  const navigation = [
    {
      symbol: <LuArrowBigLeft onClick={prevCat} />,
    },
    {
      symbol: <LuArrowBigRight onClick={nextCat} />,
    },
  ];

  useEffect(() => {
    const fetchCetagories = async () => {
      try {
        const response = await axios.get(
          `https://api.allorigins.win/get?url=${encodeURIComponent(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.5743545&lng=88.3628734&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
          )}`
        );
        const data = response.data;
        const result = JSON.parse(data.contents);

        setCatImg(result?.data?.cards[0]?.card?.card?.imageGridCards?.info);
      } catch (error) {
        console.error("Error fetching Categories:", error);
      }
    };
    fetchCetagories();
  }, []);

  return (
    <>
      <div className="max-w-[1000px] m-auto p-3">
        <div className=" flex items-center justify-between">
          <div className="text-3xl font-bold">
            <h1>Categories.</h1>
          </div>
          <div className="hidden md:flex gap-4">
            {navigation.map((nav, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-center items-center text-2xl   rounded-full cursor-pointer hover:bg-slate-300"
                >
                  {nav.symbol}
                </div>
              );
            })}
          </div>
        </div>
        <div className="hidden md:flex overflow-hidden  mt-3">
          {catImg.map((image, index) => {
            return (
              <div
                style={{ transform: `translateX(-${catSlide * 100}%)` }}
                key={index}
                className="w-[165px] h-[195px] shrink-0 duration-700"
              >
                <img
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/${image.imageId}`}
                  alt=""
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            );
          })}
        </div>
      </div>
      {/* {Mobile Scroling} */}
      <div className="flex md:hidden overflow-x-auto space-x-4 p-1">
        {catImg.map((image, index) => (
          <div key={index} className="w-[120px] h-[150px] shrink-0">
            <img
              src={`https://media-assets.swiggy.com/swiggy/image/upload/${image.imageId}`}
              alt=""
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Catagories;
