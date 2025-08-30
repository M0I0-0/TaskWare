import React, { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import Notes from '../components/Notes';
import ScheduleTable from '../components/ScheduleTable';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Dash.css';

function Dash() {
  const [tasks, setTasks] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editValues, setEditValues] = useState({
    nombre: '',
    fecha: '',
    profesor: '',
    materia: ''
  });

  const API_URL = "https://backtask-beta.vercel.app/api/tasks";
  const navigate = useNavigate();

  // --- Cargar tareas del usuario ---
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(API_URL, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Error cargando tareas:", err));
  }, [navigate]);

  // --- Agregar tarea ---
  const addTask = async (task) => {
    const token = localStorage.getItem("authToken");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(task),
      });
      const newTask = await res.json();
      setTasks(prev => [...prev, newTask]);
    } catch (err) {
      console.error("Error agregando tarea:", err);
    }
  };

  // --- Eliminar tarea ---
  const deleteTask = async (id) => {
    const token = localStorage.getItem("authToken");
    try {
      await fetch(`${API_URL}/${id}`, { 
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      console.error("Error eliminando tarea:", err);
    }
  };

  // --- Abrir modal edición ---
  const editTask = (task) => {
    setSelectedTask(task);
    setEditValues(task);
    setIsEditModalOpen(true);
  };

  // --- Guardar edición ---
  const handleSaveEdit = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const res = await fetch(`${API_URL}/${selectedTask.id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(editValues),
      });
      const updatedTask = await res.json();

      setTasks(prev => prev.map(t => (t.id === updatedTask.id ? updatedTask : t)));
      setIsEditModalOpen(false);
    } catch (err) {
      console.error("Error actualizando tarea:", err);
    }
  };

  // --- Logout ---
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  return (
    <>
      {/* Header */}
      <header className="app-header">
        <h1>TaskWare</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to="/calendar">
            <button>Ir al calendario</button>
          </Link>
          <button className='button-closed' onClick={handleLogout}>Cerrar sesión</button>
        </div>

      </header>

      {/* Main Layout */}
      <div className="dashboard-grid">
        {/* Sidebar Tareas */}
        <aside className="task-list-panel">
          <h2>Mis Tareas</h2>
          <TaskList tasks={tasks} onDelete={deleteTask} onEdit={editTask} />
        </aside>

        {/* Centro: Formulario */}
        <section className="task-form-panel">
          <h2>Nueva Tarea</h2>
          <p>Agrega una tarea a tu calendario</p>
          <TaskForm onAddTask={addTask} />
        </section>

        {/* Derecha: Notas */}
        <section className="notes-panel">
          <Notes />
        </section>
      </div>

      {/* Abajo: Horario */}
      <div className="schedule-panel">
        <ScheduleTable />
      </div>

      {/* Modal edición */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Editar tarea</h3>
            <input
              type="text"
              value={editValues.nombre}
              onChange={(e) => setEditValues({ ...editValues, nombre: e.target.value })}
              placeholder="Nombre de la tarea"
            />
            <input
              type="date"
              value={editValues.fecha}
              onChange={(e) => setEditValues({ ...editValues, fecha: e.target.value })}
            />
            <input
              type="text"
              value={editValues.profesor}
              onChange={(e) => setEditValues({ ...editValues, profesor: e.target.value })}
              placeholder="Profesor"
            />
            <input
              type="text"
              value={editValues.materia}
              onChange={(e) => setEditValues({ ...editValues, materia: e.target.value })}
              placeholder="Materia"
            />
            <div className="modal-buttons">
              <button onClick={handleSaveEdit}>Guardar</button>
              <button onClick={() => setIsEditModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dash;
