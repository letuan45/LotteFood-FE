import useAxiosFunction from "../hooks/useAxiosFunction";
import axiosInstance from "../utils/AxiosSingleton";
import useAxios from "../hooks/useAxios";

const newCustomerURL = "/customers";
const getCustomersURL = "/customers";
const editCustomerURL = "/customers/";
const getCustomerInfoURL = "/customers/";
const deleteCustomerURL = "/customers/";

export const NewCustomerService = () => {
  const {
    response: newCustomerResponse,
    error: newCustomerError,
    isLoading: newCustomerIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const newCustomerAction = (data) => {
    axiosFetch({
      axiosInstance: axiosInstance,
      method: "POST",
      url: newCustomerURL,
      requestConfig: {
        data: data,
      },
    });
  };

  return {
    newCustomerResponse,
    newCustomerError,
    newCustomerIsLoading,
    newCustomerAction,
  };
};

export const GetAllCustomer = () => {
  const {
    response: getCustomersRes,
    isLoading: getCustomersIsLoading,
    error: getCustomersErr,
    refetch: reloadCustomers,
  } = useAxios({
    axiosInstance: axiosInstance,
    method: "GET",
    url: getCustomersURL,
  });

  return {
    getCustomersRes,
    getCustomersErr,
    getCustomersIsLoading,
    reloadCustomers,
  };
};

export const EditCustomerService = () => {
  const {
    response: editCustomerResponse,
    error: editCustomerError,
    isLoading: editCustomerIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const editCustomerAction = (data, customerId) => {
    axiosFetch({
      axiosInstance: axiosInstance,
      method: "PUT",
      url: editCustomerURL + customerId,
      requestConfig: {
        data: data,
      },
    });
  };

  return {
    editCustomerResponse,
    editCustomerError,
    editCustomerIsLoading,
    editCustomerAction,
  };
};

export const GetCustomerById = (id) => {
  const {
    response: getCustomerRes,
    isLoading: getCustomerIsLoading,
    error: getCustomerErr,
  } = useAxios({
    axiosInstance: axiosInstance,
    method: "GET",
    url: getCustomerInfoURL + id,
  });

  return {
    getCustomerRes,
    getCustomerErr,
    getCustomerIsLoading,
  };
};

export const DeleteCustomer = () => {
  const {
    response: deleteCustomerRes,
    error: deleteCustomerErr,
    isLoading: deleteCustomerIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const deleteCustomerAction = (customerId) => {
    axiosFetch({
      axiosInstance: axiosInstance,
      method: "DELETE",
      url: deleteCustomerURL + customerId,
    });
  };

  return {
    deleteCustomerRes,
    deleteCustomerErr,
    deleteCustomerIsLoading,
    deleteCustomerAction,
  };
};
