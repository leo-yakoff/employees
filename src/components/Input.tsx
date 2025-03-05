import React from "react";

import { getClassName, getFieldId } from "./utils";

interface InputProps {
  type: string;
  fieldName: string;
  value: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string;
  min?: string;
  max?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  fieldName,
  value,
  placeholder,
  onChange,
  errorMessage,
  min,
  max,
}) => {
  return (
    <input
      type={type}
      id={getFieldId(fieldName)}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={getClassName(errorMessage)}
      min={min}
      max={max}
    />
  );
};

export default Input;
