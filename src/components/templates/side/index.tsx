import React from "react";

import "./side.css";

interface TProps {
  children: React.ReactNode;
}

export const SideTemplate = ({ children }: TProps) => {
  return <div className="side-template">{children}</div>;
};
