import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const ActionButton = (props) => {
  const { isPlus } = props;
  return (
    <button className="bg-green rounded-md" onClick={props.onClick}>
      {!isPlus && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
        </svg>
      )}
      {isPlus && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      )}
    </button>
  );
};

const NumberInput = ({
  width,
  height,
  onChange,
  defaultValue,
  isNoIncrease,
}) => {
  const [value, setValue] = useState(defaultValue ? defaultValue : 1);

  const increaseHandler = () => {
    setValue((oldValue) => oldValue + 1);
    onChange(value + 1);
  };

  const decreaseHandler = () => {
    if (value === 1) return;
    setValue((oldValue) => oldValue - 1);
    onChange(value - 1);
  };

  return (
    <div className="flex items-center">
      <ActionButton onClick={decreaseHandler} />
      <input
        onChange={(event) => {
          if (event.target.value === "") {
            setValue(1);
          } else {
            setValue(+event.target.value);
            onChange(+event.target.value);
          }
        }}
        value={value}
        type="number"
        className={`input input-bordered text-center mx-2 ${height} ${width} p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
      />
      {!isNoIncrease && <ActionButton isPlus onClick={increaseHandler} />}
    </div>
  );
};

export default NumberInput;
