import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";

const INITIAL_VALUE = {
  name: "",
  unit: "",
  price: "",
};

const NewIngredient = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [formObj, setFormObj] = useState(INITIAL_VALUE);

  const submitForm = () => {
    if (formObj.name.trim() === "")
      return setErrorMessage("Tên nguyên liệu không được trống!");
    else if (formObj.unit.trim() === "")
      return setErrorMessage("Đơn vị tính không được trống!");
    else if (isNaN(formObj.price.trim()) || +formObj.price.trim() <= 0)
      return setErrorMessage("Giá không hợp lệ");
    else {
      dispatch(
        showNotification({ message: "Thêm nguyên liệu thành công", status: 1 })
      );
      closeModal();
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setFormObj((oldState) => {
      return { ...oldState, [updateType]: value };
    });
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={INITIAL_VALUE.name}
        updateType="name"
        labelTitle="Tên nguyên liệu"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        defaultValue={INITIAL_VALUE.unit}
        updateType="unit"
        labelTitle="Đơn vị tính"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        defaultValue={INITIAL_VALUE.price}
        updateType="price"
        labelTitle="Đơn giá"
        updateFormValue={updateFormValue}
      />
      <ErrorText styleClass="my-2">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-primary px-6" onClick={submitForm}>
          Xác nhận
        </button>
      </div>
    </>
  );
};

export default NewIngredient;
