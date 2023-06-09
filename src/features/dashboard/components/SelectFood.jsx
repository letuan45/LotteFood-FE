import TitleCard from "../../../components/Cards/TitleCard";
import SearchBar from "../../../components/Input/SearchBar";
import FoodList from "./FoodList";

const DUMMY_FOODS = [
  {
    id: 1,
    name: "Gà Số Mala (1 miếng)",
    price: 40000,
    image: "https://mcdonalds.vn/uploads/2018/food/ga-ran/1-ga-ran.png",
  },
  {
    id: 2,
    name: "Gà Số Mala (1 miếng)",
    price: 40000,
    image: "https://mcdonalds.vn/uploads/2018/food/ga-ran/1-ga-ran.png",
  },
  {
    id: 3,
    name: "Gà Số Mala (1 miếng)",
    price: 40000,
    image: "https://mcdonalds.vn/uploads/2018/food/ga-ran/1-ga-ran.png",
  },
  {
    id: 4,
    name: "Gà Số Mala (1 miếng)",
    price: 40000,
    image: "https://mcdonalds.vn/uploads/2018/food/ga-ran/1-ga-ran.png",
  },
  {
    id: 5,
    name: "Gà Số Mala (1 miếng)",
    price: 40000,
    image: "https://mcdonalds.vn/uploads/2018/food/ga-ran/1-ga-ran.png",
  },
  {
    id: 6,
    name: "Gà Số Mala (1 miếng)",
    price: 40000,
    image: "https://mcdonalds.vn/uploads/2018/food/ga-ran/1-ga-ran.png",
  },
  {
    id: 7,
    name: "Gà Số Mala (1 miếng)",
    price: 40000,
    image: "https://mcdonalds.vn/uploads/2018/food/ga-ran/1-ga-ran.png",
  },
  {
    id: 8,
    name: "Gà Số Mala (1 miếng)",
    price: 40000,
    image: "https://mcdonalds.vn/uploads/2018/food/ga-ran/1-ga-ran.png",
  },
  {
    id: 9,
    name: "Gà Số Mala (1 miếng)",
    price: 40000,
    image: "https://mcdonalds.vn/uploads/2018/food/ga-ran/1-ga-ran.png",
  },
  {
    id: 10,
    name: "Gà Số Mala (1 miếng)",
    price: 40000,
    image: "https://mcdonalds.vn/uploads/2018/food/ga-ran/1-ga-ran.png",
  },
];

function SelectFood() {
  return (
    <TitleCard
      title={"Chọn món trong thực đơn"}
      TopSideButtons={<SearchBar />}
    >
      <FoodList items={DUMMY_FOODS}/>
    </TitleCard>
  );
}

export default SelectFood;
