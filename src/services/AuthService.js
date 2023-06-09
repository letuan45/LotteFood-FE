import useAxiosFunction from "../hooks/useAxiosFunction";
import axiosInstance from "../utils/AxiosSingleton";

const LoginURL = "/login";

export const LoginService = () => {
  const {
    response: loginResponse,
    error: loginError,
    loading: loginIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const loginAction = (values) => {
    axiosFetch({
      axiosInstance: axiosInstance,
      method: "POST",
      url: LoginURL,
      requestConfig: {
        data: values,
      },
    });
  }

  return { loginResponse, loginError, loginIsLoading, loginAction };
};
