import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import { showNotification } from "../../common/headerSlice";
import ErrorText from "../../../components/Typography/ErrorText";
import NumberInput from "../../../components/Input/NumberInput";

const DUMMY_ORDERS_DETAILS = [
  {
    id: 1,
    name: "Đùi gà sốt Mala",
    quantity: 1,
    price: 20000,
  },
  {
    id: 2,
    name: "Đùi gà sốt Mala",
    quantity: 1,
    price: 20000,
  },
  {
    id: 3,
    name: "Đùi gà sốt Mala",
    quantity: 1,
    price: 20000,
  },
  {
    id: 4,
    name: "Đùi gà sốt Mala",
    quantity: 1,
    price: 20000,
  },
  {
    id: 5,
    name: "Đùi gà sốt Mala",
    quantity: 1,
    price: 20000,
  },
  {
    id: 6,
    name: "Đùi gà sốt Mala",
    quantity: 1,
    price: 20000,
  },
];

const EditOrder = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [orderDetails, setOrderDetails] = useState(DUMMY_ORDERS_DETAILS);

  const changeQuantityHandler = (value, id) => {
    let details = [...orderDetails];
    const itemIndex = details.findIndex((item) => item.id === id);
    details[itemIndex].quantity = value;

    setOrderDetails(details);
  };

  const submitHandler = () => {
    console.log(orderDetails);
  };

  return (
    <div className="mt-4">
      <div className="overflow-x-auto w-full h-96">
        <table className="table w-full">
          <thead className="sticky top-0">
            <tr>
              <th>Tên món</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>đơn giá</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.map((item) => {
              const price = item.price.toLocaleString() + "VND";
              const totalPrice =
                (item.price * item.quantity).toLocaleString() + "VND";

              return (
                <tr key={item.id}>
                  <td className="text-green font-semibold">{item.name}</td>
                  <td>
                    <NumberInput
                      width="w-12"
                      onChange={(value) => {
                        changeQuantityHandler(value, item.id);
                      }}
                    />
                  </td>
                  <td>{price}</td>
                  <td>{totalPrice}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="modal-action">
        <button className="btn btn-primary px-6" onClick={submitHandler}>
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default EditOrder;
