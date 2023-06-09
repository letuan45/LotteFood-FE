import { useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import SearchBar from "../../components/Input/SearchBar";
import { useDispatch } from "react-redux";
import { openModal } from "../common/modalSlice";
import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import IngreOrderList from "./components/IngreOrderList";

const DUMMY_ORDERS = [
  {
    id: 1,
    date: "03/06/2023",
    status: 1,
    employee: "Lê Tuấn",
    totalPrice: 2000000,
  },
  {
    id: 2,
    date: "03/06/2023",
    status: 2,
    employee: "Lê Tuấn",
    totalPrice: 2000000,
  },
  {
    id: 3,
    date: "03/06/2023",
    status: 1,
    employee: "Lê Tuấn",
    totalPrice: 2000000,
  },
  {
    id: 4,
    date: "03/06/2023",
    status: 3,
    employee: "Lê Tuấn",
    totalPrice: 2000000,
  },
  {
    id: 5,
    date: "03/06/2023",
    status: 1,
    employee: "Lê Tuấn",
    totalPrice: 2000000,
  },
];

const Actions = () => {
  const dispatch = useDispatch();

  const handleOpenAddIngredient = () => {
    dispatch(
      openModal({
        title: "Nhập nguyên liệu",
        bodyType: MODAL_BODY_TYPES.ADD_INGRE_ORDER,
        size: "xl"
      })
    );
  };

  return (
    <div className="flex items-center justify-end">
      <button className="ml-3" onClick={handleOpenAddIngredient}>
        <div className="btn btn-accent">Thêm</div>
      </button>
    </div>
  );
};

function IngreOrders() {
  const items = DUMMY_ORDERS;

  return (
    <div>
      <TitleCard
        title="Danh sách phiếu nhập"
        TopSideButtons={<Actions />}
      >
        <IngreOrderList items={items} />
      </TitleCard>
    </div>
  );
}

export default IngreOrders;
