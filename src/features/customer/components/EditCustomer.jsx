import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { showNotification } from "../../common/headerSlice";
import { closeModal } from "../../common/modalSlice";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import DatePicker from "react-datepicker";
import {
  EditCustomerService,
  GetCustomerById,
} from "../../../services/CustomerService";

import "react-datepicker/dist/react-datepicker.css";

const EditCustomer = ({ closeModal }) => {
  const dispatch = useDispatch();
  const addressRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const [gender, setGender] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const customerObj = useSelector((state) => state.modal.extraObject);
  const {
    editCustomerResponse,
    editCustomerError,
    editCustomerIsLoading,
    editCustomerAction,
  } = EditCustomerService();
  const { getCustomerRes, getCustomerErr, getCustomerIsLoading } =
    GetCustomerById(customerObj.customerId);

  useEffect(() => {
    if (getCustomerRes) {
      nameRef.current.value = getCustomerRes.name;
      setGender(getCustomerRes.gender);

      //process date
      const customerDOB = getCustomerRes.dob.split("/");
      const dd = customerDOB[0];
      const mm = customerDOB[1];
      const yyyy = customerDOB[2];
      setStartDate(new Date(yyyy, mm - 1, dd));

      addressRef.current.value = getCustomerRes.address;
      phoneRef.current.value = getCustomerRes.phoneNumber;
    } else if (getCustomerErr) {
      dispatch(
        showNotification({
          message: "Lấy thông tin khách hàng thất bại!",
          status: 0,
        })
      );
    }
  }, [getCustomerRes, getCustomerErr, dispatch]);

  useEffect(() => {
    if (editCustomerResponse) {
      dispatch(
        showNotification({
          message: "Sửa thông tin khách hàng thành công!",
          status: 1,
        })
      );
      closeModal();
    } else if (editCustomerError) {
      dispatch(
        showNotification({
          message: "Sửa thông tin khách hàng thất bại!",
          status: 0,
        })
      );
    }
  }, [editCustomerResponse, editCustomerError, dispatch, closeModal]);

  const saveNewCustomer = () => {
    if (nameRef.current.value.trim() === "")
      return setErrorMessage("Hãy điền tên khách hàng!");
    else if (startDate.toLocaleDateString("en-GB") === "")
      return setErrorMessage("Hãy chọn ngày sinh khách hàng!");
    else if (addressRef.current.value.trim() === "")
      return setErrorMessage("Hãy điền địa chỉ khách hàng!");
    else if (
      phoneRef.current.value.trim() === "" ||
      isNaN(+phoneRef.current.value.trim())
    )
      return setErrorMessage("SĐT không hợp lệ!");
    else {
      const data = {
        name: nameRef.current.value.trim(),
        gender: gender,
        dob: startDate.toLocaleDateString("en-GB"),
        address: addressRef.current.value.trim(),
        phoneNumber: phoneRef.current.value.trim(),
        totalPoint: 0,
      };
      editCustomerAction(data, customerObj.customerId);
    }
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
      <div className="my-2">
        <p className="mb-1">Tên khách hàng</p>
        <input
          ref={nameRef}
          type="text"
          placeholder="Nhập tên khách hàng"
          className="input input-bordered w-full"
        />
      </div>

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

      <div className="my-2">
        <p className="mb-1">Số điện thoại</p>
        <input
          ref={phoneRef}
          type="text"
          placeholder="Nhập SĐT"
          className="input input-bordered w-full"
        />
      </div>

      <ErrorText styleClass="mt-2">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button
          className={`btn btn-primary px-6 ${
            editCustomerIsLoading ? "loading" : ""
          }`}
          onClick={() => saveNewCustomer()}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default EditCustomer;
