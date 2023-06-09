import { useDispatch } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { openModal } from "../../common/modalSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../../utils/globalConstantUtil";

const DUMMY_ORDERS = [
  {
    id: 1,
    date: "03/06/2023",
    employee: "John",
    status: 1,
    customer: "Le Tuan",
  },
  {
    id: 2,
    date: "03/06/2023",
    employee: "John",
    status: 1,
    customer: "Le Tuan",
  },
  {
    id: 3,
    date: "03/06/2023",
    employee: "John",
    status: 1,
    customer: "Le Tuan",
  },
  {
    id: 4,
    date: "03/06/2023",
    employee: "John",
    status: 1,
    customer: "Le Tuan",
  },
  {
    id: 5,
    date: "03/06/2023",
    employee: "John",
    status: 1,
    customer: "Le Tuan",
  },
];

const Status = ({ value }) => {
  if (value === 1) {
    return (
      <div className="badge badge-info gap-1">
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
            d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
          />
        </svg>
        Chưa xác nhận
      </div>
    );
  } else if (value === 2) {
    return (
      <div className="badge badge-success gap-1">
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
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
        Đã xác nhận
      </div>
    );
  }
  return (
    <div className="badge badge-error gap-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block w-4 h-4 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
      Đã hủy
    </div>
  );
};

const Orders = () => {
  const dispatch = useDispatch();
  const items = DUMMY_ORDERS;

  const handleSubmitOrder = () => {
    dispatch(
      openModal({
        title: "Thanh toán đơn hàng",
        bodyType: MODAL_BODY_TYPES.CONFIRM_ORDER,
      })
    );
  };

  const handleCancel = () => {
    dispatch(
      openModal({
        title: "Xác nhận hủy đơn hàng",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Bạn muốn hủy đơn hàng này?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.CANCEL_ORDER,
          index: 1,
        },
      })
    );
  };

  const handleOpenEditOrder = () => {
    dispatch(
      openModal({
        title: "Chỉnh sửa đơn hàng",
        bodyType: MODAL_BODY_TYPES.EDIT_ORDER,
        size: "md"
      })
    );
  };

  return (
    <TitleCard title="Danh sách đơn hàng" topMargin="mt-2">
      {/* Leads List in table format loaded from slice after api call */}
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Id</th>
              <th>Ngày đặt</th>
              <th>Nhân viên</th>
              <th>Khách hàng</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              return (
                <tr key={item.id}>
                  <td className="font-bold text-green">{item.id}</td>
                  <td>{item.date}</td>
                  <td>{item.employee}</td>
                  <td>{item.customer}</td>
                  <td>
                    <Status value={item.status} />
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary rounded-full"
                      onClick={handleSubmitOrder}
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
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </button>
                    <button
                      className="btn btn-active btn-accent rounded-full ml-3"
                      onClick={handleOpenEditOrder}
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
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="btn rounded-full ml-3"
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
                          d="M6 18L18 6M6 6l12 12"
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

export default Orders;
