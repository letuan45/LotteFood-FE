import TitleCard from "../../components/Cards/TitleCard";
import { useDispatch } from "react-redux";
import { openModal } from "../common/modalSlice";
import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import SearchBar from "../../components/Input/SearchBar";
import { useState } from "react";
import CustomerList from "./CustomerList";

const DUMMY_CUSTOMERS = [
  {
    id: 1,
    name: "Lê Tuấn",
    gender: 1,
    dateOfBirth: "09/06/2023",
    address: "97 Man Thiện",
    phone: "0981756860",
    score: 2000,
  },
  {
    id: 2,
    name: "Lê Tuấn",
    gender: 1,
    dateOfBirth: "09/06/2023",
    address: "97 Man Thiện",
    phone: "0981756860",
    score: 2000,
  },
  {
    id: 3,
    name: "Lê Tuấn",
    gender: 1,
    dateOfBirth: "09/06/2023",
    address: "97 Man Thiện",
    phone: "0981756860",
    score: 2000,
  },
  {
    id: 4,
    name: "Lê Tuấn",
    gender: 1,
    dateOfBirth: "09/06/2023",
    address: "97 Man Thiện",
    phone: "0981756860",
    score: 2000,
  },
  {
    id: 5,
    name: "Lê Tuấn",
    gender: 1,
    dateOfBirth: "09/06/2023",
    address: "97 Man Thiện",
    phone: "0981756860",
    score: 2000,
  },
];

const Actions = () => {
  const dispatch = useDispatch();

  const openAddModal = () => {
    dispatch(
      openModal({
        title: "Thêm khách hàng",
        bodyType: MODAL_BODY_TYPES.ADD_CUSTOMER,
      })
    );
  };

  return (
    <div className="flex justify-end items-center">
      <SearchBar />
      <button className="btn btn-secondary ml-4" onClick={openAddModal}>
        Thêm
      </button>
    </div>
  );
};

const Index = () => {
  const [customers, setCustomers] = useState(DUMMY_CUSTOMERS);
  const [renderCustomers, setRenderCustomers] = useState([]);

  return (
    <TitleCard title="Danh sách khách hàng" TopSideButtons={<Actions />} isLong>
      <CustomerList items={customers} />
    </TitleCard>
  );
};

export default Index;
