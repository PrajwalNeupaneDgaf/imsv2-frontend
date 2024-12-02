import React from "react";
import { Bar } from "react-chartjs-2";
import { Box, Text } from "@chakra-ui/react";

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

const LowStockChart = ({ data }) => {
  // Prepare chart data
  const chartData = {
    labels: data.map((item) => item.name), // Item names
    datasets: [
      {
        label: "Stock",
        data: data.map((item) => item.quantity), // Stock data
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Red bars for low stock
        borderColor: "rgba(255, 99, 132, 1)",
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
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Low Stock Items (Less than 50)
      </Text>
      <Bar data={chartData} options={chartOptions} />
    </Box>
  );
};

export default LowStockChart;
