import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");

  // Fetch single project + tasks
  const fetchProject = async () => {
    try {
      const { data } = await API.get(`/projects/${id}`);
      setProject(data.project);
      setTasks(data.tasks);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load project");
    }
  };

  // Add task
  const addTask = async () => {
    if (!taskTitle.trim()) return;

    try {
      const { data } = await API.post(`/projects/${id}/tasks`, {
        title: taskTitle,
      });

      setTasks(data);
      setTaskTitle("");
      toast.success("Task added");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add task");
    }
  };

  // Toggle task status
  const toggleTask = async (taskId) => {
    try {
      const { data } = await API.put(
        `/projects/${id}/tasks/${taskId}`
      );

      setTasks(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update task");
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    try {
      const { data } = await API.delete(
        `/projects/${id}/tasks/${taskId}`
      );

      setTasks(data);
      toast.success("Task deleted");
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  if (!project) return <p>Loading project...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{project.name}</h2>
      <p style={styles.desc}>{project.description}</p>

      {/* Add Task */}
      <div style={styles.addTaskBox}>
        <input
          type="text"
          placeholder="Enter task..."
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          style={styles.input}
        />

        <button onClick={addTask} style={styles.addBtn}>
          Add Task
        </button>
      </div>

      {/* Tasks List */}
      <div style={styles.taskList}>
        {tasks.length === 0 ? (
          <p>No tasks yet</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} style={styles.taskCard}>
              <span
                style={{
                  textDecoration: task.completed
                    ? "line-through"
                    : "none",
                }}
              >
                {task.title}
              </span>

              <div style={styles.actions}>
                <button
                  onClick={() => toggleTask(task._id)}
                  style={styles.completeBtn}
                >
                  {task.completed ? "Undo" : "Done"}
                </button>

                <button
                  onClick={() => deleteTask(task._id)}
                  style={styles.deleteBtn}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    background: "#f8fafc",
    minHeight: "100vh",
  },
  title: {
    marginBottom: "10px",
  },
  desc: {
    marginBottom: "30px",
    color: "#64748b",
  },
  addTaskBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "30px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  addBtn: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  taskList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  taskCard: {
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  actions: {
    display: "flex",
    gap: "10px",
  },
  completeBtn: {
    background: "#22c55e",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default ProjectDetails;