import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import { showNotification } from "../../common/headerSlice";
import ErrorText from "../../../components/Typography/ErrorText";
import TitleCard from "../../../components/Cards/TitleCard";
import { useEffect } from "react";
import { useRef } from "react";
import { GetFoodTypes, NewFood } from "../../../services/FoodService";
import { GetAllIngredients } from "../../../services/IngredientsSevice";

const INITIAL_FOOD_OBJ = {
  name: "",
  price: "",
  image: "",
  description: "",
};

const AddFoodModal = ({ closeModal }) => {
  const selectRef = useRef(null);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [foodObj, setFoodObj] = useState(INITIAL_FOOD_OBJ);
  const [foodType, setFoodType] = useState([]);
  const [ingredients, setIngredient] = useState([]);
  const { getFoodTypesRes, getFoodTypesErr, getFoodTypesIsLoading } =
    GetFoodTypes();
  const { getIngredientsRes, getIngredientsErr } = GetAllIngredients();
  const { newFoodResponse, newFoodError, newFoodIsLoading, newFoodAction } =
    NewFood();

  useEffect(() => {
    if (newFoodResponse) {
      dispatch(
        showNotification({ message: "Thêm món ăn thành công!", status: 1 })
      );
      closeModal();
    } else if (newFoodError) {
      dispatch(
        showNotification({ message: "Thêm món ăn thất bại!", status: 0 })
      );
    }
  }, [newFoodResponse, newFoodError, dispatch, closeModal]);

  useEffect(() => {
    if (getFoodTypesRes) {
      setFoodType(getFoodTypesRes);
    } else if (getFoodTypesErr) {
      alert(getFoodTypesErr);
    }
  }, [getFoodTypesRes, getFoodTypesErr]);

  useEffect(() => {
    if (getIngredientsRes) {
      setIngredient(getIngredientsRes.filter((item) => item.stock > 0));
    } else if (getIngredientsErr) {
      alert(getIngredientsErr);
    }
  }, [getIngredientsRes, getIngredientsErr]);

  useEffect(() => {
    setIngredient((oldIngredients) => {
      return oldIngredients.map((item) => {
        return { ...item, isChecked: false };
      });
    });
  }, []);

  const saveNewLead = () => {
    if (foodObj.name.trim() === "")
      return setErrorMessage("Bạn phải cung cấp tên món ăn!");
    else if (
      foodObj.price.trim() === "" ||
      +foodObj.price.trim() <= 0 ||
      isNaN(+foodObj.price.trim())
    )
      return setErrorMessage("Giá không hợp lệ!");
    else if (selectRef.current.value === "default")
      return setErrorMessage("Hãy chọn loại món!");
    else if (ingredients.every((item) => !item.isChecked))
      return setErrorMessage("Hãy chọn nguyên liệu!");
    else {
      const data = {
        ...foodObj,
        category: { id: selectRef.current.value },
        materialDTOS: ingredients
          .filter((item) => item.isChecked)
          .map((item) => {
            return { id: item.id };
          }),
      };
      newFoodAction(data);
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setFoodObj({ ...foodObj, [updateType]: value });
  };

  const handleCheckboxChange = (id) => {
    const updatedCheckboxes = ingredients.map((ingredient) => {
      if (ingredient.id === id) {
        return { ...ingredient, isChecked: !ingredient.isChecked };
      }
      return ingredient;
    });
    setIngredient(updatedCheckboxes);
  };

  const disabledBtn = ingredients.length === 0;

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="col-span-1">
        <TitleCard title="Tạo món ăn">
          <div className="h-80 overflow-y-auto">
            <InputText
              type="text"
              defaultValue={foodObj.name}
              updateType="name"
              labelTitle="Tên món ăn"
              updateFormValue={updateFormValue}
            />

            <InputText
              type="text"
              defaultValue={foodObj.image}
              updateType="image"
              labelTitle="Hình món ăn (link)"
              updateFormValue={updateFormValue}
            />

            <InputText
              type="text"
              defaultValue={foodObj.price}
              updateType="price"
              labelTitle="Giá món ăn"
              updateFormValue={updateFormValue}
            />
            <select
              className="select select-bordered w-full max-w-xs mt-4 float-left"
              defaultValue={"default"}
              ref={selectRef}
            >
              <option disabled value="default">
                Loại món ăn
              </option>
              {foodType.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>

            <InputText
              type="text"
              defaultValue={foodObj.description}
              updateType="description"
              labelTitle="Mô tả"
              updateFormValue={updateFormValue}
            />
          </div>
        </TitleCard>
      </div>

      <div className="col-span-1">
        <TitleCard title="Thêm nguyên liệu">
          <ul className="h-80 overflow-y-auto">
            {ingredients.length === 0 && (
              <p className="text-center">Không có nguyên liệu nào</p>
            )}
            {ingredients.map((item) => (
              <li
                className="shadow-lg rounded-md my-2 py-2 px-4 bg-blue flex"
                key={item.id}
              >
                <input
                  type="checkbox"
                  id={item.id}
                  checked={!!item.isChecked}
                  className="checkbox checkbox-warning"
                  onChange={() => handleCheckboxChange(item.id)}
                />
                <h3 className="font-semibold ml-3">{item.name}</h3>
              </li>
            ))}
          </ul>
        </TitleCard>
      </div>

      <div className="flex col-span-2 justify-end items-center">
        <ErrorText styleClass="mr-2 text-lg">{errorMessage}</ErrorText>
        <button
          className={`btn btn-primary px-6 ${
            newFoodIsLoading ? "loading" : ""
          }`}
          disabled={disabledBtn}
          onClick={() => saveNewLead()}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default AddFoodModal;
