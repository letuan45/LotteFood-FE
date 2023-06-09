import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import { showNotification } from "../../common/headerSlice";
import ErrorText from "../../../components/Typography/ErrorText";
import TitleCard from "../../../components/Cards/TitleCard";

const DUMMY_INRE = [
  {
    id: 1,
    name: "Muối",
    quantity: 100,
    unit: "Bao",
    price: 20000,
  },
  {
    id: 2,
    name: "Đùi gà",
    quantity: 50,
    unit: "Cái",
    price: 25000,
  },
  {
    id: 3,
    name: "Bột chiên giòn",
    quantity: 50,
    unit: "Bao",
    price: 15000,
  },
  {
    id: 4,
    name: "Cánh gà",
    quantity: 50,
    unit: "Cái",
    price: 25000,
  },
];

const DUMMY_TYPE = [
  {
    id: 1,
    name: "Đùi gà",
  },
  {
    id: 2,
    name: "Gà Rán",
  },
  {
    id: 3,
    name: "Cánh gà",
  },
  {
    id: 4,
    name: "Phao câu",
  },
  {
    id: 5,
    name: "Combo",
  },
];

const INITIAL_FOOD_OBJ = {
  name: "",
  price: "",
  isAvtive: true
};

const EditFoodModal = ({ closeModal }) => {
  const selectRef = useRef(null);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [foodObj, setFoodObj] = useState(INITIAL_FOOD_OBJ);
  const [foodType, setFoodType] = useState(DUMMY_TYPE);
  const [ingredients, setIngredient] = useState(DUMMY_INRE);
  const [isAvtive, setIsAvtive] = useState(INITIAL_FOOD_OBJ.isAvtive);

  useEffect(() => {
    setIngredient((oldIngredients) => {
      return oldIngredients.map((item) => {
        return { ...item, isChecked: false };
      });
    });
  }, []);

  console.log(ingredients);

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
      dispatch(
        showNotification({ message: "Thêm món ăn thành công!", status: 1 })
      );
      closeModal();
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

  const changeStatusHandler = () => {
    setIsAvtive((oldState) => !oldState);
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="col-span-1">
        <TitleCard title="Sửa món ăn">
          <InputText
            type="text"
            defaultValue={foodObj.name}
            updateType="name"
            labelTitle="Tên món ăn"
            updateFormValue={updateFormValue}
          />

          <InputText
            type="text"
            defaultValue={foodObj.price}
            updateType="price"
            labelTitle="Giá món ăn"
            updateFormValue={updateFormValue}
          />
          <div className="flex items-center">
            <select
              className="select select-bordered w-full max-w-xs mt-4 float-left mb-6"
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
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Đang sẵn sàng</span>
                <input
                  type="checkbox"
                  checked={isAvtive}
                  className="checkbox checkbox-secondary ml-2"
                  onChange={changeStatusHandler}
                />
              </label>
            </div>
          </div>
        </TitleCard>
      </div>

      <div className="col-span-1">
        <TitleCard title="Sửa công thức">
          <ul className="h-64 overflow-y-auto">
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
        <button className="btn btn-primary px-6" onClick={() => saveNewLead()}>
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default EditFoodModal;
