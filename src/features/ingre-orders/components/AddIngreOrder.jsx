import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import TitleCard from "../../../components/Cards/TitleCard";
import SearchBar from "../../../components/Input/SearchBar";
import { searchValue } from "../../../utils/searchHandler";
import IngList from "../../ingredients/IngList";
import ChoosenItems from "./ChoosenItems";
import {
  CreateIngreOrder,
  GetSuppliers,
} from "../../../services/IngreOrderService";
import { GetAllIngredients } from "../../../services/IngredientsSevice";

const AddIngreOrder = ({ closeModal }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userId = user ? user.employeeId : null;
  const [originalItems, setOriginalItems] = useState([]);
  const [renderItems, setRenderItems] = useState([]);
  const [choosenItems, setChoosenItems] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const selectRef = useRef(null);
  const { getSuppliersRes, getSuppliersErr } = GetSuppliers();
  const { getIngredientsRes, getIngredientsErr } = GetAllIngredients();
  const {
    createIngreOrderRes,
    createIngreOrderErr,
    createIngreOrderIsLoading,
    createIngreOrderAction,
  } = CreateIngreOrder();

  useEffect(() => {
    if (createIngreOrderRes) {
      dispatch(
        showNotification({ message: "Tạo phiếu nhập thành công", status: 1 })
      );
      closeModal();
    } else if (createIngreOrderErr) {
      dispatch(
        showNotification({ message: "Tạo phiếu nhập thất bại", status: 0 })
      );
    }
  }, [createIngreOrderRes, createIngreOrderErr, dispatch]);

  useEffect(() => {
    if (getSuppliersRes) {
      setSupplier(getSuppliersRes);
    }
    if (getIngredientsRes) {
      setOriginalItems(getIngredientsRes);
    }
  }, [getSuppliersRes, getIngredientsRes]);

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

    const data = {
      itemsDTOS: items.map((item) => {
        return { itemId: item.id, quantity: item.amount };
      }),
      supplierId: supplierId,
      staffId: userId,
    };

    createIngreOrderAction(data);
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
        <button
          className={`btn btn-secondary ml-4 ${
            createIngreOrderIsLoading ? "loading" : ""
          }`}
          onClick={submitHandler}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default AddIngreOrder;
