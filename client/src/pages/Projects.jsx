import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  // ✅ FETCH PROJECTS
  const fetchProjects = async () => {
    try {
      const { data } = await API.get("/projects");
      setProjects(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load projects");
    }
  };

  // ✅ CREATE PROJECT
  const createProject = async () => {
    if (!form.name) {
      toast.error("Project name required");
      return;
    }

    try {
      await API.post("/projects", form);
      toast.success("Project created");

      setForm({ name: "", description: "" });
      fetchProjects();
    } catch (error) {
      console.log(error);
      toast.error("Create failed");
    }
  };

  // ✅ DELETE PROJECT
  const deleteProject = async (id) => {
    try {
      await API.delete(`/projects/${id}`);
      toast.success("Project deleted");
      fetchProjects();
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Projects</h2>

      {/* ✅ CREATE PROJECT BOX */}
      <div style={styles.formBox}>
        <input
          type="text"
          placeholder="Project Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Project Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          style={styles.input}
        />

        <button onClick={createProject} style={styles.createBtn}>
          Create Project
        </button>
      </div>

      {/* ✅ PROJECT LIST */}
      {projects.length === 0 ? (
        <p style={{ textAlign: "center" }}>No projects found</p>
      ) : (
        projects.map((project) => (
          <div key={project._id} style={styles.card}>
            <div>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </div>

            <button
              onClick={() => deleteProject(project._id)}
              style={styles.deleteBtn}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  container: {
    padding: "40px",
    background: "#f8fafc",
    minHeight: "100vh",
  },
  title: {
    marginBottom: "20px",
    color: "#1e293b",
  },
  formBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "30px",
    flexWrap: "wrap",
  },
  input: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    flex: "1",
    minWidth: "200px",
  },
  createBtn: {
    padding: "12px 20px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  card: {
    padding: "15px",
    margin: "10px 0",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Projects;
