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
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../../context/StoreContext";
import axiosInstance from "../../../common/axiosInstance";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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
  const {
    authUser,
    userList,
    fetchUserList,
    orderList,
    fetchOrderList,
    token,
  } = useContext(StoreContext);
  const [revenue, setRevenue] = useState(0);
  const [userChart, setUserChart] = useState({
    labels: [],
    data: [],
  });
  const [orderChart, setOrderChart] = useState({
    labels: [],
    data: [],
  });
  const [revenueChart, setRevenueChart] = useState({
    labels: [],
    data: [],
  });
  useEffect(() => {
    fetchUserList();
    fetchOrderList();
    getTotalRevenue();
    getChartData();
  }, []);

  const getTotalRevenue = async () => {
    try {
      const response = await axiosInstance.get(`api/order/revenue`, {
        headers: {
          token,
        },
      });
      if (response.data.success) {
        setRevenue(response.data.revenue);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while fetching revenue!");
    }
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getChartData = async () => {
    try {
      const response = await axiosInstance.get(`api/charts`, {
        headers: {
          token,
        },
      });

      if (response.data.success) {
        const userChartLabels = [];
        const userChartData = [];
        const orderChartLabels = [];
        const orderChartData = [];
        const revenueChartLabels = [];
        const revenueChartData = [];
        response.data.users = response.data.users?.sort(
          (a, b) => Number(a._id) - Number(b._id)
        );
        response.data.users.map((user) => {
          userChartLabels.push(months[user._id - 1]);
          userChartData.push(user.totalUsers);
        });
        setUserChart({
          labels: userChartLabels,
          data: userChartData,
        });

        response.data.orders = response.data.orders?.sort(
          (a, b) => Number(a._id) - Number(b._id)
        );
        response.data.orders.map((order) => {
          orderChartLabels.push(months[order._id - 1]);
          orderChartData.push(order.totalOrder);
        });
        setOrderChart({
          labels: orderChartLabels,
          data: orderChartData,
        });

        response.data.revenue = response.data.revenue?.sort(
          (a, b) => Number(a._id) - Number(b._id)
        );
        response.data.revenue.map((revenue) => {
          revenueChartLabels.push(months[revenue._id - 1]);
          revenueChartData.push(revenue.totalRevenue);
        });
        setRevenueChart({
          labels: revenueChartLabels,
          data: revenueChartData,
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while fetching revenue!");
    }
  };

  // Sample data for Users chart
  const usersData = {
    labels: userChart.labels,
    datasets: [
      {
        label: "Users",
        data: userChart.data,
        borderColor: "#28a745",
        backgroundColor: "rgba(40, 167, 69, 0.2)",
        // fill: true,
      },
    ],
  };

  // Sample data for Orders chart
  const ordersData = {
    labels: orderChart.labels,
    datasets: [
      {
        label: "Orders",
        data: orderChart.data,
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        // fill: true,
      },
    ],
  };

  // Sample data for Revenue chart
  const revenueData = {
    labels: revenueChart.labels,
    datasets: [
      {
        label: "Revenue",
        data: revenueChart.data,
        borderColor: "#ffc107",
        backgroundColor: "rgba(255, 193, 7, 0.2)",
        // fill: true,
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
      tooltip: {
        callbacks: {
          // Customize tooltip for the Revenue chart
          label: function (tooltipItem) {
            return (
              "₹" +
              Number(
                tooltipItem.raw.toLocaleString().replace(/,/g, "")
              ).toFixed(2)
            );
          },
        },
      },
    },
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <span className="title">
          Welcome, <strong>{authUser.name}</strong>
        </span>
      </div>

      {/* Row 1: Cards */}
      <div className="dashboard-row">
        <Link className="dashboard-card" to="/admin/users">
          <h3>Total Users</h3>
          <p>{userList.length}</p>
        </Link>
        <Link className="dashboard-card" to="/admin/orders">
          <h3>Total Orders</h3>
          <p>{orderList.length}</p>
        </Link>
        <div className="dashboard-card">
          <h3>Revenue</h3>
          <p>₹{revenue}</p>
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
