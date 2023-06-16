import FoodItem from "./FoodItem";

const FoodList = ({items}) => {
  let content;
  if (!items || !items.length === 0) {
    content = <div>Không có món nào</div>;
  } else {
    content = (
      <ul
        className="grid gap-4 grid-cols-3 overflow-y-scroll"
        style={{ maxHeight: "472px" }}
      >
        {items.map((item) => (
          <FoodItem item={item} key={item.id} />
        ))}
      </ul>
    );
  }

  return <>{content}</>;
};

export default FoodList;
