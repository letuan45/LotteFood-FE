import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import { showNotification } from "../../common/headerSlice";
import ErrorText from "../../../components/Typography/ErrorText";
import TitleCard from "../../../components/Cards/TitleCard";
import SearchBar from "../../../components/Input/SearchBar";
import { useRef } from "react";

const DUMMY_CUSTOMERS = [
  {
    id: 1,
    name: "Lê Tuấn",
    gender: 1,
    dateOfBirth: "09/06/2023",
    address: "97 Man Thiện",
    phone: "0981756860",
    score: 2000,
  },
  {
    id: 2,
    name: "Lê Tuấn",
    gender: 1,
    dateOfBirth: "09/06/2023",
    address: "97 Man Thiện",
    phone: "0981756860",
    score: 2000,
  },
  {
    id: 3,
    name: "Lê Tuấn",
    gender: 1,
    dateOfBirth: "09/06/2023",
    address: "97 Man Thiện",
    phone: "0981756860",
    score: 2000,
  },
  {
    id: 4,
    name: "Lê Tuấn",
    gender: 1,
    dateOfBirth: "09/06/2023",
    address: "97 Man Thiện",
    phone: "0981756860",
    score: 2000,
  },
  {
    id: 5,
    name: "Lê Tuấn",
    gender: 1,
    dateOfBirth: "09/06/2023",
    address: "97 Man Thiện",
    phone: "0981756860",
    score: 2000,
  },
];

const INITIAL_DATA= {
  customerMoney: "",
};

const DUMMY_PAYMENT = [
  {
    id: 1,
    name: "Thanh toán bằng tiền mặt",
  },
  {
    id: 2,
    name: "Thanh toán bằng thẻ ngân hàng",
  },
  {
    id: 3,
    name: "Thanh toán bằng thẻ tín dụng",
  },
];

const ConfirmOrder = ({ closeModal }) => {
  const selectRef = useRef(null);
  const [payments, setPayments] = useState(DUMMY_PAYMENT);
  const [customers, setCustomers] = useState(DUMMY_CUSTOMERS);
  const [choosenCustomer, setChoosenCustomer] = useState(0);
  const [billData, setBillData] = useState(INITIAL_DATA);
  const [discount, setDiscount] = useState([])

  const chooseCustomerHandler = (id) => {
    if (id === choosenCustomer) {
      setChoosenCustomer(0);
      return;
    }
    setChoosenCustomer(id);
  };

  const updateFormValue = ({ updateType, value }) => {
    setBillData({ ...billData, [updateType]: value });
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-1">
          <TitleCard title="Chọn khách hàng" TopSideButtons={<SearchBar />}>
            <h1 className="font-bold mb-3">
              Không chọn khách hàng để thanh toán với khách lẻ
            </h1>
            <div className="h-72 overflow-y-auto">
              {customers.map((item) => (
                <div
                  key={item.id}
                  className={`shadow-md py-2 ${
                    choosenCustomer === item.id ? "bg-blue" : "bg-grey"
                  } px-4 my-3 rounded-md`}
                  onClick={chooseCustomerHandler.bind(this, item.id)}
                >
                  <p className="font-semibold">{item.name}</p>
                  <p>{item.phone}</p>
                </div>
              ))}
            </div>
          </TitleCard>
        </div>
        <div className="col-span-1">
          <TitleCard title="Thanh toán">
            <div className="h-80 overflow-y-auto w-full">
              <select
                className="select select-bordered w-full max-w-xs mt-2 float-left"
                defaultValue={"default"}
                ref={selectRef}
              >
                <option disabled value="default">
                  Phương thức thanh toán
                </option>
                {payments.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
              <div className={`form-control w-full`}>
                <label className="label">
                  <span className={"label-text text-base-content"}>
                    Tổng tiền hóa đơn
                  </span>
                </label>
                <input
                  type={"text"}
                  value=""
                  readOnly
                  disabled
                  // onChange={(e) => updateInputValue(e.target.value)}
                  className="input input-bordered w-full "
                />
              </div>
              <div className={`form-control w-full`}>
                <label className="label">
                  <span className={"label-text text-base-content"}>
                    Tiền khách trả
                  </span>
                </label>
                <input
                  type={"text"}
                  value=""
                  // onChange={(e) => updateInputValue(e.target.value)}
                  className="input input-bordered w-full "
                />
              </div>
              <div className={`form-control w-full`}>
                <label className="label">
                  <span className={"label-text text-base-content"}>
                    Tiền giảm giá
                  </span>
                </label>
                <input
                  type={"text"}
                  value=""
                  readOnly
                  disabled
                  // onChange={(e) => updateInputValue(e.target.value)}
                  className="input input-bordered w-full "
                />
              </div>
              <div className={`form-control w-full`}>
                <label className="label">
                  <span className={"label-text text-base-content"}>
                    Tiền thanh toán
                  </span>
                </label>
                <input
                  type={"text"}
                  value=""
                  readOnly
                  disabled
                  // onChange={(e) => updateInputValue(e.target.value)}
                  className="input input-bordered w-full "
                />
              </div>
              <div className={`form-control w-full`}>
                <label className="label">
                  <span className={"label-text text-base-content"}>
                    Tiền trả khách
                  </span>
                </label>
                <input
                  type={"text"}
                  value=""
                  readOnly
                  disabled
                  // onChange={(e) => updateInputValue(e.target.value)}
                  className="input input-bordered w-full "
                />
              </div>
            </div>
          </TitleCard>
        </div>
      </div>
      <div className="modal-action">
        <button className="btn btn-primary px-6">Xác nhận</button>
      </div>
    </div>
  );
};

export default ConfirmOrder;
