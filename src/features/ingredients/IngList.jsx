import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../common/modalSlice";
import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";

const IngList = ({ items, isMinimal, chooseItem }) => {
  const dispatch = useDispatch();

  const handleOpenEditIngredient = () => {
    const fakeObj = { id: 1, name: "Muối", unit: "Bao", price: 10000 };
    dispatch(
      openModal({
        title: "Sửa nguyên liệu",
        bodyType: MODAL_BODY_TYPES.EDIT_INGRE,
        extraObject: fakeObj,
      })
    );
  };

  if (!items || items.length === 0) {
    return (
      <h3 className="text-lg text-center h-96">
        Không có dữ liệu bạn đang tìm...
      </h3>
    );
  }

  return (
    <div className="w-full h-72 overflow-y-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Nguyên liệu</th>
            <th>Số lượng</th>
            {!isMinimal && <th>Đơn vị</th>}
            <th>Đơn giá</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const price = item.price.toLocaleString() + "VND";

            const chooseIgHandler = () => {
              const id = item.id;
              chooseItem(id);
            };

            return (
              <tr key={item.id} className="cursor-default">
                <td className="font-semibold text-green">{item.name}</td>
                <td>{item.quantity}</td>
                {!isMinimal && <td>{item.unit}</td>}
                <td className="text-orange font-semibold">{price}</td>
                {!isMinimal && (
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={handleOpenEditIngredient}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                    </button>
                  </td>
                )}
                {isMinimal && (
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={chooseIgHandler}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                        />
                      </svg>
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default IngList;
