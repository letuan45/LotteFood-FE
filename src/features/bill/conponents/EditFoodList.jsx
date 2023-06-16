const EditFoodList = ({ items, onChooseFood }) => {
  if (items.length === 0) {
    <p className="text-md">Không có món ăn nào...</p>;
  }

  const chooseFoodHandler = (foodId) => {
    onChooseFood(foodId);
  };

  return (
    <ul>
      {items.map((item) => {
        const price = item.price.toLocaleString() + "VND";

        return (
          <li
            className="shadow-xl my-2 px-4 py-3 border-2 rounded-3xl group border-grey flex cursor-pointer hover:bg-green duration-200"
            onClick={chooseFoodHandler.bind(this, item.id)}
            key={item.id}
          >
            <div className="flex items-center mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <div className="avatar">
              <div className="w-16 mask mask-squircle bg-red">
                <img src={item.image} alt={item.name} />
              </div>
            </div>
            <div className="ml-4 flex flex-col justify-between">
              <p className="text-lg group-hover:text-white">{item.name}</p>
              <p className="text-lg font-semibold text-orange">{price}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default EditFoodList;
