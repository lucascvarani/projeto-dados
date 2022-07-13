import React, { useEffect } from "react";
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
            <Node>
              <General />
            </Node>
          }
        />
        <Route
          path="/appointments"
          element={
            <Node>
              <Appointments />
            </Node>
          }
        />
        <Route
          path="/referrals"
          element={
            <Node>
              <Referrals />
            </Node>
          }
        />
        <Route
          path="/queue-time"
          element={
            <Node>
              <QueueTime />
            </Node>
          }
        />
      </Routes>
    </Router>
  );
}
