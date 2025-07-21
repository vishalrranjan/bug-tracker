"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const data = {
  labels: ["Open", "Closed", "In Progress"],
  datasets: [
    {
      label: "Bugs",
      data: [12, 19, 3],
      backgroundColor: ["#f87171", "#34d399", "#818cf8"],
    },
  ],
};

export default function SimpleBarChart() {
  return <Bar data={data} />;
}
