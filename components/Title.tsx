import React from "react";
import Style from "components/styles/title.module.scss";

export type Props = {
  title: string;
};

export const Title: React.FC<Props> = (props) => {
  return <h2 className={Style.title}>{props.title}</h2>;
};

export default Title;
