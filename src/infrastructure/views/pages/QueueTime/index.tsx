import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { firestore } from "../../../../utils/firebase";
import "./styles.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

export function QueueTime({ fromValue, toValue }: Props) {
  const [labelsValue, setLabelsValue] = useState<string[]>([]);
  const [datasetValue, setDatasetValue] = useState<number[]>([]);
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
    let count = 0;
    const minutes = Array.from(Array(121).keys());
    const minutesCount = new Array(121).fill(0);
    let totalSeconds = 0;
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.date_called) {
        count += 1;
        totalSeconds += data.date_called.seconds - data.date.seconds;
        const minute = Math.trunc(
          (data.date_called.seconds - data.date.seconds) / 60
        );

        try {
          minutesCount[minute] += 1;
        } catch (e) {
          console.log(e);
        }
      }
    });
    const labels = minutesCount
      .map((minute, id) => (minute ? id : 0))
      .filter((m) => m);
    const minutesCountSized = minutesCount.filter((m) => m);
    const stringLabels = labels.map((l) => l.toFixed(0));
    setLabelsValue(stringLabels);
    setDatasetValue(minutesCountSized);
    if (count) setTimeAverageValue(calculateAverage(totalSeconds, count));
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
    labels: labelsValue,
    datasets: [
      {
        label: "Número de pacientes",
        data: datasetValue,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      yAxes: {
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: "Número de pacientes",
        },
      },
      x: {
        title: {
          display: true,
          text: "Minutos",
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Distribuição de tempo de fila (minutos)",
      },
    },
  };

  return (
    <div role="contentinfo" id="queue-time-screen">
      <div className="graphic-bar">
        <Bar options={options} data={data} />
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
