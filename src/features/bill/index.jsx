import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { showNotification } from "../common/headerSlice";
import { Link } from "react-router-dom";
import Orders from "./conponents/Orders";
import BillsList from "./conponents/BillsList";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewLeadModal = () => {
    dispatch(
      openModal({
        title: "Add New Lead",
        bodyType: MODAL_BODY_TYPES.LEAD_ADD_NEW,
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewLeadModal()}
      >
        Add New
      </button>
    </div>
  );
};

function Bill() {
  const [currentTab, setCurrentTab] = useState(1);
  const changeTabHandler = (event) => {
    const elementId = event.target.id;
    if(elementId === "order") {
      setCurrentTab(1);
    } else if(elementId === "bill") {
      setCurrentTab(2);
    }
  };

  const firstTabClasses = `tab tab-lifted ${
    currentTab === 1 ? "tab-active" : ""
  } text-lg`;

  const secondTabClasses = `tab tab-lifted ${
    currentTab === 2 ? "tab-active" : ""
  } text-lg`;

  return (
    <>
      <div className="ml-4">
        <div className="tabs">
          <Link
            className={firstTabClasses}
            id="order"
            onClick={changeTabHandler}
          >
            Đơn đặt
          </Link>
          <Link
            className={secondTabClasses}
            id="bill"
            onClick={changeTabHandler}
          >
            Hóa đơn
          </Link>
        </div>
      </div>
      {currentTab === 1 && <Orders/>}
      {currentTab === 2 && <BillsList/>}
    </>
  );
}

export default Bill;
