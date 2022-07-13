import React, { useState } from "react";
import DatePicker from "react-date-picker";
import { AiOutlineCalendar } from "react-icons/ai";

import "./styles.scss";

interface Props {
  onChangeValue: (value: Date) => void;
  label: string;
  value: Date;
  minDate?: Date;
  maxDate?: Date;
}

function DateInput(props: Props) {
  const { onChangeValue, label, value, minDate, maxDate } = props;
  return (
    <div id="date-input-component">
      <div className="label">{label}</div>
      <div className="date-input-container">
        <AiOutlineCalendar
          style={{ marginLeft: "5px", height: "25px", width: "25px" }}
        />
        <div className="date-input">
          <DatePicker
            onChange={onChangeValue}
            value={value}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>
      </div>
    </div>
  );
}

export default DateInput;
