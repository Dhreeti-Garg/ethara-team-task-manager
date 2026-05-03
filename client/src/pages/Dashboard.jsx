import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import useAuth from "../context/useAuth";

function Dashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
    overdueTasks: 0,
  });

  const fetchDashboard = async () => {
    try {
      const { data } = await API.get("/dashboard");
      setStats(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load dashboard");
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Welcome, {user?.name}</h2>

      <div style={styles.grid}>
        <Card title="Projects" value={stats.totalProjects} />
        <Card title="Total Tasks" value={stats.totalTasks} />
        <Card title="Completed" value={stats.completedTasks} />
        <Card title="Pending" value={stats.pendingTasks} />
        <Card title="In Progress" value={stats.inProgressTasks} />
        <Card title="Overdue" value={stats.overdueTasks} color="red" />
      </div>
    </div>
  );
}

// Reusable card
const Card = ({ title, value, color }) => (
  <div style={{ ...styles.card, borderLeft: `5px solid ${color || "#2563eb"}` }}>
    <h4>{title}</h4>
    <h2>{value}</h2>
  </div>
);

const styles = {
  container: {
    padding: "40px",
    background: "#f8fafc",
    minHeight: "100vh",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },
};

export default Dashboard;