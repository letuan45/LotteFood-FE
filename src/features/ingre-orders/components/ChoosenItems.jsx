import { useState } from "react";
import NumberInput from "../../../components/Input/NumberInput";

const ChoosenItems = ({ item, onChangeQuan, onRemove }) => {
  const price = item.price.toLocaleString() + "VND";
  const [renderPrice, setRenderPrice] = useState(price);

  const changeQuantityHandler = (value) => {
    const quantity = value;
    onChangeQuan(value, item.id);

    const newPrice = (item.price * quantity).toLocaleString() + "VND";
    setRenderPrice(newPrice);
  };

  return (
    <tr key={item.id} className="cursor-default">
      <td className="font-semibold text-green">{item.name}</td>
      <td>
        <NumberInput
          width="w-12"
          height="h-10"
          onChange={changeQuantityHandler}
        />
      </td>
      <td className="text-orange font-semibold">{renderPrice}</td>
      <td>
        <button
          className="btn btn-active"
          onClick={() => {
            onRemove(item.id);
          }}
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default ChoosenItems;
