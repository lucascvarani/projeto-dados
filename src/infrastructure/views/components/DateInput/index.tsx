import React, { useState } from "react";
import DatePicker from "react-date-picker";
import { AiOutlineCalendar } from "react-icons/ai";

import "./styles.scss";

interface Props {
  onChangeValue: (value: Date) => void;
  value: Date;
  minDate?: Date;
  maxDate?: Date;
}

function DateInput(props: Props) {
  const { onChangeValue, value, minDate, maxDate } = props;
  // const [value, onChange] = useState(new Date());
  return (
    <div id="date-input-component">
      <div className="label">De</div>
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
