import TitleCard from "../../../components/Cards/TitleCard";
import CartList from "./CartList";

const DUMMY_CART = [
  {
    id: 1,
    name: "Gà sốt mala",
    price: 40000,
    amount: 1,
  },
  {
    id: 2,
    name: "Gà sốt mala",
    price: 40000,
    amount: 1,
  },
  {
    id: 3,
    name: "Gà sốt mala",
    price: 40000,
    amount: 1,
  },
  {
    id: 4,
    name: "Gà sốt mala",
    price: 40000,
    amount: 1,
  },
];

const Cart = () => {
  return (
    <>
      <TitleCard title={"Đã chọn"}>
        <CartList items={DUMMY_CART}/>
      </TitleCard>
    </>
  );
};

export default Cart;
