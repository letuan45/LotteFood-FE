import NumberInput from "../../../components/Input/NumberInput";


const CartItem = ({ item }) => {
  const price = (item.price * item.amount).toLocaleString() + "VND";
  return (
    <li className="shadow-md w-full px-5 py-4 rounded-md mb-4 hover:bg-red duration-200 group flex">
      <div className="w-1/2 cursor-default">
        <p className="font-semibold truncate group-hover:text-white duration-200">
          {item.name}
        </p>
        <p className="font-bold">{price}</p>
      </div>
      <div className="flex items-center">
        
        <NumberInput width="w-10" height="h-8" />
        <button className="btn btn-circle btn-outline ml-4">
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
