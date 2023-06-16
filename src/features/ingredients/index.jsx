import { useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import IngList from "./IngList";
import SearchBar from "../../components/Input/SearchBar";
import { useDispatch } from "react-redux";
import { openModal } from "../common/modalSlice";
import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import { searchValue } from "../../utils/searchHandler";
import { useEffect } from "react";
import { GetAllIngredients } from "../../services/IngredientsSevice";
import LoadingSpinner from "../../components/Indicator/LoadingSpinner";

const Actions = ({ changeSearchValue, onReload}) => {
  const dispatch = useDispatch();

  const onChangeSearchValue = (value) => {
    changeSearchValue(value);
  };

  const handleOpenAddIngredient = () => {
    dispatch(
      openModal({
        title: "Thêm nguyên liệu",
        bodyType: MODAL_BODY_TYPES.ADD_INGRE,
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
      <button className="ml-3" onClick={handleOpenAddIngredient}>
        <div className="btn btn-accent">Thêm</div>
      </button>
    </div>
  );
};

function Ingredient() {
  const [originalItems, setOriginalItems] = useState([]);
  const [renderItems, setRenderItems] = useState([]);
  const {
    getIngredientsRes,
    getIngredientsErr,
    getIngredientsIsLoading,
    reloadIngredients,
  } = GetAllIngredients();

  useEffect(() => {
    if (getIngredientsRes) {
      setOriginalItems([...getIngredientsRes].reverse());
    } else if (getIngredientsErr) {
      alert(getIngredientsErr);
    }
  }, [getIngredientsRes, getIngredientsErr]);


  useEffect(() => {
    if (originalItems && originalItems.length > 0) {
      setRenderItems(originalItems);
    }
  }, [originalItems]);

  const onChangeSearchValue = (value) => {
    const filteredItems = searchValue(
      originalItems,
      "name",
      value.toLowerCase().trim()
    );
    setRenderItems(filteredItems);
  };

  return (
    <>
      <TitleCard
        title="Danh sách nguyên liệu"
        TopSideButtons={
          <Actions
            changeSearchValue={onChangeSearchValue}
            onReload={() => {
              reloadIngredients();
            }}
          />
        }
        isLong
      >
        {getIngredientsIsLoading && <LoadingSpinner />}
        {!getIngredientsIsLoading && (
          <IngList items={renderItems} />
        )}
      </TitleCard>
    </>
  );
}

export default Ingredient;
