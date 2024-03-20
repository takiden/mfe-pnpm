import { FC } from "react";

interface TitleProps {
  placeholder: string;
  type: string;
  defaultValue: string | number;
}

const MyInput: FC<TitleProps> = ({ type, placeholder, defaultValue }) => {
  return (
    <div>
      <input type={type} placeholder={placeholder} value={defaultValue}></input>
    </div>
  );
};

export default MyInput;
