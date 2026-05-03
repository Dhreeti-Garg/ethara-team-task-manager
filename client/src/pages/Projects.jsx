import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function Projects() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const { data } = await API.get("/projects");
      setProjects(data);
    } catch {
      toast.error("Failed to load projects");
    }
  };

  const deleteProject = async (id) => {
    try {
      await API.delete(`/projects/${id}`);
      toast.success("Project deleted");
      fetchProjects();
    } catch {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2>My Projects</h2>

      {projects.length === 0 ? (
        <p>No projects found</p>
      ) : (
        projects.map((project) => (
          <div
            key={project._id}
            style={{
              padding: "15px",
              margin: "10px 0",
              background: "#fff",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </div>

            <button
              onClick={() => deleteProject(project._id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "5px",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Projects;