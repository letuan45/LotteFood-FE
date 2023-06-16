import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../components/Input/InputText";
import { showNotification } from "../../common/headerSlice";
import ErrorText from "../../../components/Typography/ErrorText";
import NumberInput from "../../../components/Input/NumberInput";
import {
  AddOrderDetail,
  GetOrderDetails,
  UpdateOrderDetail,
} from "../../../services/OrderSevice";
import TitleCard from "../../../components/Cards/TitleCard";
import LoadingSpinner from "../../../components/Indicator/LoadingSpinner";
import { GetFoods } from "../../../services/FoodService";
import EditFoodList from "./EditFoodList";

const EditOrder = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [orderDetails, setOrderDetails] = useState([]);
  const [foods, setFoods] = useState([]);
  const orderId = useSelector((state) => state.modal.extraObject.orderId);
  const {
    getOrderDetailResponse,
    getOrderDetailError,
    getOrderDetailIsLoading,
    reloadOrderDetails,
  } = GetOrderDetails(orderId);
  const { getFoodsRes, getFoodsErr, getFoodsIsLoading, reloadFoods } =
    GetFoods();
  const {
    updateOrderDetailRes,
    updateOrderDetailErr,
    updateOrderDetailIsLoading,
    updateOrderDetailAction,
  } = UpdateOrderDetail();
  const {
    addOrderDetailRes,
    addOrderDetailErr,
    addOrderDetailIsLoading,
    addOrderDetailAction,
  } = AddOrderDetail();

  useEffect(() => {
    if(foods.length > 0 && orderDetails.length > 0) {
      let foodData = [...foods];
      for(const idx in foodData) {
        console.log(foodData);
        //if(orderDetails.findIndex(item))
      }
    }
  }, [foods, orderDetails]);

  useEffect(() => {
    if (addOrderDetailRes) {
      dispatch(
        showNotification({
          message: "Thêm thành công",
          status: 1,
        })
      );
      reloadOrderDetails();
    } else if (addOrderDetailErr) {
      dispatch(
        showNotification({
          message: "Thêm thất bại",
          status: 0,
        })
      );
    }
  }, [addOrderDetailRes, addOrderDetailErr, dispatch, reloadOrderDetails]);

  useEffect(() => {
    if (getOrderDetailResponse) {
      setOrderDetails(getOrderDetailResponse);
    } else if (getOrderDetailError) {
      dispatch(
        showNotification({
          message: "Lấy chi tiết đơn hàng thất bại!",
          status: 0,
        })
      );
    }
  }, [getOrderDetailResponse, getOrderDetailError, dispatch]);

  useEffect(() => {
    if (getFoodsRes) {
      setFoods(getFoodsRes);
    } else if (getFoodsErr) {
      dispatch(
        showNotification({
          message: "Lấy danh sách món ăn đơn hàng thất bại!",
          status: 0,
        })
      );
    }
  }, [getFoodsRes, getFoodsErr, dispatch]);

  useEffect(() => {
    if (updateOrderDetailRes) {
      dispatch(
        showNotification({
          message: "Cập nhật thành công!",
          status: 1,
        })
      );
      reloadOrderDetails();
    } else if (updateOrderDetailErr) {
      dispatch(
        showNotification({
          message: "Cập nhật thất bại!",
          status: 0,
        })
      );
    }
  }, [
    updateOrderDetailRes,
    updateOrderDetailErr,
    dispatch,
    reloadOrderDetails,
  ]);

  const changeQuantityHandler = (value, id) => {
    let details = [...orderDetails];
    const itemIndex = details.findIndex((item) => item.id === id);
    details[itemIndex].quantity = value;

    // const data = {
    //   quantity: value,
    //   food: {
    //     id: id,
    //   },
    // };
    console.log(details[itemIndex]);
    //updateOrderDetailAction(data, id, orderId);

    setOrderDetails(details);
  };

  const deleteDetailHandler = () => {};

  const chooseFoodHandler = (foodId) => {
    const data = {
      quantity: 1,
      order: { id: orderId },
      food: { id: foodId },
    };

    addOrderDetailAction(data, orderId);
  };

  return (
    <div className="mt-4 grid grid-cols-2 gap-2">
      {getOrderDetailIsLoading && <LoadingSpinner />}
      <div className="w-full col-span-1">
        <TitleCard title="Chi tiết đơn hàng">
          <div className="h-96 overflow-y-auto">
            <table className="table w-full">
              <thead className="sticky top-0">
                <tr>
                  <th>Tên món</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                  <th>đơn giá</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.map((item) => {
                  const price = item.price.toLocaleString() + "VND";
                  const totalPrice =
                    (item.price * item.quantity).toLocaleString() + "VND";

                  return (
                    <tr key={item.id}>
                      <td className="text-green font-semibold">
                        {item.foodName}
                      </td>
                      <td>
                        <NumberInput
                          width="w-12"
                          defaultValue={item.quantity}
                          onChange={(value) => {
                            changeQuantityHandler(value, item.id);
                          }}
                        />
                      </td>
                      <td>{price}</td>
                      <td>{totalPrice}</td>
                      <td>
                        <button
                          className="btn btn-secondary rounded-full"
                          onClick={deleteDetailHandler.bind(this, item.id)}
                          disabled={orderDetails.length === 1}
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
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
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
      </div>
      <TitleCard title="Chọn món ăn">
        <div className="w-full h-96 col-span-1 overflow-y-auto">
          <EditFoodList items={foods} onChooseFood={chooseFoodHandler} />
        </div>
      </TitleCard>
    </div>
  );
};

export default EditOrder;
