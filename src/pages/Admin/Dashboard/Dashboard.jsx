import DocumentTitle from "../../../common/documentTitle";
import "./Dashboard.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  DocumentTitle("Dashboard");

  // Sample data for Users chart
  const usersData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Users",
        data: [200, 400, 600, 800, 1200, 1500],
        borderColor: "#28a745",
        backgroundColor: "rgba(40, 167, 69, 0.2)",
        fill: true,
      },
    ],
  };

  // Sample data for Orders chart
  const ordersData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Orders",
        data: [100, 270, 290, 400, 170, 300],
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        fill: true,
      },
    ],
  };

  // Sample data for Revenue chart
  const revenueData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Revenue",
        data: [5000, 12900, 9000, 21000, 14600, 11250],
        borderColor: "#ffc107",
        backgroundColor: "rgba(255, 193, 7, 0.2)",
        fill: true,
      },
    ],
  };

  // Common chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart Title",
      },
    },
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <span className="title">Dashboard</span>
      </div>

      {/* Row 1: Cards */}
      <div className="dashboard-row">
        <div className="dashboard-card">
          <h3>Users</h3>
          <p>1,200</p>
        </div>
        <div className="dashboard-card">
          <h3>Orders</h3>
          <p>350</p>
        </div>
        <div className="dashboard-card">
          <h3>Revenue</h3>
          <p>$30,000</p>
        </div>
      </div>

      {/* Row 2: Charts */}
      <div className="dashboard-row">
        <div className="dashboard-chart">
          <Line
            data={usersData}
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: { text: "Users Growth" },
              },
            }}
          />
        </div>
        <div className="dashboard-chart">
          <Line
            data={ordersData}
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: { text: "Orders Growth" },
              },
            }}
          />
        </div>
        <div className="dashboard-chart">
          <Line
            data={revenueData}
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: { text: "Revenue Growth" },
              },
            }} 
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
