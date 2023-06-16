import { useDispatch, useSelector } from "react-redux";
import { GetIngreOrderDetails } from "../../../services/IngreOrderService";
import { useState } from "react";
import { useEffect } from "react";

const DUMMY_ORDER_DETAILS = [
  {
    id: 1,
    name: "Muối",
    quantity: 2,
    price: 10000,
  },
  {
    id: 2,
    name: "Muối",
    quantity: 2,
    price: 10000,
  },
  {
    id: 3,
    name: "Muối",
    quantity: 2,
    price: 10000,
  },
  {
    id: 4,
    name: "Muối",
    quantity: 2,
    price: 10000,
  },
  {
    id: 5,
    name: "Muối",
    quantity: 2,
    price: 10000,
  },
];

const IngreOrderDetail = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [renderItems, setRenderItems] = useState([]);
  const orderId = useSelector((state) => state.modal.extraObject).orderDetailId;
  const {
    getIngreOrderDetailsRes,
    getIngreOrderDetailsErr,
    getIngreOrderDetailsIsLoading,
  } = GetIngreOrderDetails(orderId);

  useEffect(() => {
    if(getIngreOrderDetailsRes) {
      setRenderItems(getIngreOrderDetailsRes);
    } else if (getIngreOrderDetailsErr) {
      alert("Đã có lỗi xảy ra")
    }
  }, [getIngreOrderDetailsRes, getIngreOrderDetailsErr]);

  return (
    <div className="overflow-y-auto w-full mt-2 h-96">
      <table className="table w-full mt-2">
        <thead className="sticky top-0">
          <tr>
            <th>#ID</th>
            <th>tên nguyên liệu</th>
            <th>số lượng nhập</th>
            <th>giá</th>
            <th>đơn giá</th>
          </tr>
        </thead>
        <tbody>
          {renderItems.map((item) => {
            const totalPrice =
              (item.price * item.quantity).toLocaleString() + "VND";
            const price = item.price.toLocaleString() + "VND";
            return (
              <tr key={item.id}>
                <td className="font-bold text-green">{item.id}</td>
                <td>{item.material}</td>
                <td>{item.quantity}</td>
                <td className="font-semibold">{price}</td>
                <td className="text-orange font-semibold">{totalPrice}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default IngreOrderDetail;
