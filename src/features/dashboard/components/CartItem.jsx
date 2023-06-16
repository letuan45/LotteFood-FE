import { useDispatch } from "react-redux";
import NumberInput from "../../../components/Input/NumberInput";
import { removeEntireItem, setNewQuantity } from "../../common/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const price = (item.price * item.quantity).toLocaleString() + "VND";

  const changeQuantityHandler = (itemId, value) => {
    const data = { id: itemId, quantity: value };
    dispatch(setNewQuantity(data));
  };

  const removeItemHandler = (itemId) => {
    dispatch(removeEntireItem({ id: itemId }));
  };

  return (
    <li className="shadow-md w-full px-5 py-4 rounded-md mb-4 hover:bg-red duration-200 group flex">
      <div className="w-1/2 cursor-default">
        <p className="font-semibold truncate group-hover:text-white duration-200">
          {item.name}
        </p>
        <p className="font-bold">{price}</p>
      </div>
      <div className="flex items-center">
        <NumberInput
          width="w-12"
          defaultValue={item.quantity}
          height="h-8"
          onChange={(value) => {
            changeQuantityHandler(item.id, value);
          }}
        />
        <button
          className="btn btn-circle btn-outline ml-4"
          onClick={removeItemHandler.bind(this, item.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </li>
  );
};

export default CartItem;
