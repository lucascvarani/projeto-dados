import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Node } from "./pages/Node";
import { General } from "./pages/General";
import { Appointments } from "./pages/Appointments";
import { Referrals } from "./pages/Referrals";
import { QueueTime } from "./pages/QueueTime";

export function AppRoutes() {
  const [fromValue, setFromValue] = useState(new Date());
  const [toValue, setToValue] = useState(new Date());
  if (fromValue) {
    fromValue.setHours(0);
    fromValue.setMinutes(0);
  }
  if (toValue) {
    toValue.setHours(23);
    toValue.setMinutes(59);
  }

  useEffect(() => {
    // TODO CALL TO API PASSING TOKEN TO GET INFORMATION ABOUT USER, TO DISPATCH USER TO REDUX HERE
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/general" />} />
        <Route
          path="/general"
          element={
            <Node
              setFromValue={(value: Date) => setFromValue(value)}
              setToValue={(value: Date) => setToValue(value)}
              fromValue={fromValue}
              toValue={toValue}
            >
              <General fromValue={fromValue} toValue={toValue} />
            </Node>
          }
        />
        {/* <Route
          path="/appointments"
          element={
            <Node
              setFromValue={(value: Date) => setFromValue(value)}
              setToValue={(value: Date) => setToValue(value)}
              fromValue={fromValue}
              toValue={toValue}
            >
              <Appointments fromValue={fromValue} toValue={toValue} />
            </Node>
          }
        />
        <Route
          path="/referrals"
          element={
            <Node
              setFromValue={(value: Date) => setFromValue(value)}
              setToValue={(value: Date) => setToValue(value)}
              fromValue={fromValue}
              toValue={toValue}
            >
              <Referrals />
            </Node>
          }
        /> */}
        <Route
          path="/queue-time"
          element={
            <Node
              setFromValue={(value: Date) => setFromValue(value)}
              setToValue={(value: Date) => setToValue(value)}
              fromValue={fromValue}
              toValue={toValue}
            >
              <QueueTime fromValue={fromValue} toValue={toValue} />
            </Node>
          }
        />
      </Routes>
    </Router>
  );
}
