import React from "react";
import { Bar } from "react-chartjs-2";
import { Box } from "@chakra-ui/react";

// Import Chart.js modules
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const SalesChart = ({ data }) => {
  // Prepare chart data
  const chartData = {
    labels: data.map((product) => product.name), // Product names
    datasets: [
      {
        label: "Units Sold",
        data: data.map((product) => product.totalSold), // Total sold
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Blue bars
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Revenue ($)",
        data: data.map((product) => product.revenue), // Revenue
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Teal bars
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: { display: false }, // Hide grid lines on X-axis
      },
      y: {
        ticks: { beginAtZero: true },
      },
    },
  };

  return (
    <Box bg="gray.900" color="white" p={6} borderRadius="lg" boxShadow="lg">
      <Box className="text-left mb-5 font-sans text-xl font-bold">Most Sold This Week</Box>
      <Bar data={chartData} options={chartOptions} />
    </Box>
  );
};

export default SalesChart;
