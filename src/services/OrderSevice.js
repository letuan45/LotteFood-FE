import useAxiosFunction from "../hooks/useAxiosFunction";
import axiosInstance from "../utils/AxiosSingleton";
import useAxios from "../hooks/useAxios";

const createOrderURL = "/order/create";
const getAllOrderURL = "/order/getAll";
const getOrderDetailsURL = "/order/";

export const CreateOrder = () => {
  const {
    response: createOrderRes,
    error: createOrderError,
    isLoading: createOrderIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const createOrderAction = (data) => {
    axiosFetch({
      axiosInstance: axiosInstance,
      method: "POST",
      url: createOrderURL,
      requestConfig: {
        data: data,
      },
    });
  };

  return {
    createOrderRes,
    createOrderError,
    createOrderIsLoading,
    createOrderAction,
  };
};

export const GetOrders = () => {
  const {
    response: getOrdersResponse,
    error: getOrderError,
    isLoading: getOrderIsLoading,
  } = useAxios({
    axiosInstance: axiosInstance,
    method: "GET",
    url: getAllOrderURL,
  });

  return {
    getOrdersResponse,
    getOrderError,
    getOrderIsLoading,
  };
};

export const GetOrderDetails = (orderId) => {
  const {
    response: getOrderDetailResponse,
    error: getOrderDetailError,
    isLoading: getOrderDetailIsLoading,
    refetch: reloadOrderDetails,
  } = useAxios({
    axiosInstance: axiosInstance,
    method: "GET",
    url: getOrderDetailsURL + orderId,
  });

  return {
    getOrderDetailResponse,
    getOrderDetailError,
    getOrderDetailIsLoading,
    reloadOrderDetails,
  };
};

export const UpdateOrderDetail = () => {
  const {
    response: updateOrderDetailRes,
    error: updateOrderDetailErr,
    isLoading: updateOrderDetailIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const updateOrderDetailAction = (data, detailId, orderId) => {
    axiosFetch({
      axiosInstance: axiosInstance,
      method: "PUT",
      url: `/order/${orderId}/updateDetail`,
      requestConfig: {
        data: data,
        params: {
          idOrderDetail: detailId,
        },
      },
    });
  };

  return {
    updateOrderDetailRes,
    updateOrderDetailErr,
    updateOrderDetailIsLoading,
    updateOrderDetailAction,
  };
};

export const AddOrderDetail = () => {
  const {
    response: addOrderDetailRes,
    error: addOrderDetailErr,
    isLoading: addOrderDetailIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const addOrderDetailAction = (data, orderId) => {
    axiosFetch({
      axiosInstance: axiosInstance,
      method: "POST",
      url: `/order/${orderId}/createOrderDetail`,
      requestConfig: {
        data: data,
      },
    });
  };

  return {
    addOrderDetailRes,
    addOrderDetailErr,
    addOrderDetailIsLoading,
    addOrderDetailAction,
  };
};

