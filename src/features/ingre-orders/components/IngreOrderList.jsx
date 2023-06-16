import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../common/modalSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../../utils/globalConstantUtil";

const Status = ({ value }) => {
  if (value === 0) {
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
        Chưa hoàn tất
      </div>
    );
  } else if (value === 1) {
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
        Hoàn tất
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

const IngreOrderList = ({ items }) => {
  const dispatch = useDispatch();

  const handleConfirmation = (orderId) => {
    dispatch(
      openModal({
        title: "Xác nhận hoàn thành",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Bạn muốn xác nhận hoàn thành phiếu nhập này?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.CONFIRM_IG_ORDER,
          index: orderId,
        },
      })
    );
  };

  const handleCancel = (orderId) => {
    dispatch(
      openModal({
        title: "Xác nhận hủy phiếu nhập",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Bạn muốn hủy phiếu nhập này?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.CANCEL_IG_ORDER,
          index: orderId,
        },
      })
    );
  };

  const openDetailHandler = (itemId) => {
    dispatch(
      openModal({
        title: "Chi tiết phiếu nhập nguyên liệu",
        bodyType: MODAL_BODY_TYPES.INGRE_ORDER_DETAIL,
        size: "lg",
        extraObject: {orderDetailId: itemId},
      })
    );
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        <thead>
          <tr>
            <th>#ID</th>
            <th>ngày tạo</th>
            <th>nhân viên</th>
            <th>tổng giá</th>
            <th>trạng thái</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const totalPrice = item.totalPrice.toLocaleString() + "VND";
            const date = item.date.split("T")[0];
            const isHiddenButtons = !(item.status === 0);

            return (
              <tr key={item.id}>
                <td className="font-bold text-green">{item.id}</td>
                <td>{date}</td>
                <td>{item.employee}</td>
                <td className="text-orange font-semibold">{totalPrice}</td>
                <td>
                  <Status value={item.status} />
                </td>
                <td>
                  <button
                    className="btn btn-secondary rounded-full"
                    onClick={openDetailHandler.bind(this, item.id)}
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
                  <button
                    onClick={handleCancel.bind(this, item.id)}
                    className="btn rounded-full ml-3"
                    disabled={isHiddenButtons}
                    // onClick={handleOpenEditIngredient}
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
                  <button
                    onClick={handleConfirmation.bind(this, item.id)}
                    className="btn btn-info rounded-full ml-3"
                    disabled={isHiddenButtons}
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default IngreOrderList;
