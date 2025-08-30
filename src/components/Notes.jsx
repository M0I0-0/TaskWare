import React, { useEffect, useState } from 'react';
import '../styles/Notes.css';

const Notes = () => {
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

useEffect(() => {
  const token = localStorage.getItem("authToken"); // o como lo guardes

  fetch("https://backtask-beta.vercel.app/api/notes", {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => setNotes(data.contenido || ""));
}, []);

const saveNotes = async () => {
  const token = localStorage.getItem("authToken");

  setIsSaving(true);
  await fetch("https://backtask-beta.vercel.app/api/notes", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ contenido: notes })
  });
  setTimeout(() => setIsSaving(false), 1000);
};


  return (
    <div>
      <div className="notes-header">
        <h2 className="notes-title">Notas Importantes</h2>
        <p className="notes-subtitle">Guarda tus notas importantes aquí</p>
      </div>
      
      <div className="notes-content">
        <textarea
          className="notes-textarea"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Escribe tus notas aquí..."
          rows={10}
        />
      </div>
      
      <div className="notes-footer">
        <div className="notes-actions">
          <button 
            className="notes-save-btn"
            onClick={saveNotes}
            disabled={isSaving}
          >
            {isSaving ? "Actualizando..." : "Actualizar Notas"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notes;
