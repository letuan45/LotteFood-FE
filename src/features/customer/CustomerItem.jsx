import { useDispatch } from "react-redux";
import { openModal } from "../common/modalSlice";
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";

const CustomerItem = ({ item }) => {
  const dispatch = useDispatch();
  const openEditCustomerHandler = () => {
    dispatch(
      openModal({
        title: "Sửa thông tin khách hàng",
        bodyType: MODAL_BODY_TYPES.EDIT_CUSTOMER,
      })
    );
  };

  const openRemoveCustomerHandler = () => {
     dispatch(
       openModal({
         title: "Xác nhận xóa khách hàng",
         bodyType: MODAL_BODY_TYPES.CONFIRMATION,
         extraObject: {
           message: `Bạn muốn xóa khách hàng này?`,
           type: CONFIRMATION_MODAL_CLOSE_TYPES.CANCEL_ORDER,
           index: 1,
         },
       })
     );
  }

  return (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>{item.gender === 1 ? "Nam" : "Nữ"}</td>
      <td>{item.dateOfBirth}</td>
      <td>{item.address}</td>
      <td>{item.phone}</td>
      <td className="text-blue font-bold">{item.score}</td>
      <td>
        <button
          className="btn btn-primary rounded-full"
          onClick={openEditCustomerHandler}
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
          className="btn btn-neutral rounded-full ml-4"
          onClick={openRemoveCustomerHandler}
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
};

export default CustomerItem;
