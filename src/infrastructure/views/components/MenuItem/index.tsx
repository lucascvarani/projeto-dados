import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./styles.scss";

interface Props {
  id: number;
  text: string;
  selected?: boolean;
  redirectTo: string;
}

function MenuItem(props: Props) {
  const { id, text, selected, redirectTo } = props;
  const navigate = useNavigate();
  return (
    <div
      id="menu-item"
      className={`${!id ? "top" : ""} ${selected ? "selected" : ""}`}
      onClick={() => navigate(redirectTo)}
    >
      {text}
    </div>
  );
}

export default MenuItem;
