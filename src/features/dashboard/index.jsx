import { useState } from "react";
import { GetFoods } from "../../services/FoodService";
import Cart from "./components/Cart";
import SelectFood from "./components/SelectFood";
import { useEffect } from "react";
import LoadingSpinner from "../../components/Indicator/LoadingSpinner";
import { searchValue } from "../../utils/searchHandler";

function Dashboard() {
  const [originalFoodItems, setOriginalFoodItems] = useState([]);
  const [renderFoodItems, setRenderedFoodItems] = useState([]);
  const { getFoodsRes, getFoodsErr, getFoodsIsLoading } = GetFoods();

  useEffect(() => {
    if (getFoodsRes) {
      setOriginalFoodItems(getFoodsRes);
      setRenderedFoodItems(getFoodsRes);
    } else if (getFoodsErr) {
      alert("Không load được danh sách món ăn!");
    }
  }, [getFoodsRes, getFoodsErr]);

  const changeSearchHandler = (value) => {
    const filteredItems = searchValue(
      originalFoodItems,
      "name",
      value.toLowerCase().trim()
    );
    setRenderedFoodItems(filteredItems);
  };

  return (
    <>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
        <div className="col-span-2">
          {getFoodsIsLoading && <LoadingSpinner />}
          {!getFoodsIsLoading && (
            <SelectFood
              items={renderFoodItems}
              changeSearchValue={changeSearchHandler}
            />
          )}
        </div>
        <div className="col-span-1">
          <Cart />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
