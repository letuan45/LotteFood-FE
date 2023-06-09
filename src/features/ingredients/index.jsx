import { useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import IngList from "./IngList";
import SearchBar from "../../components/Input/SearchBar";
import { useDispatch } from "react-redux";
import { openModal } from "../common/modalSlice";
import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import { searchValue } from "../../utils/searchHandler";
import { useEffect } from "react";

const DUMMY_INRE = [
  {
    id: 1,
    name: "Muối",
    quantity: 100,
    unit: "Bao",
    price: 20000,
  },
  {
    id: 2,
    name: "Đùi gà",
    quantity: 50,
    unit: "Cái",
    price: 25000,
  },
  {
    id: 3,
    name: "Bột chiên giòn",
    quantity: 50,
    unit: "Bao",
    price: 15000,
  },
  {
    id: 4,
    name: "Cánh gà",
    quantity: 50,
    unit: "Cái",
    price: 25000,
  },
];

const Actions = ({ changeSearchValue }) => {
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
      <button className="ml-3" onClick={handleOpenAddIngredient}>
        <div className="btn btn-accent">Thêm</div>
      </button>
    </div>
  );
};

function Ingredient() {
  const [originalItems, setOriginalItems] = useState(DUMMY_INRE);
  const [renderItems, setRenderItems] = useState([]);
  
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
        TopSideButtons={<Actions changeSearchValue={onChangeSearchValue} />}
        isLong
      >
        <IngList items={renderItems} />
      </TitleCard>
    </>
  );
}

export default Ingredient;
