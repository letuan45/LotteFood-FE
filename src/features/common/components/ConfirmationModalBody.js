import { useDispatch } from "react-redux";
import { CONFIRMATION_MODAL_CLOSE_TYPES } from "../../../utils/globalConstantUtil";
import { showNotification } from "../headerSlice";
import {
  CancelIngreOrder,
  SubmitIngreOrder,
} from "../../../services/IngreOrderService";
import { useEffect } from "react";
import { DeleteCustomer } from "../../../services/CustomerService";

function ConfirmationModalBody({ extraObject, closeModal }) {
  const dispatch = useDispatch();
  const {
    submitIngreOrderRes,
    submitIngreOrderErr,
    submitIngreOrderIsLoading,
    submitIngreOrderAction,
  } = SubmitIngreOrder();
  const {
    cancelIngreOrderRes,
    cancelIngreOrderErr,
    cancelIngreOrderIsLoading,
    cancelIngreOrderAction,
  } = CancelIngreOrder();
  const {
    deleteCustomerRes,
    deleteCustomerErr,
    deleteCustomerIsLoading,
    deleteCustomerAction,
  } = DeleteCustomer();

  useEffect(() => {
    if(deleteCustomerRes) {
      dispatch(
        showNotification({
          message: "Xóa khách hàng thành công",
          status: 1,
        })
      );
      closeModal();
    } else if(deleteCustomerErr) {
      dispatch(
        showNotification({
          message: deleteCustomerErr.data.message,
          status: 0,
        })
      );
      closeModal();
    }
  }, [deleteCustomerRes, deleteCustomerErr, dispatch, closeModal]);

  useEffect(() => {
    if (cancelIngreOrderRes) {
      dispatch(
        showNotification({
          message: "Hủy phiếu nhập thành công",
          status: 1,
        })
      );
      closeModal();
    } else if (cancelIngreOrderErr) {
      dispatch(
        showNotification({
          message: "Hủy phiếu nhập thất bại",
          status: 0,
        })
      );
    }
  }, [cancelIngreOrderRes, cancelIngreOrderErr, dispatch, closeModal]);

  useEffect(() => {
    if (submitIngreOrderRes) {
      dispatch(
        showNotification({
          message: "Xác nhập phiếu nhập thành công",
          status: 1,
        })
      );
      closeModal();
    } else if (submitIngreOrderErr) {
      dispatch(
        showNotification({
          message: "Xác nhập phiếu nhập thất bại",
          status: 0,
        })
      );
    }
  }, [submitIngreOrderRes, submitIngreOrderErr, dispatch, closeModal]);

  const { message, type, _id, index } = extraObject;

  const proceedWithYes = async () => {
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.CONFIRM_IG_ORDER) {
      submitIngreOrderAction(index);
    }
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.CANCEL_IG_ORDER) {
      cancelIngreOrderAction(index);
    }
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.DELETE_CUSTOMER) {
      deleteCustomerAction(index);
    }
  };

  const isLoading =
    submitIngreOrderIsLoading ||
    cancelIngreOrderIsLoading ||
    deleteCustomerIsLoading;
  const buttonClasses = `btn btn-primary w-36${isLoading ? " loading" : ""}`;

  return (
    <>
      <p className=" text-xl mt-8 text-center">{message}</p>

      <div className="modal-action mt-12">
        <button className="btn btn-outline   " onClick={() => closeModal()}>
          Cancel
        </button>

        <button className={buttonClasses} onClick={() => proceedWithYes()}>
          Yes
        </button>
      </div>
    </>
  );
}

export default ConfirmationModalBody;
