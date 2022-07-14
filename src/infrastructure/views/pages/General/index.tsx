import React, { useEffect, useState } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Doughnut } from "react-chartjs-2";
import { firestore } from "../../../../utils/firebase";
import "./styles.scss";

Chart.register(ArcElement, Tooltip, Legend);

type Props = {
  fromValue: Date;
  toValue: Date;
};

export function General({ fromValue, toValue }: Props) {
  const [proceduresValue, setProceduresValue] = useState<number>(0);
  const [appointmentsValue, setAppointmentsValue] = useState<number>(0);
  const getItem = async () => {
    const q = query(
      collection(firestore, "queue_numbers"),
      where("date", ">=", fromValue),
      where("date", "<=", toValue)
    );

    const querySnapshot = await getDocs(q);
    let procedures = 0;
    let appointments = 0;
    querySnapshot.forEach((doc) => {
      if (doc.data().visit_purpose === "procedure") procedures += 1;
      else if (doc.data().visit_purpose === "appointment") appointments += 1;
    });
    setProceduresValue(procedures);
    setAppointmentsValue(appointments);
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
        borderWidth: 3,
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
    </div>
  );
}
