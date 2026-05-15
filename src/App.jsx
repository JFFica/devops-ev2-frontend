import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function App() {
  const [projects, setProjects] = useState([]);
  const [resources, setResources] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  const [projectName, setProjectName] = useState("");
  const [resourceName, setResourceName] = useState("");

  const loadData = async () => {
    try {
      const projectsResponse = await axios.get(`${API_URL}/api/projects`);
      const resourcesResponse = await axios.get(`${API_URL}/api/resources`);
      const analyticsResponse = await axios.get(`${API_URL}/api/analytics/summary`);

      setProjects(projectsResponse.data);
      setResources(resourcesResponse.data);
      setAnalytics(analyticsResponse.data);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  const createProject = async () => {
    if (!projectName.trim()) return;

    await axios.post(`${API_URL}/api/projects`, {
      name: projectName,
      status: "Activo",
    });

    setProjectName("");
    loadData();
  };

  const deleteProject = async (id) => {
    await axios.delete(`${API_URL}/api/projects/${id}`);
    loadData();
  };

  const createResource = async () => {
    if (!resourceName.trim()) return;

    await axios.post(`${API_URL}/api/resources`, {
      name: resourceName,
      role: "Desarrollador",
    });

    setResourceName("");
    loadData();
  };

  const deleteResource = async (id) => {
    await axios.delete(`${API_URL}/api/resources/${id}`);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <main className="app">
      <section className="hero">
        <div>
          <p className="tag">Innovatech Chile</p>
          <h1>Panel de Gestión DevOps</h1>
          <p>
            Plataforma contenerizada para gestionar proyectos, recursos humanos
            y visualizar indicadores generales del sistema.
          </p>
        </div>

        <div className="status-card">
          <span>Estado del sistema</span>
          <strong>Operativo</strong>
          <small>Frontend preparado para consumir API Gateway / Backend</small>
        </div>
      </section>

      <section className="grid analytics-grid">
        <div className="card">
          <span>Proyectos</span>
          <strong>{analytics?.totalProjects ?? projects.length}</strong>
        </div>

        <div className="card">
          <span>Recursos humanos</span>
          <strong>{analytics?.totalResources ?? resources.length}</strong>
        </div>

        <div className="card">
          <span>Estado general</span>
          <strong>{analytics?.systemStatus ?? "Activo"}</strong>
        </div>
      </section>

      <section className="grid">
        <div className="panel">
          <h2>Gestión de proyectos</h2>
          <p>Crear, visualizar y eliminar proyectos de Innovatech.</p>

          <div className="form">
            <input
              type="text"
              placeholder="Nombre del proyecto"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <button onClick={createProject}>Crear proyecto</button>
          </div>

          <div className="list">
            {projects.map((project) => (
              <div className="item" key={project.id}>
                <div>
                  <strong>{project.name}</strong>
                  <span>{project.status}</span>
                </div>
                <button className="danger" onClick={() => deleteProject(project.id)}>
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <h2>Gestión de recursos</h2>
          <p>Registrar, visualizar y eliminar recursos humanos.</p>

          <div className="form">
            <input
              type="text"
              placeholder="Nombre del recurso"
              value={resourceName}
              onChange={(e) => setResourceName(e.target.value)}
            />
            <button onClick={createResource}>Crear recurso</button>
          </div>

          <div className="list">
            {resources.map((resource) => (
              <div className="item" key={resource.id}>
                <div>
                  <strong>{resource.name}</strong>
                  <span>{resource.role}</span>
                </div>
                <button className="danger" onClick={() => deleteResource(resource.id)}>
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;