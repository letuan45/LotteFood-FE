import { useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import SearchBar from "../../components/Input/SearchBar";
import { useDispatch } from "react-redux";
import { openModal } from "../common/modalSlice";
import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import IngreOrderList from "./components/IngreOrderList";
import { GetIngreOrders } from "../../services/IngreOrderService";
import { useEffect } from "react";
import LoadingSpinner from "../../components/Indicator/LoadingSpinner";

const Actions = ({ onReload }) => {
  const dispatch = useDispatch();

  const handleOpenAddIngredient = () => {
    dispatch(
      openModal({
        title: "Nhập nguyên liệu",
        bodyType: MODAL_BODY_TYPES.ADD_INGRE_ORDER,
        size: "xl",
      })
    );
  };

  return (
    <div className="flex items-center justify-end">
      <button className="ml-3" onClick={onReload}>
        <div className="btn btn-primary">
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
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </div>
      </button>
      <button className="ml-3" onClick={handleOpenAddIngredient}>
        <div className="btn btn-accent">Thêm</div>
      </button>
    </div>
  );
};

function IngreOrders() {
  const [items, setItems] = useState([]);
  const {
    getIngreOrdersRes,
    getIngreOrdersErr,
    getIngreOrdersIsLoading,
    reloadIngreOrders,
  } = GetIngreOrders();

  useEffect(() => {
    if (getIngreOrdersRes) {
      setItems([...getIngreOrdersRes].reverse());
    } else if (getIngreOrdersErr) {
      alert("Không lấy được danh sách phiếu nhập");
    }
  }, [getIngreOrdersRes, getIngreOrdersErr]);

  return (
    <div>
      <TitleCard
        title="Danh sách phiếu nhập"
        TopSideButtons={<Actions onReload={reloadIngreOrders} />}
      >
        {getIngreOrdersIsLoading && <LoadingSpinner />}
        {!getIngreOrdersIsLoading && items && items.length > 0 && (
          <IngreOrderList items={items} />
        )}
        {!getIngreOrdersIsLoading && (!items || items.length === 0) && (
          <h3 className="text-center">Không có phiếu nhập nào</h3>
        )}
      </TitleCard>
    </div>
  );
}

export default IngreOrders;
