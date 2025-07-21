"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const labelOrder = ["Open", "Closed", "In Progress", "Resolved"] as const;
type LabelType = (typeof labelOrder)[number];
type BugStatus = {
  status: string;
  count: number;
};

const statusMap: Record<LabelType, string> = {
  Open: "OPEN",
  Closed: "CLOSED",
  "In Progress": "IN_PROGRESS",
  Resolved: "RESOLVED",
};

export default function SimpleBarChart({
  bugStatusCount,
}: {
  bugStatusCount: BugStatus[];
}) {
  const mappedData = labelOrder.map((label) => {
    const status = statusMap[label];
    const item = bugStatusCount.find((d) => d.status === status);
    return item ? item.count : 0;
  });

  const data: ChartData<"bar", number[], unknown> = {
    labels: [...labelOrder],
    datasets: [
      {
        label: "Bugs",
        data: mappedData,
        backgroundColor: ["#f87171", "#34d399", "#818cf8", "#2b7fff"],
      },
    ],
  };

  console.log("Bar Chart Data:", mappedData, bugStatusCount);

  return <Bar data={data} />;
}
