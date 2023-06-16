import { useState } from "react";

const DUMMY_ORDER_DETAILS = {
  items: [
    {
      id: 1,
      name: "Gà rán sốt Mala",
      amount: 2,
      price: 30000,
    },
    {
      id: 2,
      name: "Gà rán sốt Mala",
      amount: 2,
      price: 30000,
    },
    {
      id: 3,
      name: "Gà rán sốt Mala",
      amount: 2,
      price: 30000,
    },
    {
      id: 4,
      name: "Gà rán sốt Mala",
      amount: 2,
      price: 30000,
    },
    {
      id: 5,
      name: "Gà rán sốt Mala",
      amount: 2,
      price: 30000,
    },
  ],
  total: 200000,
  discount: 20000,
  pay: 220000,
};

const BillDetail = ({ closeModal }) => {
  const [items, setItems] = useState(DUMMY_ORDER_DETAILS.items);
  const [total, setTotal] = useState(DUMMY_ORDER_DETAILS.total);
  const [discount, setDiscount] = useState(DUMMY_ORDER_DETAILS.discount);
  const [pay, setPay] = useState(DUMMY_ORDER_DETAILS.pay);

  return (
    <div className=" w-full mt-2">
      <div className="h-72 overflow-y-auto">
        <table className="table w-full">
          <thead className="sticky top-0">
            <tr>
              <th>Món ăn</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>Đơn giá</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const price = item.price.toLocaleString() + "VND";
              const totalPrice =
                (item.price * item.amount).toLocaleString() + "VND";

              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.amount}</td>
                  <td>{price}</td>
                  <td>{totalPrice}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <p className="font-bold text-xl text-center">
          Tổng tiền:
          {" " + total.toLocaleString() + "VND"}
        </p>
        <p className="font-bold text-xl text-center">
          Giảm giá:
          {" " + discount.toLocaleString() + "VND"}
        </p>
        <p className="font-bold text-xl text-center">
          Khách trả:
          {" " + pay.toLocaleString() + "VND"}
        </p>
      </div>
    </div>
  );
};

export default BillDetail;
