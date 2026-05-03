// src/pages/CreateProject.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

function CreateProject() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/projects", form);
      toast.success("Project created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create project"
      );
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create New Project</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={form.title}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <textarea
            name="description"
            placeholder="Project Description"
            value={form.description}
            onChange={handleChange}
            style={styles.textarea}
            rows="6"
            required
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>

          <button type="submit" style={styles.button}>
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f1f5f9",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "700px",
    background: "#ffffff",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#1e293b",
  },
  input: {
    width: "100%",
    padding: "15px",
    marginBottom: "20px",
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
    fontSize: "1rem",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "15px",
    marginBottom: "20px",
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
    fontSize: "1rem",
    resize: "vertical",
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
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default CreateProject;