import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";
import useAuth from "../context/useAuth";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", form);

      login(data);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h1 style={styles.title}>Ethara AI</h1>
        <h2 style={styles.subtitle}>Team Task Manager</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          Login
        </button>

        <p style={styles.text}>
          Don't have an account?{" "}
          <Link to="/register" style={styles.link}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "20px",
  },
  form: {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "20px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
  },
  title: {
    textAlign: "center",
    marginBottom: "10px",
    color: "#2563eb",
    fontSize: "2.5rem",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#4b5563",
    fontSize: "1.3rem",
  },
  input: {
    width: "100%",
    padding: "15px",
    marginBottom: "20px",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    fontSize: "1rem",
    outline: "none",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "15px",
    background: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    fontSize: "1rem",
    cursor: "pointer",
    fontWeight: "bold",
  },
  text: {
    textAlign: "center",
    marginTop: "20px",
    color: "#6b7280",
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Login;