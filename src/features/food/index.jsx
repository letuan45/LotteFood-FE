import { useDispatch } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import SearchBar from "../../components/Input/SearchBar";
import FoodManagerList from "./FoodMaganerList";
import { openModal } from "../common/modalSlice";
import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";

const DUMMY_FOOD = [
  {
    id: 1,
    name: "1 Miếng gà rán",
    price: 30000,
    status: 1,
    ingredients: "Gà, bột chiên, muối",
    image: "https://mcdonalds.vn/uploads/2018/food/ga-ran/1-ga-ran.png",
  },
  {
    id: 2,
    name: "1 Miếng gà rán",
    price: 30000,
    status: 1,
    ingredients: "Gà, bột chiên, muối",
    image: "https://mcdonalds.vn/uploads/2018/food/ga-ran/1-ga-ran.png",
  },
  {
    id: 3,
    name: "1 Miếng gà rán",
    price: 30000,
    status: 1,
    ingredients: "Gà, bột chiên, muối",
    image: "https://mcdonalds.vn/uploads/2018/food/ga-ran/1-ga-ran.png",
  },
  {
    id: 4,
    name: "1 Miếng gà rán",
    price: 30000,
    status: 1,
    ingredients: "Gà, bột chiên, muối",
    image: "https://mcdonalds.vn/uploads/2018/food/ga-ran/1-ga-ran.png",
  },
  {
    id: 5,
    name: "1 Miếng gà rán",
    price: 30000,
    status: 1,
    ingredients: "Gà, bột chiên, muối",
    image: "https://mcdonalds.vn/uploads/2018/food/ga-ran/1-ga-ran.png",
  },
  {
    id: 6,
    name: "1 Miếng gà rán",
    price: 30000,
    status: 1,
    ingredients: "Gà, bột chiên, muối",
    image: "https://mcdonalds.vn/uploads/2018/food/ga-ran/1-ga-ran.png",
  },
  {
    id: 7,
    name: "1 Miếng gà rán",
    price: 30000,
    status: 1,
    ingredients: "Gà, bột chiên, muối",
    image: "https://mcdonalds.vn/uploads/2018/food/ga-ran/1-ga-ran.png",
  },
];

const Actions = () => {
  const dispatch = useDispatch();

  const openAddModal = () => {
    dispatch(
      openModal({
        title: "Thêm món ăn",
        bodyType: MODAL_BODY_TYPES.ADD_FOOD,
        size: "lg"
      })
    );
  };

  return (
    <div className="flex items-center">
      <SearchBar />
      <button className="btn btn-secondary ml-4" onClick={openAddModal}>
        Thêm
      </button>
    </div>
  );
};

const index = () => {
  const items = DUMMY_FOOD;
  return (
    <TitleCard title="Danh sách món ăn" isLong TopSideButtons={<Actions />}>
      <FoodManagerList items={items} />
    </TitleCard>
  );
};

export default index;
