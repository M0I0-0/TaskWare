import React from 'react';

const TaskList = ({ tasks, onDelete, onEdit }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-Es', options);
  };
  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <div key={index} className="task-card">
          <div className="task-content">
            <h3 className="task-name">{task.nombre}</h3>
            <div className="task-details">
              <div className="detail-item">
                <span className="detail-icon">📅</span>
                <span className="detail-text">Entrega: {formatDate(task.fecha)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">👨‍🏫</span>
                <span className="detail-text">{task.profesor}</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">📚</span>
                <span className="detail-text">{task.materia}</span>
              </div>
            </div>
          </div>
          <div className="task-actions">
            <button 
              className="action-btn edit-btn"
              onClick={() => onEdit(task)}
              aria-label="Editar tarea"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.3333 2.00001C11.5083 1.82503 11.7162 1.686 11.945 1.59031C12.1738 1.49462 12.419 1.44409 12.6666 1.44168C12.9143 1.43927 13.1603 1.48502 13.3907 1.5763C13.6211 1.66758 13.8314 1.80269 14.0093 1.97424C14.1872 2.14579 14.3293 2.35042 14.4278 2.57651C14.5263 2.8026 14.5793 3.04579 14.5837 3.29227C14.5881 3.53875 14.5438 3.78367 14.4533 4.01334C14.3628 4.24301 14.2278 4.45318 14.0559 4.63223L13.3333 5.33334L10.6666 2.66668L11.3333 2.00001ZM9.33329 4.00001L2.66663 10.6667V13.3333H5.33329L12 6.66668L9.33329 4.00001Z" fill="currentColor"/>
              </svg>
            </button>
            <button 
              className="action-btn delete-btn"
              onClick={() => onDelete(task.id)}
              aria-label="Eliminar tarea"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3333 4.00001H12.6666V12.6667C12.6666 13.0203 12.5261 13.3594 12.2761 13.6095C12.026 13.8595 11.6869 14 11.3333 14H4.66663C4.313 14 3.97387 13.8595 3.72382 13.6095C3.47377 13.3594 3.33329 13.0203 3.33329 12.6667V4.00001H2.66663V2.66668H5.99996V2.00001C5.99996 1.8232 6.0702 1.65363 6.19522 1.52861C6.32024 1.40358 6.48981 1.33334 6.66663 1.33334H9.33329C9.5101 1.33334 9.67967 1.40358 9.8047 1.52861C9.92972 1.65363 9.99996 1.8232 9.99996 2.00001V2.66668H13.3333V4.00001ZM6.66663 2.00001V2.66668H9.33329V2.00001H6.66663ZM4.66663 4.00001V12.6667H11.3333V4.00001H4.66663Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default TaskList;
