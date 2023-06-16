import React from "react";
import FoodManagerItem from "./FoodManagerItem";

const FoodManagerList = ({ items }) => {
  let content = <p></p>;
  if(!items || items.length === 0) {
    content = <h1 className="text-center">Không có món ăn nào!</h1>
  } else {
    content = <ul className="grid grid-cols-4 gap-4">
      {items.map(item => <FoodManagerItem item={item} key={item.id}/>)}
    </ul>
  }
  return <>{content}</>;
};

export default FoodManagerList;
