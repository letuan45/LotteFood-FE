import { useDispatch } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import SearchBar from "../../components/Input/SearchBar";
import FoodManagerList from "./FoodMaganerList";
import { openModal } from "../common/modalSlice";
import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import { GetFoods } from "../../services/FoodService";
import { useState } from "react";
import { useEffect } from "react";
import LoadingSpinner from "../../components/Indicator/LoadingSpinner";
import { searchValue } from "../../utils/searchHandler";

const Actions = ({ changeSearchValue, onReload }) => {
  const dispatch = useDispatch();

  const onChangeSearchValue = (value) => {
    changeSearchValue(value);
  };

  const openAddModal = () => {
    dispatch(
      openModal({
        title: "Thêm món ăn",
        bodyType: MODAL_BODY_TYPES.ADD_FOOD,
        size: "lg",
      })
    );
  };

  return (
    <div className="flex items-center">
      <SearchBar setSearchText={onChangeSearchValue} />
      <button className="ml-3" onClick={onReload}>
        <div className="btn btn-neutral">
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
      <button className="btn btn-secondary ml-4" onClick={openAddModal}>
        Thêm
      </button>
    </div>
  );
};

const Index = () => {
  const [items, setItems] = useState([]);
  const [renderItems, setRenderItems] = useState([])
  const { getFoodsRes, getFoodsErr, getFoodsIsLoading, reloadFoods } =
    GetFoods();

  useEffect(() => {
    if (getFoodsRes) {
      setItems(getFoodsRes);
      setRenderItems(getFoodsRes);
    } else if (getFoodsErr) {
      alert(getFoodsErr);
    }
  }, [getFoodsRes, getFoodsErr]);

  const onChangeSearchValue = (value) => {
    const filteredItems = searchValue(
      items,
      "name",
      value.toLowerCase().trim()
    );
    setRenderItems(filteredItems);
  };

  return (
    <TitleCard
      title="Danh sách món ăn"
      isLong
      TopSideButtons={
        <Actions
          changeSearchValue={onChangeSearchValue}
          onReload={reloadFoods}
        />
      }
    >
      {getFoodsIsLoading && <LoadingSpinner />}
      {!getFoodsIsLoading && <FoodManagerList items={renderItems} />}
    </TitleCard>
  );
};

export default Index;
