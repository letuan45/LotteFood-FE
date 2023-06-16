import useAxiosFunction from "../hooks/useAxiosFunction";
import axiosInstance from "../utils/AxiosSingleton";
import useAxios from "../hooks/useAxios";

const getSuppliers = "/materials/getAllSuppliers";
const createIngreOrderURL = "/receipt/import";
const getOrdersURL = "/receipt";
const getOrderDetailsURL = "/receipt/seeDetailReceipt";
const submitOrderURL = "/receipt/complete";
const cancelOrderURL = "/receipt/updateReceiptStatus/";


export const GetSuppliers = () => {
  const {
    response: getSuppliersRes,
    error: getSuppliersErr,
    isLoading: getSuppliersIsLoading,
  } = useAxios({
    axiosInstance: axiosInstance,
    method: "GET",
    url: getSuppliers,
  });

  return {
    getSuppliersRes,
    getSuppliersErr,
    getSuppliersIsLoading,
  };
};

export const GetIngreOrders = () => {
  const {
    response: getIngreOrdersRes,
    error: getIngreOrdersErr,
    isLoading: getIngreOrdersIsLoading,
    refetch: reloadIngreOrders
  } = useAxios({
    axiosInstance: axiosInstance,
    method: "GET",
    url: getOrdersURL,
  });

  return {
    getIngreOrdersRes,
    getIngreOrdersErr,
    getIngreOrdersIsLoading,
    reloadIngreOrders,
  };
};

export const GetIngreOrderDetails = (idItem) => {
  const {
    response: getIngreOrderDetailsRes,
    error: getIngreOrderDetailsErr,
    isLoading: getIngreOrderDetailsIsLoading,
  } = useAxios({
    axiosInstance: axiosInstance,
    method: "GET",
    url: getOrderDetailsURL,
    requestConfig: {
      params: {
        id: idItem,
      },
    },
  });

  return {
    getIngreOrderDetailsRes,
    getIngreOrderDetailsErr,
    getIngreOrderDetailsIsLoading,
  };
};

export const CreateIngreOrder = () => {
  const {
    response: createIngreOrderRes,
    error: createIngreOrderErr,
    isLoading: createIngreOrderIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const createIngreOrderAction = (data) => {
    axiosFetch({
      axiosInstance: axiosInstance,
      method: "POST",
      url: createIngreOrderURL,
      requestConfig: {
        data: data,
      },
    });
  };

  return {
    createIngreOrderRes,
    createIngreOrderErr,
    createIngreOrderIsLoading,
    createIngreOrderAction,
  };
};

export const SubmitIngreOrder = () => {
  const {
    response: submitIngreOrderRes,
    error: submitIngreOrderErr,
    isLoading: submitIngreOrderIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const submitIngreOrderAction = (orderId) => {
    axiosFetch({
      axiosInstance: axiosInstance,
      method: "POST",
      url: submitOrderURL,
      requestConfig: {
        params: {
          receptId: orderId,
        },
      },
    });
  };

  return {
    submitIngreOrderRes,
    submitIngreOrderErr,
    submitIngreOrderIsLoading,
    submitIngreOrderAction,
  };
};

export const CancelIngreOrder = () => {
  const {
    response: cancelIngreOrderRes,
    error: cancelIngreOrderErr,
    isLoading: cancelIngreOrderIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const cancelIngreOrderAction = (orderId) => {
    axiosFetch({
      axiosInstance: axiosInstance,
      method: "POST",
      url: cancelOrderURL + orderId + "?status=2",
    });
  };

  return {
    cancelIngreOrderRes,
    cancelIngreOrderErr,
    cancelIngreOrderIsLoading,
    cancelIngreOrderAction,
  };
};
