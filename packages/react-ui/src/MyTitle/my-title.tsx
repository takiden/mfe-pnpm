import { FC } from "react";

interface TitleProps {
  title: string;
}

const MyTitle: FC<TitleProps> = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default MyTitle;
