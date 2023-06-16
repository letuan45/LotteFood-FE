import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { showNotification } from "../../common/headerSlice";
import { closeModal } from "../../common/modalSlice";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import DatePicker from "react-datepicker";
import { NewCustomerService } from "../../../services/CustomerService";

import "react-datepicker/dist/react-datepicker.css";

const INITIAL_CUSTOMER_OBJ = {
  name: "",
  gender: 1,
  dateOfBirth: null,
  address: "",
  phone: "",
};

const NewCustomer = ({closeModal}) => {
  const dispatch = useDispatch();
  const addressRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const [customer, setCustomer] = useState(INITIAL_CUSTOMER_OBJ);
  const [gender, setGender] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const {
    newCustomerResponse,
    newCustomerError,
    newCustomerIsLoading,
    newCustomerAction,
  } = NewCustomerService();

  useEffect(() => {
    if (newCustomerResponse) {
      dispatch(
        showNotification({ message: "Thêm khách hàng thành công!", status: 1 })
      );
      closeModal();
    } else if (newCustomerError) {
      dispatch(
        showNotification({ message: "Thêm khách hàng thất bại!", status: 0 })
      );
    }
  }, [newCustomerResponse, newCustomerError, dispatch, closeModal]);

  const saveNewCustomer = () => {
    if (customer.name.trim() === "")
      return setErrorMessage("Hãy điền tên khách hàng!");
    else if (startDate.toLocaleDateString("en-GB") === "")
      return setErrorMessage("Hãy chọn ngày sinh khách hàng!");
    else if (addressRef.current.value.trim() === "")
      return setErrorMessage("Hãy điền địa chỉ khách hàng!");
    else if (customer.phone.trim() === "" || isNaN(+customer.phone.trim()))
      return setErrorMessage("SĐT không hợp lệ!");
    else {
      const data = {
        name: customer.name.trim(),
        gender: gender,
        dob: startDate.toLocaleDateString("en-GB"),
        address: addressRef.current.value.trim(),
        phoneNumber: customer.phone.trim(),
        totalPoint: 0,
      };

      newCustomerAction(data);
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setCustomer({ ...customer, [updateType]: value });
  };

  const changeGenderHandler = (event) => {
    const data = event.target.id;
    if (data === "male") {
      setGender(0);
    } else if (data === "female") {
      setGender(1);
    } else {
      setGender(2);
    }
  };

  return (
    <div style={{ height: "520px" }}>
      <InputText
        type="text"
        defaultValue={customer.name}
        updateType="name"
        labelTitle="Họ và tên"
        updateFormValue={updateFormValue}
      />
      <div className="mt-2">
        <p className="text-sm">Giới tính: </p>
        <div className="mt-2 flex items-center">
          <span className="mr-2">Nam: </span>
          <input
            type="radio"
            name="radio-2"
            id="male"
            className="radio radio-primary"
            onChange={changeGenderHandler}
            checked={gender === 0}
          />
          <span className="mx-2">Nữ: </span>
          <input
            type="radio"
            name="radio-2"
            id="female"
            className="radio radio-primary"
            onChange={changeGenderHandler}
            checked={gender === 1}
          />
          <span className="mx-2">khác: </span>
          <input
            type="radio"
            name="radio-2"
            id="other"
            className="radio radio-primary"
            onChange={changeGenderHandler}
            checked={gender === 2}
          />
        </div>
      </div>

      <p className="text-sm mt-2">Ngày sinh (mm/dd/yyyy): </p>
      <DatePicker
        selected={startDate}
        className="mt-1 border p-2 rounded-lg"
        onChange={(date) => setStartDate(date)}
      />

      <p className="text-sm mt-2">Địa chỉ: </p>
      <textarea
        className="textarea textarea-bordered mt-1 w-full"
        placeholder="Nhập địa chỉ"
        ref={addressRef}
      ></textarea>

      <InputText
        type="text"
        defaultValue={customer.phone}
        updateType="phone"
        labelTitle="Số điện thoại"
        updateFormValue={updateFormValue}
      />

      <ErrorText styleClass="mt-2">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button
          className={`btn btn-primary px-6 ${newCustomerIsLoading ? "loading" : ""}`}
          onClick={() => saveNewCustomer()}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default NewCustomer;
