import { FC } from "react";

export const Error: FC<{ text: string }> = ({ text }) => {
  return <div>{text}</div>;
};
