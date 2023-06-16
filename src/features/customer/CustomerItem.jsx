import { useDispatch } from "react-redux";
import { openModal } from "../common/modalSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";

const CustomerItem = ({ item }) => {
  const dispatch = useDispatch();

  const openEditCustomerHandler = (customerId) => {
    dispatch(
      openModal({
        title: "Sửa thông tin khách hàng",
        bodyType: MODAL_BODY_TYPES.EDIT_CUSTOMER,
        extraObject: { customerId: customerId },
      })
    );
  };

  let gender;
  if (item.gender === 0) {
    gender = "Nam";
  } else if (item.gender === 1) {
    gender = "Nữ";
  } else {
    gender = "Khác";
  }

  const openDeleteCustomerHandler = (itemId) => {
    dispatch(
      openModal({
        title: "Xác nhận xóa khách hàng",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Bạn muốn xóa khách hàng này?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.DELETE_CUSTOMER,
          index: itemId,
        },
      })
    );
  };

  return (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>{gender}</td>
      <td>{item.dob}</td>
      <td>{item.address}</td>
      <td>{item.phoneNumber}</td>
      <td className="text-blue font-bold">{item.score}</td>
      <td>
        <button
          className="btn btn-primary rounded-full"
          onClick={openEditCustomerHandler.bind(this, item.id)}
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
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </button>
        <button
          className="btn rounded-full ml-3"
          onClick={openDeleteCustomerHandler.bind(this, item.id)}
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
              d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default CustomerItem;
