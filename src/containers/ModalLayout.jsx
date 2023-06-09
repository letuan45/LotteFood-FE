import { useEffect } from "react";
import { MODAL_BODY_TYPES } from "../utils/globalConstantUtil";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../features/common/modalSlice";
import AddFoodModal from "../features/food/components/AddFoodModal";
import ConfirmationModalBody from "../features/common/components/ConfirmationModalBody";
import EditFoodModal from "../features/food/components/EditFoodModal";
import NewIngredient from "../features/ingredients/components/NewIngredient";
import EditIngredient from "../features/ingredients/components/EditIngredient";
import AddIngreOrder from "../features/ingre-orders/components/AddIngreOrder";
import IngreOrderDetail from "../features/ingre-orders/components/IngreOrderDetail";
import ConfirmOrder from "../features/bill/conponents/ConfirmOrder";
import BillDetail from "../features/bill/conponents/BillDetail";
import NewCustomer from "../features/customer/components/NewCustomer";
import EditCustomer from "../features/customer/components/EditCustomer";
import EditOrder from "../features/bill/conponents/EditOrder";

function ModalLayout() {
  const { isOpen, bodyType, size, extraObject, title } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();

  const close = (e) => {
    dispatch(closeModal(e));
  };

  return (
    <>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <div className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div
          className={`modal-box ${size === "md" ? "max-w-3xl" : ""}  ${
            size === "lg" ? "max-w-6xl" : ""
          } ${size === "xl" ? "max-w-7xl" : ""}`}
        >
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => close()}
          >
            ✕
          </button>
          <h3 className="font-semibold text-2xl text-center">{title}</h3>

          {/* Loading modal body according to different modal type */}
          {
            {
              [MODAL_BODY_TYPES.EDIT_ORDER]: <EditOrder closeModal={close} />,
              [MODAL_BODY_TYPES.EDIT_CUSTOMER]: (
                <EditCustomer closeModal={close} />
              ),
              [MODAL_BODY_TYPES.ADD_CUSTOMER]: (
                <NewCustomer closeModal={close} />
              ),
              [MODAL_BODY_TYPES.BILL_DETAILS]: (
                <BillDetail closeModal={close} />
              ),
              [MODAL_BODY_TYPES.CONFIRM_ORDER]: <ConfirmOrder />,
              [MODAL_BODY_TYPES.INGRE_ORDER_DETAIL]: (
                <IngreOrderDetail closeModal={close} />
              ),
              [MODAL_BODY_TYPES.ADD_INGRE_ORDER]: (
                <AddIngreOrder closeModal={close} />
              ),
              [MODAL_BODY_TYPES.EDIT_INGRE]: (
                <EditIngredient closeModal={close} />
              ),
              [MODAL_BODY_TYPES.ADD_INGRE]: (
                <NewIngredient closeModal={close} />
              ),
              [MODAL_BODY_TYPES.EDIT_FOOD]: (
                <EditFoodModal closeModal={close} />
              ),
              [MODAL_BODY_TYPES.ADD_FOOD]: <AddFoodModal closeModal={close} />,
              [MODAL_BODY_TYPES.CONFIRMATION]: (
                <ConfirmationModalBody
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),
              [MODAL_BODY_TYPES.DEFAULT]: <div></div>,
            }[bodyType]
          }
        </div>
      </div>
    </>
  );
}

export default ModalLayout;
