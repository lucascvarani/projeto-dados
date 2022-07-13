import React, { useState } from "react";
import DateInput from "../../components/DateInput";
import Header from "../../components/Header";
import SideMenu from "../../components/SideMenu";
import "./styles.scss";

type Props = {
  children?: JSX.Element | JSX.Element[];
  setFromValue: (value: Date) => void;
  setToValue: (value: Date) => void;
  fromValue: Date;
  toValue: Date;
};

export function Node({
  children,
  setFromValue,
  setToValue,
  fromValue,
  toValue,
}: Props) {
  return (
    <div role="contentinfo" id="home-screen">
      <Header />
      <div className="side-and-page">
        <SideMenu />
        <div className="calendar-and-children">
          <div className="period-title">Período</div>
          <div className="period-container">
            <div className="calendar-from">
              <DateInput
                onChangeValue={(value: Date) => setFromValue(value)}
                value={fromValue}
                maxDate={toValue}
              />
            </div>
            <div className="calendar-to">
              <DateInput
                onChangeValue={(value: Date) => setToValue(value)}
                value={toValue}
                minDate={fromValue}
              />
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
