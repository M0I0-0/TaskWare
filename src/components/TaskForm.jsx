import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [profesor, setProfesor] = useState('');
  const [materia, setMateria] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !fecha || !profesor || !materia) {
      setIsModalOpen(true);
      return;
    }
    onAddTask({ nombre, fecha, profesor, materia });
    setNombre('');
    setFecha('');
    setProfesor('');
    setMateria('');
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nueva tarea"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />
      <input
        type="text"
        placeholder="Profesor"
        value={profesor}
        onChange={(e) => setProfesor(e.target.value)}
      />
      <input
        type="text"
        placeholder="Asignatura"
        value={materia}
        onChange={(e) => setMateria(e.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
    
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Error</h3>
            <p>Por favor, completa todos los campos.</p>
            <div className="modal-buttons">
              <button onClick={() => setIsModalOpen(false)}>Aceptar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskForm;
