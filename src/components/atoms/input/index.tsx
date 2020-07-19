import React, { HTMLProps } from "react";

import "./style.css";

interface TProps extends HTMLProps<HTMLInputElement> {
  kind: "primary" | "blue";
}

export const Input = (props: TProps) => {
  const className = props.kind === "primary" ? "primary" : "blue";

  return <input className={className} {...props} />;
};
