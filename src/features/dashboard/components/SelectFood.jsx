import TitleCard from "../../../components/Cards/TitleCard";
import SearchBar from "../../../components/Input/SearchBar";
import FoodList from "./FoodList";

function SelectFood({ items, changeSearchValue }) {
  const onChangeSearchValue = (value) => {
    changeSearchValue(value);
  };

  return (
    <TitleCard
      title={"Chọn món trong thực đơn"}
      TopSideButtons={<SearchBar setSearchText={onChangeSearchValue} />}
    >
      {items.length === 0 && (
        <p className="text-center text-md">Không có món ăn nào.</p>
      )}
      {items.length >= 0 && <FoodList items={items} />}
    </TitleCard>
  );
}

export default SelectFood;
