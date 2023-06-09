import { useState } from "react";
import FoodItem from "./FoodItem";

const FoodList = ({items}) => {
  const [renderFoods, setRenderFoods] = useState(items);
  let content;
  if (!items || !items.length === 0) {
    content = <div>Không có món nào</div>;
  } else {
    content = (
      <ul
        className="grid gap-4 grid-cols-3 overflow-y-scroll"
        style={{ height: "472px" }}
      >
        {renderFoods.map((item) => (
          <FoodItem item={item} key={item.id} />
        ))}
      </ul>
    );
  }

  return <>{content}</>;
};

export default FoodList;
