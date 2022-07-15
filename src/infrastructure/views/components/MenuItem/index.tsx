import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./styles.scss";

interface Props {
  id: number;
  icon?: React.ReactNode;
  text: string;
  selected?: boolean;
  redirectTo: string;
}

function MenuItem(props: Props) {
  const { id, icon, text, selected, redirectTo } = props;
  const navigate = useNavigate();
  return (
    <div
      id="menu-item"
      className={`${!id ? "top" : ""} ${selected ? "selected" : ""}`}
      onClick={() => navigate(redirectTo)}
    >
      <div className="icon-container">{icon}</div>
      {text}
    </div>
  );
}

export default MenuItem;
