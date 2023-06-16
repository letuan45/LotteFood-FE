import useAxiosFunction from "../hooks/useAxiosFunction";
import axiosInstance from "../utils/AxiosSingleton";
import useAxios from "../hooks/useAxios";

const getFoodTypesURL = "/foods/category";
const addNewFoodURL = "/foods";
const getFoodsURL = "/foods";
const getFoodDetailsURL = "/foods/detailFood/";
const editFoodURL = "/foods/";
const changeFoodStatusURL = "/foods/status/";

export const GetFoodTypes = () => {
  const {
    response: getFoodTypesRes,
    error: getFoodTypesErr,
    isLoading: getFoodTypesIsLoading,
  } = useAxios({
    axiosInstance: axiosInstance,
    method: "GET",
    url: getFoodTypesURL,
  });

  return {
    getFoodTypesRes,
    getFoodTypesErr,
    getFoodTypesIsLoading,
  };
};

export const GetFoods = () => {
  const {
    response: getFoodsRes,
    error: getFoodsErr,
    isLoading: getFoodsIsLoading,
    refetch: reloadFoods
  } = useAxios({
    axiosInstance: axiosInstance,
    method: "GET",
    url: getFoodsURL,
  });

  return {
    getFoodsRes,
    getFoodsErr,
    getFoodsIsLoading,
    reloadFoods,
  };
};

export const GetFoodDetails = (foodId) => {
  const {
    response: getFoodDetailsRes,
    error: getFoodDetailsErr,
    isLoading: getFoodDetailsIsLoading,
  } = useAxios({
    axiosInstance: axiosInstance,
    method: "GET",
    url: getFoodDetailsURL + foodId,
  });

  return {
    getFoodDetailsRes,
    getFoodDetailsErr,
    getFoodDetailsIsLoading,
  };
};

export const NewFood = () => {
  const {
    response: newFoodResponse,
    error: newFoodError,
    isLoading: newFoodIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const newFoodAction = (data) => {
    axiosFetch({
      axiosInstance: axiosInstance,
      method: "POST",
      url: addNewFoodURL,
      requestConfig: {
        data: data,
      },
    });
  };

  return {
    newFoodResponse,
    newFoodError,
    newFoodIsLoading,
    newFoodAction,
  };
};

export const EditFood = () => {
  const {
    response: editFoodResponse,
    error: editFoodError,
    isLoading: editFoodIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const editFoodAction = (data, foodId) => {
    axiosFetch({
      axiosInstance: axiosInstance,
      method: "PUT",
      url: editFoodURL + foodId,
      requestConfig: {
        data: data,
      },
    });
  };

  return {
    editFoodResponse,
    editFoodError,
    editFoodIsLoading,
    editFoodAction,
  };
};

export const UpdateFoodStatus = () => {
  const {
    response: updateFoodStatusRes,
    error: updateFoodStatusErr,
    isLoading: updateFoodStatusIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const editFoodStatusAction = (foodId, status) => {
    axiosFetch({
      axiosInstance: axiosInstance,
      method: "PUT",
      url: changeFoodStatusURL + foodId,
      requestConfig: {
        params: {
          status: status,
        },
      },
    });
  };

  return {
    updateFoodStatusRes,
    updateFoodStatusErr,
    updateFoodStatusIsLoading,
    editFoodStatusAction,
  };
};
