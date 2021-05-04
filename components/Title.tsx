import React from "react";
import Style from "components/styles/style.module.scss";

export type Props = {
  title: string;
};

export const Title: React.FC<Props> = (props) => {
  return (
    <h2 className={Style.title}>
      <span>{props.title}</span>
    </h2>
  );
};

export default Title;
