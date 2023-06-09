import React from "react";
import { Link } from "react-router-dom";

const Status = ({ status }) => {
  if (status === 1) {
    return <div className="badge badge-primary">Sẵn sàng</div>;
  }
  return <div className="badge">Hết nguyên liệu</div>;
};

const FoodItem = ({ item }) => {
  const price = item.price.toLocaleString() + "VND";
  return (
    <li className="group col-span-1 h-36 rounded-xl overflow-hidden bg-white drop-shadow-md relative">
      <div className="w-full h-16 z-0 absolute bg-red opacity-10 bottom-0 rounded-md group-hover:h-full group-hover:opacity-100 duration-300"></div>
      <Link
        to="#"
        className="w-12 h-12 bg-orange-light absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-12 rounded-full flex justify-center items-center shadow-xl opacity-0 group-hover:opacity-100 duration-300 group-hover:-translate-y-1/2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      </Link>
      <img
        src={item.image}
        className="w-full h-full object-contain z-10 relative group-hover:scale-125 duration-300"
        alt="anh san pham"
      />
      <div className="absolute z-10 bottom-0 px-5 pb-2 w-full">
        <h4 className="w-full font-bold truncate cursor-default shadow-2xl duration-300">
          {item.name}
        </h4>
        <div className="flex justify-between">
          <span className="text-md text-yellow font-semibold">{price}</span>
          <Status status={1} />
        </div>
      </div>
    </li>
  );
};

export default FoodItem;
