import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";
import { LoginService } from "../../services/AuthService";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../common/headerSlice";

const INITIAL_LOGIN_OBJ = {
  password: "",
  username: "",
};

function Login() {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);
  const { loginResponse, loginError, loginIsLoading, loginAction } = LoginService();

  useEffect(() => {
    if (loginResponse) {
      console.log(loginResponse);
      setErrorMessage("");
      window.location.href = "/app/order";
    } else if (loginError) {
      setErrorMessage("Đăng nhập thất bại! Vui lòng kiểm tra lại")
    }
  }, [dispatch, loginResponse, loginError]);

  const submitForm = (e) => {
    e.preventDefault();
    
    if (loginObj.username.trim() === "")
      return setErrorMessage("Tên tài khoản không được để trống!");
    if (loginObj.password.trim() === "")
      return setErrorMessage("Mật khẩu không được để trống!");
    else {
      // Call API to check user credentials and save token in localstorage
      // localStorage.setItem("token", "DumyTokenHere");
      // const data = {
      //   username: loginObj.username.trim(),
      //   password: loginObj.password.trim(),
      // };
      // loginAction(data);
      window.location.href = "/app/order";
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-grey flex items-center">
      <div className="card mx-auto w-full max-w-5xl  shadow-xl">
        <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
          <div className="">
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Đăng nhập
            </h2>
            <form onSubmit={(e) => submitForm(e)}>
              <div className="mb-4">
                <InputText
                  type="username"
                  defaultValue={loginObj.username}
                  updateType="username"
                  containerStyle="mt-4"
                  labelTitle="Tên đăng nhập"
                  updateFormValue={updateFormValue}
                />

                <InputText
                  defaultValue={loginObj.password}
                  type="password"
                  updateType="password"
                  containerStyle="mt-4"
                  labelTitle="Mật khẩu"
                  updateFormValue={updateFormValue}
                />
              </div>

              <div className="text-right text-primary">
                <Link to="/forgot-password">
                  <span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Quên mật khẩu?
                  </span>
                </Link>
              </div>

              <ErrorText styleClass="mt-4">{errorMessage}</ErrorText>
              <button
                type="submit"
                className={
                  "btn mt-2 w-full btn-accent" +
                  (loginIsLoading ? " loading" : "")
                }
              >
                Đăng nhập
              </button>

              <div className="text-center mt-4">
                Bạn chưa có tài khoản?{" "}
                <Link to="/register">
                  <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Đăng ký
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
