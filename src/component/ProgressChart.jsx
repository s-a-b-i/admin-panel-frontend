


import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FaEllipsisV } from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProgressStatusChart = () => {
  const fullCategories = ["Programming", "UI/UX", "Digital", "Content", "WordPress"];
  const shortCategories = ["Prog.", "UI/UX", "Digi.", "Cont.", "WP"];

  const [labels, setLabels] = useState(fullCategories);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setLabels(shortCategories);
      } else {
        setLabels(fullCategories);
      }
    };

    // Initial check
    handleResize();

    // Listen for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getColorClass = (color) => {
    switch (color) {
      case "blue":
        return "#55A3FE"; // Blue
      case "mint":
        return "#36FFC3"; // Mint Green
      case "pink":
        return "#FF6384"; // Pinkish Red
      default:
        return "#D3D3D3"; // Light Grey for undefined
    }
  };

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Task 1",
        data: [48, 62, 75, 90, 70],
        backgroundColor: getColorClass("blue"),
        borderRadius: {
          topLeft: 10,
          topRight: 10,
        },
      },
      {
        label: "Task 2",
        data: [52, 55, 82, 65, 85],
        backgroundColor: getColorClass("mint"),
        borderRadius: {
          topLeft: 10,
          topRight: 10,
        },
      },
      {
        label: "Task 3",
        data: [85, 70, 90, 78, 95],
        backgroundColor: getColorClass("pink"),
        borderRadius: {
          topLeft: 10,
          topRight: 10,
        },
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `Progress: ${context.parsed.y}%`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            weight: "bold",
          },
          maxRotation: 0,
          minRotation: 0,
          autoSkip: false,
          padding: 10,
        },
        categoryPercentage: 0.6,
        barPercentage: 0.9,
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => value + "%",
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          borderDash: [5, 5],
        },
      },
    },
  };

  const statuses = [
    { color: "blue", label: "Completed", projects: 125, hours: 10 },
    { color: "mint", label: "Pending", projects: 50, hours: 5 },
    { color: "pink", label: "Cancelled", projects: 180, hours: 9 },
  ];

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-[720px] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-normal text-black">Project Status</h2>
        <button className="text-gray-400 text-sm sm:text-base">
          <FaEllipsisV />
        </button>
      </div>

      {/* Chart */}
      <div className="relative h-64 sm:h-80 mb-6 sm:mb-8">
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Project Status */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statuses.map((status, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-2 sm:p-4 border rounded-lg"
            style={{ borderColor: getColorClass(status.color) }}
          >
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div
                className="w-3 h-3 sm:w-4 sm:h-4 rounded-full"
                style={{ backgroundColor: getColorClass(status.color) }}
              ></div>
              <span className="text-xs sm:text-sm font-medium">{status.label}</span>
            </div>
            <span className="text-xs sm:text-sm font-normal mt-1 sm:mt-2">
              {status.projects} Projects
            </span>
            <span className="text-xs sm:text-sm font-normal mt-1 sm:mt-2">
              {status.hours} Hours
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressStatusChart;
