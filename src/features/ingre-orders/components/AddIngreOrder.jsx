import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import { showNotification } from "../../common/headerSlice";
import ErrorText from "../../../components/Typography/ErrorText";
import TitleCard from "../../../components/Cards/TitleCard";
import SearchBar from "../../../components/Input/SearchBar";
import { searchValue } from "../../../utils/searchHandler";
import IngList from "../../ingredients/IngList";
import NumberInput from "../../../components/Input/NumberInput";
import ChoosenItems from "./ChoosenItems";
import { useCallback } from "react";
import { useRef } from "react";

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

const DUMMY_SUPPLIER = [
  {
    id: 1,
    name: "Chinsu",
  },
  {
    id: 2,
    name: "Chợ Tăng Nhơn",
  },
  {
    id: 3,
    name: "Tào lao 1",
  },
  {
    id: 4,
    name: "Tào lao 2",
  },
  {
    id: 5,
    name: "Tào lao 3",
  },
  {
    id: 6,
    name: "Tào lao 4",
  },
];

const AddIngreOrder = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [originalItems, setOriginalItems] = useState(DUMMY_INRE);
  const [renderItems, setRenderItems] = useState([]);
  const [choosenItems, setChoosenItems] = useState([]);
  const [supplier, setSupplier] = useState(DUMMY_SUPPLIER);
  const selectRef = useRef(null);

  useEffect(() => {
    if (originalItems && originalItems.length > 0) {
      setRenderItems(originalItems);
    }
  }, [originalItems]);

  const onChangeSearchValue = (value) => {
    const filteredItems = searchValue(
      originalItems,
      "name",
      value.toLowerCase().trim()
    );
    setRenderItems(filteredItems);
  };

  const chooseItemHandler = (id) => {
    const numberId = +id;
    const items = [...originalItems];
    let choosenItemsData = [...choosenItems];

    const itemIndex = originalItems.findIndex((item) => item.id === numberId);
    const choosenItemIndex = choosenItemsData.findIndex(
      (item) => item.id === numberId
    );
    if (choosenItemIndex >= 0) return;

    choosenItemsData.push({ ...items[itemIndex], amount: 1 });
    setChoosenItems(choosenItemsData);
  };

  const changeQuanHandler = (value, id) => {
    let choosenItemsData = [...choosenItems];
    const changedChoosenItemIdx = choosenItemsData.findIndex(
      (item) => item.id === id
    );
    choosenItemsData[changedChoosenItemIdx].amount = value;

    setChoosenItems(choosenItemsData);
  };

  const removeItemHandler = (id) => {
    let choosenItemsData = [...choosenItems];
    const changedChoosenItemIdx = choosenItemsData.findIndex(
      (item) => item.id === id
    );
    choosenItemsData.splice(changedChoosenItemIdx, 1);

    setChoosenItems(choosenItemsData);
  };

  const totalPrice =
    choosenItems
      .reduce((total, item) => total + item.amount * item.price, 0)
      .toLocaleString() + "VND";

  const submitHandler = () => {
    const items = [...choosenItems];
    const supplierId = selectRef.current.value;

    if (items.length === 0) {
      dispatch(
        showNotification({ message: "Hãy chọn nguyên liệu nhập", status: 0 })
      );
      return;
    }

    if (supplierId === "default") {
      dispatch(
        showNotification({ message: "Hãy chọn nhà cung cấp", status: 0 })
      );
      return;
    }

    console.log(items, supplierId);
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="col-span-2">
        <select
          className="select select-bordered w-full max-w-xs float-right"
          defaultValue={"default"}
          ref={selectRef}
        >
          <option disabled value="default">
            Chọn nhà cung cấp
          </option>
          {supplier.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="col-span-1">
        <TitleCard
          title="Danh sách nguyên liệu"
          TopSideButtons={<SearchBar setSearchText={onChangeSearchValue} />}
        >
          {/* Ingredients List */}
          <IngList
            items={renderItems}
            isMinimal
            canTouch
            chooseItem={chooseItemHandler}
          />
        </TitleCard>
      </div>
      <div className="col-span-1">
        <TitleCard title="Nguyên liệu đã chọn">
          {/* Choosen List */}
          {choosenItems.length > 0 && (
            <div className="overflow-x-auto w-full h-72 overflow-y-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Nguyên liệu</th>
                    <th>Số lượng</th>
                    <th>Đơn giá</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {choosenItems.map((item) => {
                    return (
                      <ChoosenItems
                        key={item.id}
                        item={item}
                        onChangeQuan={changeQuanHandler}
                        onRemove={removeItemHandler}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </TitleCard>
      </div>
      {/* Total */}
      <div className="col-span-2 text-right flex justify-end items-center">
        <h1 className="text-2xl font-semibold">
          Tổng tiền: <span className="text-orange">{totalPrice}</span>
        </h1>
        <button className="btn btn-secondary ml-4" onClick={submitHandler}>
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default AddIngreOrder;
