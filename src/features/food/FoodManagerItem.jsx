import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../common/modalSlice";
import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import { UpdateFoodStatus } from "../../services/FoodService";
import { useEffect } from "react";
import { showNotification } from "../common/headerSlice";

const Status = ({ value }) => {
  if (value === true) {
    return <div className="badge badge-secondary">Sẵn sàng</div>;
  }
  return <div className="badge badge-ghost">Chưa sẵn sàng</div>;
};

const StatusButton = ({ onClick, status, isLoading }) => {
  return (
    <button
      className={`btn btn-circle btn-secondary ${isLoading ? "loading" : ""}`}
      onClick={onClick}
    >
      {!isLoading && !status && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
          />
        </svg>
      )}
      {!isLoading && status && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
          />
        </svg>
      )}
    </button>
  );
};

const FoodManagerItem = ({ item }) => {
  const dispatch = useDispatch();
  const price = item.price.toLocaleString() + "VND";

  const {
    updateFoodStatusRes,
    updateFoodStatusErr,
    updateFoodStatusIsLoading,
    editFoodStatusAction,
  } = UpdateFoodStatus();

  useEffect(() => {
    if (updateFoodStatusRes) {
      dispatch(
        showNotification({
          message: "Sửa trạng thái món ăn thành công!",
          status: 1,
        })
      );
    } else if (updateFoodStatusErr) {
      dispatch(
        showNotification({
          message: "Sửa trạng thái món ăn thất bại!",
          status: 0,
        })
      );
    }
  }, [updateFoodStatusRes, updateFoodStatusErr, dispatch]);

  const openEditFoodModal = (foodId) => {
    dispatch(
      openModal({
        title: "Sửa món ăn",
        bodyType: MODAL_BODY_TYPES.EDIT_FOOD,
        size: "lg",
        extraObject: { foodId: foodId },
      })
    );
  };

  const toggleStatusHandler = (id, status) => {
    editFoodStatusAction(id, !status);
  };

  return (
    <li className="w-full col-span-1 relative group shadow-xl rounded-xl overflow-hidden">
      <div>
        <div className="absolute z-10 p-3 flex justify-between items-center w-full duration-200">
          <button
            className="btn btn-circle"
            onClick={openEditFoodModal.bind(this, item.id)}
          >
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
          <StatusButton
            onClick={toggleStatusHandler.bind(this, item.id, item.status)}
            status={item.status}
            isLoading={updateFoodStatusIsLoading}
          />
        </div>
        <div className="card w-full bg-base-100">
          <figure className="bg-yellow relative">
            <img src={item.image} alt="Food" />
          </figure>
          <div className="card-body p-5">
            <h3 className="card-title truncate">{item.name}</h3>
            <div>
              <span className="truncate italic">{item.description}</span>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-lg text-green">{price}</h2>
              <Status value={item.status} />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default FoodManagerItem;
