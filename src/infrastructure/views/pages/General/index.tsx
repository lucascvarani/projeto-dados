import React, { useEffect, useState } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import moment from "moment";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Doughnut } from "react-chartjs-2";
import { firestore } from "../../../../utils/firebase";
import "./styles.scss";

Chart.register(ArcElement, Tooltip, Legend);

type Props = {
  fromValue: Date;
  toValue: Date;
};

interface Attendance {
  seconds: number;
  hc_number: string;
  name: string;
  token: string;
  visit_purpose: string;
}

export function General({ fromValue, toValue }: Props) {
  const [proceduresValue, setProceduresValue] = useState<number>(0);
  const [appointmentsValue, setAppointmentsValue] = useState<number>(0);
  // const [attendancesValue, setAttendancesValue] = useState<Attendance[]>([]);
  const [timeAverageValue, setTimeAverageValue] = useState<string>("0");

  const calculateAverage = (
    totalSeconds: number,
    calledAttendancesCount: number
  ) => {
    return (totalSeconds / 60 / calledAttendancesCount).toFixed(0);
  };

  const getItem = async () => {
    const q = query(
      collection(firestore, "queue_numbers"),
      where("date", ">=", fromValue),
      where("date", "<=", toValue)
    );
    const querySnapshot = await getDocs(q);
    const attendances: Attendance[] = [];
    let procedures = 0;
    let appointments = 0;
    let totalSeconds = 0;
    let calledAttendancesCount = 0;
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.date_called) {
        calledAttendancesCount += 1;
        totalSeconds += data.date_called.seconds - data.date.seconds;
      }
      attendances.push({
        seconds: data.date.seconds,
        hc_number: data.hc_number,
        name: data.name,
        token: data.token,
        visit_purpose: data.visit_purpose,
      });
      if (doc.data().visit_purpose === "procedure") procedures += 1;
      else if (doc.data().visit_purpose === "appointment") appointments += 1;
    });
    setProceduresValue(procedures);
    setAppointmentsValue(appointments);
    if (calledAttendancesCount)
      setTimeAverageValue(
        calculateAverage(totalSeconds, calledAttendancesCount)
      );
    else setTimeAverageValue("0");
    return querySnapshot;
  };

  useEffect(() => {
    const fetchData = async () => {
      await getItem();
    };

    fetchData();
  }, [fromValue, toValue]);

  const data = {
    labels: ["Consultas", "Procedimentos"],
    datasets: [
      {
        fill: true,
        label: "# of Votes",
        data: [proceduresValue, appointmentsValue],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div role="contentinfo" id="general-screen">
      <div className="total-container">
        <span className="title">Número de Atendimentos</span>
        <span className="total">{proceduresValue + appointmentsValue}</span>
      </div>
      <div className="graph">
        <Doughnut data={data} options={{}} />
      </div>
      <div className="divider" />
      <div className="other-informations">
        <div className="average-title">Tempo médio de fila</div>
        <div className="average-value-container">
          <span>{timeAverageValue} minutos</span>
        </div>
      </div>
    </div>
  );
}
