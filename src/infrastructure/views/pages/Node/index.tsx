import React from "react";
import Header from "../../components/Header";
import SideMenu from "../../components/SideMenu";
import "./styles.scss";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export function Node({ children }: Props) {
  return (
    <div role="contentinfo" id="home-screen">
      <Header />
      <div className="side-and-page">
        <SideMenu />
        {children}
      </div>
    </div>
  );
}
