import useAxiosFunction from "../hooks/useAxiosFunction";
import axiosInstance from "../utils/AxiosSingleton";
import useAxios from "../hooks/useAxios";

const NewIngredientURL = "/materials";

export const NewIngredientService = () => {
  const {
    response: newIngredientResponse,
    error: newIngredientError,
    isLoading: newIngredientIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const newIngredientAction = (data) => {
    axiosFetch({
      axiosInstance: axiosInstance,
      method: "POST",
      url: NewIngredientURL,
      requestConfig: {
        data: data,
      },
    });
  };

  return {
    newIngredientResponse,
    newIngredientError,
    newIngredientIsLoading,
    newIngredientAction,
  };
};

export const EditIngredientService = () => {
  const {
    response: editIngredientResponse,
    error: editIngredientError,
    isLoading: editIngredientIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const editIngredientAction = (data, id) => {
    axiosFetch({
      axiosInstance: axiosInstance,
      method: "PUT",
      url: NewIngredientURL + `/${id}`,
      requestConfig: {
        data: data,
      },
    });
  };

  return {
    editIngredientResponse,
    editIngredientError,
    editIngredientIsLoading,
    editIngredientAction,
  };
};

export const GetAllIngredients = () => {
  const {
    response: getIngredientsRes,
    error: getIngredientsErr,
    isLoading: getIngredientsIsLoading,
    refetch: reloadIngredients,
  } = useAxios({
    axiosInstance: axiosInstance,
    method: "GET",
    url: NewIngredientURL,
  });

  return {
    getIngredientsRes,
    getIngredientsErr,
    getIngredientsIsLoading,
    reloadIngredients,
  };
};
