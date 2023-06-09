import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../common/modalSlice";
import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";

const Status = ({ value }) => {
  if (value === 1) {
    return <div className="badge badge-secondary">Sẵn sàng</div>;
  }
  return <div className="badge badge-ghost">Chưa sẵn sàng</div>;
};

const FoodManagerItem = ({ item }) => {
  const dispatch = useDispatch();
  const price = item.price.toLocaleString() + "VND";

  const openEditFoodModal = () => {
    dispatch(
      openModal({
        title: "Sửa món ăn",
        bodyType: MODAL_BODY_TYPES.EDIT_FOOD,
        size: "lg"
      })
    );
  };

  return (
    <li className="w-full col-span-1 relative">
      <div className="absolute z-10 p-3">
        <button className="btn btn-circle" onClick={openEditFoodModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </button>
      </div>
      <div className="card w-full bg-base-100 shadow-xl">
        <figure className="bg-yellow">
          <img src={item.image} alt="Food" />
        </figure>
        <div className="card-body p-5">
          <h3 className="card-title truncate">{item.name}</h3>
          <div>
            <span className="font-semibold">Nguyên liệu: </span>
            <span>{item.ingredients}</span>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg text-green">{price}</h2>
            <Status value={item.status} />
          </div>
        </div>
      </div>
    </li>
  );
};

export default FoodManagerItem;
