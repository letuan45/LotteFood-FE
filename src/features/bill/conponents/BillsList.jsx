import TitleCard from "../../../components/Cards/TitleCard";
import { useDispatch } from "react-redux";
import { openModal } from "../../common/modalSlice";
import { MODAL_BODY_TYPES } from "../../../utils/globalConstantUtil";

const DUMMY_BILLS = [
  {
    id: 1,
    date: "03/06/2023",
    employee: "John",
    customer: "Le Tuan",
    payment: "Tiền mặt",
    discount: 10000,
    totalPrice: 200000,
  },
  {
    id: 2,
    date: "03/06/2023",
    employee: "John",
    customer: "Le Tuan",
    payment: "Thẻ ngân hàng",
    discount: 10000,
    totalPrice: 200000,
  },
  {
    id: 3,
    date: "03/06/2023",
    employee: "John",
    customer: "Le Tuan",
    payment: "Thẻ ghi nợ",
    discount: 10000,
    totalPrice: 200000,
  },
  {
    id: 4,
    date: "03/06/2023",
    employee: "John",
    customer: "Le Tuan",
    payment: "Tiền mặt",
    discount: 10000,
    totalPrice: 200000,
  },
  {
    id: 5,
    date: "03/06/2023",
    employee: "John",
    customer: "Le Tuan",
    payment: "Tiền mặt",
    discount: 10000,
    totalPrice: 200000,
  },
];

const BillsList = () => {
  const dispatch = useDispatch();

  const openBillDetailsHandler = () => {
    dispatch(
      openModal({
        title: "Chi tiết hóa đơn",
        bodyType: MODAL_BODY_TYPES.BILL_DETAILS,
      })
    );
  };

  const items = DUMMY_BILLS;
  return (
    <TitleCard title="Danh sách hóa đơn" topMargin="mt-2">
      {/* Leads List in table format loaded from slice after api call */}
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ngày GD</th>
              <th>Nhân viên</th>
              <th>Khách hàng</th>
              <th>Phương thức TT</th>
              <th>Giảm giá</th>
              <th>Tổng giá</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const discount = item.discount.toLocaleString() + "VND";
              const totalPrice = item.totalPrice.toLocaleString() + "VND";

              return (
                <tr key={item.id}>
                  <td className="font-bold text-green">{item.id}</td>
                  <td>{item.date}</td>
                  <td>{item.employee}</td>
                  <td>{item.customer}</td>
                  <td>{item.payment}</td>
                  <td>{discount}</td>
                  <td>{totalPrice}</td>
                  <td>
                    <button
                      onClick={openBillDetailsHandler}
                      className="btn btn-secondary rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
};

export default BillsList;
