import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../components/Input/InputText";
import { showNotification } from "../../common/headerSlice";
import ErrorText from "../../../components/Typography/ErrorText";
import NumberInput from "../../../components/Input/NumberInput";
import { EditIngredientService } from "../../../services/IngredientsSevice";

const EditIngredient = ({ closeModal }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.modal.extraObject);
  const [formObj, setFormObj] = useState([]);

  useEffect(() => {
    setFormObj({
      ...formData,
      price: formData.price + "",
      stock: formData.stock + "",
    });
  }, [formData]);

  const {
    editIngredientResponse,
    editIngredientError,
    editIngredientIsLoading,
    editIngredientAction,
  } = EditIngredientService();

  useEffect(() => {
    if (editIngredientResponse) {
      dispatch(
        showNotification({ message: "Sửa nguyên liệu thành công", status: 1 })
      );
      closeModal();
    } else if (editIngredientError) {
      dispatch(
        showNotification({ message: "Sửa nguyên liệu thất bại", status: 0 })
      );
    }
  }, [editIngredientResponse, editIngredientError, dispatch, closeModal]);

  const [errorMessage, setErrorMessage] = useState("");

  const submitForm = () => {
    if (formObj.name.trim() === "")
      return setErrorMessage("Tên nguyên liệu không được trống!");
    else if (formObj.unit.trim() === "")
      return setErrorMessage("Đơn vị tính không được trống!");
    else if (isNaN(formObj.price.trim()) || +formObj.price.trim() <= 0)
      return setErrorMessage("Giá không hợp lệ");
    else {
      editIngredientAction(formObj, formData.id);
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
        defaultValue={formData.name}
        updateType="name"
        labelTitle="Tên nguyên liệu"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        defaultValue={formData.unit}
        updateType="unit"
        labelTitle="Đơn vị tính"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        defaultValue={formData.price}
        updateType="price"
        labelTitle="Đơn giá"
        updateFormValue={updateFormValue}
      />
      {+formData.stock > 0 && (
        <div className="mt-4">
          <NumberInput
            width="w-12"
            height="h-10"
            defaultValue={+formData.stock}
            isNoIncrease
          />
        </div>
      )}

      <ErrorText styleClass="my-2">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-primary px-6" onClick={submitForm}>
          {editIngredientIsLoading ? "Loading..." : "Xác nhận"}
        </button>
      </div>
    </>
  );
};

export default EditIngredient;
