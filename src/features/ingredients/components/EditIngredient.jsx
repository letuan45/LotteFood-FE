import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../components/Input/InputText";
import { showNotification } from "../../common/headerSlice";
import ErrorText from "../../../components/Typography/ErrorText";
import NumberInput from "../../../components/Input/NumberInput";

let INITIAL_VALUE = {
  name: "",
  unit: "",
  price: "",
};

const EditIngredient = ({ closeModal }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.modal.extraObject);
  if (formData) {
    INITIAL_VALUE = { ...formData, price: formData.price + "" };
  }

  const [errorMessage, setErrorMessage] = useState("");
  const [formObj, setFormObj] = useState(INITIAL_VALUE);

  const submitForm = () => {
    console.log(formObj);

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
      <div className="mt-4">
        <NumberInput width="w-12" height="h-10" defaultValue={20} isNoIncrease/>
      </div>
      <ErrorText styleClass="my-2">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-primary px-6" onClick={submitForm}>
          Xác nhận
        </button>
      </div>
    </>
  );
};

export default EditIngredient;
