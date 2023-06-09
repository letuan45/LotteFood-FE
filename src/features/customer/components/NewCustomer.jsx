import { useDispatch } from "react-redux";
import { useState } from "react";
import { showNotification } from "../../common/headerSlice";
import { closeModal } from "../../common/modalSlice";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const INITIAL_CUSTOMER_OBJ = {
  name: "",
  gender: 1,
  dateOfBirth: null,
  address: "",
  phone: "",
};

const NewCustomer = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [customer, setCustomer] = useState(INITIAL_CUSTOMER_OBJ);
  const [gender, setGender] = useState(INITIAL_CUSTOMER_OBJ.gender);
  const [startDate, setStartDate] = useState(new Date());

  const saveNewCustomer = () => {
    if (customer.name.trim() === "")
      return setErrorMessage("Hãy điền tên khách hàng!");
    else if (customer.dateOfBirth === null)
      return setErrorMessage("Hãy chọn ngày sinh khách hàng!");
    else if (customer.address.trim() === "")
      return setErrorMessage("Hãy điền địa chỉ khách hàng!");
    else if (customer.phone.trim() === "")
      return setErrorMessage("Hãy điền SĐT khách hàng!");
    else {
      dispatch(showNotification({ message: "New Lead Added!", status: 1 }));
      closeModal();
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setCustomer({ ...customer, [updateType]: value });
  };

  const changeToMaleHandler = () => {
    setGender(1);
  };

  const changeToFemaleHandler = () => {
    setGender(0);
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
            className="radio radio-primary"
            onChange={changeToMaleHandler}
            checked={gender === 1 ? true : false}
          />
          <span className="mx-2">Nữ: </span>
          <input
            type="radio"
            name="radio-2"
            className="radio radio-primary"
            onChange={changeToFemaleHandler}
            checked={gender === 0 ? true : false}
          />
        </div>
      </div>

      <p className="text-sm mt-2">Ngày sinh: </p>
      <DatePicker
        selected={startDate}
        className="mt-1 border p-2 rounded-lg"
        onChange={(date) => setStartDate(date)}
      />

      <p className="text-sm mt-2">Địa chỉ: </p>
      <textarea
        className="textarea textarea-bordered mt-1 w-full"
        placeholder="Nhập địa chỉ"
      ></textarea>

      <InputText
        type="text"
        defaultValue={customer.name}
        updateType="name"
        labelTitle="Số điện thoại"
        updateFormValue={updateFormValue}
      />

      <ErrorText styleClass="mt-2">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button
          className="btn btn-primary px-6"
          onClick={() => saveNewCustomer()}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default NewCustomer;
