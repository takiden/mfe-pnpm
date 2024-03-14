import { FC } from "react";

interface TitleProps {
  salute: string;
}

const MyTitle: FC<TitleProps> = ({ salute }) => {
  return (
    <div>
      <p>Hello {salute}</p>
    </div>
  );
};

export default MyTitle;
