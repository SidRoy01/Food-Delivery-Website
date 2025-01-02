import React, { useState, useEffect } from "react";
import { MdDoubleArrow } from "react-icons/md";
import { Card, Dominoscard } from "./Index";
import { NavLink } from "react-router-dom";
import axios from "axios";

function RestrauntChains() {
  const [rests, setRests] = useState([]);
  const [filterdRests, setfilterdRests] = useState([]);
  const [filterType, setfilterType] = useState("");

  useEffect(() => {
    const fetchRestaurent = async () => {
      try {
        const response = await axios.get(
          `https://api.allorigins.win/get?url=${encodeURIComponent(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.5743545&lng=88.3628734&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
          )}`
        );
        const data = response.data;
        const shop = JSON.parse(data.contents);

        const restaurent =
          shop?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants || [];

        setRests(restaurent);
        setfilterdRests(restaurent);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurent();
  }, []);

  const handleFilter = (type) => {
    let sortetList = [...rests];
    if (type === "deliveryTime") {
      sortetList.sort(
        (a, b) => a.info.sla.deliveryTime - b.info.sla.deliveryTime
      );
    } else if (type === "priceLowtoHigh") {
      sortetList.sort((a, b) => {
        const priceA = parseInt(
          a.info.costForTwo.replace(/[^\d]/g, "") || "0",
          10
        );
        const priceB = parseInt(
          b.info.costForTwo.replace(/[^\d]/g, "") || "0",
          10
        );
        return priceA - priceB;
      });
    } else if (type === "priceHIghtoLow") {
      sortetList.sort((a, b) => {
        const priceA = parseInt(
          a.info.costForTwo.replace(/[^\d]/g, "") || "0",
          10
        );
        const priceB = parseInt(
          b.info.costForTwo.replace(/[^\d]/g, "") || "0",
          10
        );
        return priceB - priceA;
      });
    } else if (type === "rating") {
      sortetList.sort((a, b) => b.info.avgRating - a.info.avgRating);
    }
    setfilterdRests(sortetList);
    setfilterType(type);
  };

  return (
    <div className="max-w-[1000px] m-auto mt-5 p-2 ">
      <div className="text-3xl font-bold">
        <h1>Top Restaurants Near You</h1>
      </div>
      <div className="flex justify-start items-center gap-7 mt-5 ">
        <p className="font-bold underline">
          Filters <MdDoubleArrow className="inline" />
        </p>
        <button
          onClick={() => handleFilter("deliveryTime")}
          className={filterType === "deliveryTime" ? "text-blue-500" : ""}
        >
          Fast Delivery
        </button>
        <select
          onChange={(e) => handleFilter(e.target.value)}
          className="rounded-md p-1"
        >
          <option value="" hidden>
            Sort by Price
          </option>
          <option value="priceLowtoHigh">Price: Low to High</option>
          <option value="priceHIghtoLow">Price: High to Low</option>
        </select>
        <button
          onClick={() => handleFilter("rating")}
          className={filterType === "rating" ? "text-blue-500" : ""}
        >
          Top Rated
        </button>
      </div>
      <div className="flex flex-wrap items-center justify-evenly gap-2 ">
        <NavLink to="/DominosMenu">
          <Dominoscard />
        </NavLink>

        {filterdRests.map((d, i) => {
          return <Card {...d.info} key={i} />;
        })}
      </div>
    </div>
  );
}

export default RestrauntChains;
