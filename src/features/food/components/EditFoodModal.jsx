import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import ErrorText from "../../../components/Typography/ErrorText";
import TitleCard from "../../../components/Cards/TitleCard";
import { useSelector } from "react-redux";
import { EditFood, GetFoodDetails } from "../../../services/FoodService";
import { GetFoodTypes } from "../../../services/FoodService";
import { GetAllIngredients } from "../../../services/IngredientsSevice";

const EditFoodModal = ({ closeModal }) => {
  const selectRef = useRef(null);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [foodType, setFoodType] = useState([]);
  const [ingredients, setIngredient] = useState([]);
  const foodId = useSelector((state) => state.modal.extraObject).foodId;
  const { getFoodDetailsRes, getFoodDetailsErr } = GetFoodDetails(foodId);
  const { getFoodTypesRes, getFoodTypesErr } = GetFoodTypes();
  const { getIngredientsRes, getIngredientsErr } = GetAllIngredients();
  const [choosenIngredients, setChoosenIngredients] = useState([]);
  const [choosenIngreIsChanged, setChoosenIngreIsChanged] = useState(false);
  const nameRef = useRef(null);
  const imgRef = useRef(null);
  const priceRef = useRef(null);
  const descriptionRef = useRef(null);
  const { editFoodResponse, editFoodError, editFoodIsLoading, editFoodAction } =
    EditFood();

  useEffect(() => {
    if (editFoodResponse) {
      dispatch(
        showNotification({ message: "Sửa món ăn thành công!", status: 1 })
      );
      closeModal();
    } else if (editFoodError) {
      dispatch(
        showNotification({ message: "Sửa món ăn thất bại!", status: 0 })
      );
    }
  }, [editFoodResponse, editFoodError, dispatch, closeModal]);

  useEffect(() => {
    if (getFoodTypesRes) {
      setFoodType(getFoodTypesRes);
    } else if (getFoodTypesErr) {
      alert("Không load được danh mục món ăn");
    }
  }, [getFoodTypesRes, getFoodTypesErr]);

  useEffect(() => {
    if (getIngredientsRes) {
      setIngredient(getIngredientsRes);
    } else if (getIngredientsErr) {
      alert("Không load được các nguyên liệu");
    }
  }, [getIngredientsRes, getIngredientsErr]);

  useEffect(() => {
    if (getFoodDetailsRes) {
      nameRef.current.value = getFoodDetailsRes.name;
      imgRef.current.value = getFoodDetailsRes.image;
      priceRef.current.value = getFoodDetailsRes.price;
      descriptionRef.current.value = getFoodDetailsRes.description;
      selectRef.current.value = getFoodDetailsRes.category.id;

      const ingres = getFoodDetailsRes.materialDTOS;
      setChoosenIngredients(ingres);
    } else if (getFoodDetailsErr) {
      alert(getFoodDetailsErr);
    }
  }, [getFoodDetailsRes, getFoodDetailsErr]);

  useEffect(() => {
    setIngredient((oldIngredients) => {
      return oldIngredients.map((item) => {
        return { ...item, isChecked: false };
      });
    });
  }, []);

  const saveNewFood = (foodId) => {
    if (nameRef.current.value.trim() === "")
      return setErrorMessage("Bạn phải cung cấp tên món ăn!");
    else if (
      priceRef.current.value.trim() === "" ||
      +priceRef.current.value.trim() === 0
    )
      return setErrorMessage("Giá không hợp lệ!");
    else if (selectRef.current.value.trim() === "default")
      return setErrorMessage("Hãy chọn loại món!");
    else if (ingredients.every((item) => !item.isChecked))
      return setErrorMessage("Hãy chọn nguyên liệu!");
    else if (descriptionRef.current.value.trim() === "")
      return setErrorMessage("Hãy nhập mô tả");
    else {
      const choosenIngredient = ingredients
        .filter((item) => item.isChecked === true)
        .map((item) => {
          return { id: item.id };
        });

      const data = {
        name: nameRef.current.value.trim(),
        description: descriptionRef.current.value.trim(),
        image: imgRef.current.value.trim(),
        price: +priceRef.current.value.trim(),
        category: { id: selectRef.current.value },
        materialDTOS: choosenIngredient,
      };

      editFoodAction(data, foodId);
    }
  };

  const handleCheckboxChange = (id) => {
    setChoosenIngreIsChanged(true);
    const updatedCheckboxes = ingredients.map((ingredient) => {
      if (ingredient.id === id) {
        let choosenIngredient = ingredient;
        choosenIngredient.isChecked = !ingredient.isChecked;
        return choosenIngredient;
      }
      return ingredient;
    });
    setIngredient(updatedCheckboxes);
  };

  if (
    choosenIngredients.length > 0 &&
    ingredients.length > 0 &&
    !choosenIngreIsChanged
  ) {
    let renderIngredients = [...ingredients];
    for (const item of choosenIngredients) {
      const findItemIndex = renderIngredients.findIndex(
        (ingre) => ingre.id === item.id
      );
      if (findItemIndex >= 0) renderIngredients[findItemIndex].isChecked = true;
      else renderIngredients[findItemIndex].isChecked = false;
    }
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="col-span-1">
        <TitleCard title="Sửa món ăn">
          <div className="flex flex-col">
            <label className="block mb-1 text-sm">Tên món ăn</label>
            <input
              ref={nameRef}
              type="text"
              placeholder="Tên món ăn"
              className="input input-bordered w-full block"
            />
          </div>

          <div className="flex flex-col">
            <label className="block mb-1 text-sm mt-1">Hình món ăn</label>
            <input
              ref={imgRef}
              type="text"
              placeholder="Hình ảnh"
              className="input input-bordered w-full block"
            />
          </div>

          <div className="flex flex-col">
            <label className="block mb-1 text-sm mt-1">Giá món ăn</label>
            <input
              ref={priceRef}
              type="text"
              placeholder="Giá"
              className="input input-bordered w-full block"
            />
          </div>

          <div className="flex items-center">
            <select
              className="select select-bordered w-full max-w-xs mt-4 float-left mb-1"
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
          </div>
          <div className="flex flex-col">
            <label className="block mb-1 text-sm mt-1">Mô tả món ăn</label>
            <input
              ref={descriptionRef}
              type="text"
              placeholder="Mô tả món ăn"
              className="input input-bordered w-full block"
            />
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
        <button
          className={`btn btn-primary px-6 ${
            editFoodIsLoading ? "loading" : ""
          }`}
          onClick={saveNewFood.bind(this, foodId)}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default EditFoodModal;
