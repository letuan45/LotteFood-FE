import { useDispatch } from "react-redux";

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
  const items = DUMMY_ORDER_DETAILS;

  return (
    <div className="overflow-y-auto w-full mt-2 h-96">
      <div className="flex justify-center shadow-sm">
        <h4 className="text-lg font-semibold">
          Nhập ngày: <span>08/06/2023</span>
        </h4>
        <h4 className="text-lg font-semibold ml-4">
          Tổng giá: <span className="text-green">300,000VND</span>
        </h4>
      </div>
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
          {items.map((item) => {
            const totalPrice =
              (item.price * item.quantity).toLocaleString() + "VND";
            const price = item.price.toLocaleString() + "VND";
            return (
              <tr key={item.id}>
                <td className="font-bold text-green">{item.id}</td>
                <td>{item.name}</td>
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
