import TitleCard from "../../components/Cards/TitleCard";
import { useDispatch } from "react-redux";
import { openModal } from "../common/modalSlice";
import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import SearchBar from "../../components/Input/SearchBar";
import { useState } from "react";
import CustomerList from "./CustomerList";
import { GetAllCustomer } from "../../services/CustomerService";
import { useEffect } from "react";
import { showNotification } from "../common/headerSlice";
import { searchValue } from "../../utils/searchHandler";
import LoadingSpinner from "../../components/Indicator/LoadingSpinner";

const Actions = ({ onReload, changeSearchValue }) => {
  const dispatch = useDispatch();

  const openAddModal = () => {
    dispatch(
      openModal({
        title: "Thêm khách hàng",
        bodyType: MODAL_BODY_TYPES.ADD_CUSTOMER,
      })
    );
  };

  const onChangeSearchValue = (value) => {
    changeSearchValue(value);
  };

  return (
    <div className="flex justify-end items-center">
      <SearchBar setSearchText={onChangeSearchValue} />
      <button className="btn btn-primary" onClick={onReload}>
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
      </button>
      <button className="btn btn-secondary ml-4" onClick={openAddModal}>
        Thêm
      </button>
    </div>
  );
};

const Index = () => {
  const dispatch = useDispatch();
  const [customers, setCustomers] = useState([]);
  const [renderCustomers, setRenderCustomers] = useState([]);

  const {
    getCustomersRes,
    getCustomersErr,
    getCustomersIsLoading,
    reloadCustomers,
  } = GetAllCustomer();

  useEffect(() => {
    if (getCustomersRes) {
      setCustomers(getCustomersRes);
      setRenderCustomers(getCustomersRes);
    } else if (getCustomersErr) {
      dispatch(
        showNotification({
          message: "Lấy danh sách khách hàng thất bại!",
          status: 0,
        })
      );
    }
  }, [getCustomersRes, getCustomersErr, dispatch]);

  const searchCustomerHandler = (value) => {
    const filteredItems = searchValue(
      customers,
      "phoneNumber",
      value.toLowerCase().trim()
    );
    setRenderCustomers(filteredItems);
  };

  return (
    <TitleCard
      title="Danh sách khách hàng"
      TopSideButtons={
        <Actions
          onReload={reloadCustomers}
          changeSearchValue={searchCustomerHandler}
        />
      }
      isLong
    >
      {getCustomersIsLoading && <LoadingSpinner />}
      {!(getCustomersIsLoading) && <CustomerList items={renderCustomers} />}
    </TitleCard>
  );
};

export default Index;
