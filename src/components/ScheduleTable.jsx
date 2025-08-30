import React, { useState, useEffect } from 'react';

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

const ScheduleTable = () => {
  const [schedule, setSchedule] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState({ hour: '', day: '' });
  const [inputValue, setInputValue] = useState('');

  // horas desde backend
  const [hoursList, setHoursList] = useState([]);
  const [isHourModalOpen, setIsHourModalOpen] = useState(false);
  const [selectedHourIndex, setSelectedHourIndex] = useState(null);
  const [hourInputValue, setHourInputValue] = useState('');

  // 📌 obtener token del usuario
  const token = localStorage.getItem("authToken");

  // 📌 cargar datos iniciales desde backend
  useEffect(() => {
    const loadData = async () => {
      // traer horas
      const res = await fetch("https://backtask-beta.vercel.app/api/horas", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();

      if (data.length === 0) {
        // si no hay horas en la BD -> meter las predefinidas
        const created = [];
        for (let rango of [
          "8:00 - 9:00",
          "9:00 - 10:00",
          "10:00 - 11:00",
          "11:00 - 12:00",
          "12:00 - 1:00",
          "1:00 - 2:00"
        ]) {
          const resHour = await fetch("https://backtask-beta.vercel.app/api/horas", {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}` 
            },
            body: JSON.stringify({ rango })
          });
          const newHour = await resHour.json();
          created.push(newHour);
        }
        setHoursList(created);
      } else {
        setHoursList(data);
      }

      // traer horario
      const resHorario = await fetch("https://backtask-beta.vercel.app/api/horario", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const dataHorario = await resHorario.json();

      const newSchedule = {};
      dataHorario.forEach(item => {
        const hour = item.horas.rango;
        if (!newSchedule[hour]) newSchedule[hour] = {};
        newSchedule[hour][item.dia] = item.materias?.nombre || "";
      });
      setSchedule(newSchedule);
    };

    loadData();
  }, [token]);

  // 📌 editar materia
  const handleEdit = (hour, day) => {
    setSelected({ hour, day });
    setInputValue(schedule[hour]?.[day] || '');
    setIsModalOpen(true);
  };

  // 📌 guardar materia en backend
  const handleSave = async () => {
    try {
      const horaObj = hoursList.find(h => h.rango === selected.hour);

      // crear materia
      const materiaRes = await fetch("https://backtask-beta.vercel.app/api/materias", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ nombre: inputValue })
      });
      const materia = await materiaRes.json();

      // asignar en horario
      await fetch("https://backtask-beta.vercel.app/api/horario", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          dia: selected.day,
          hora_id: horaObj.id,
          materia_id: materia.id
        })
      });

      // actualizar frontend
      setSchedule(prev => ({
        ...prev,
        [selected.hour]: {
          ...prev[selected.hour],
          [selected.day]: inputValue
        }
      }));

      setIsModalOpen(false);
    } catch (err) {
      console.error("Error guardando materia:", err);
    }
  };

  // 📌 guardar hora editada
  const handleSaveHour = async () => {
    try {
      // guardar nueva hora en backend
      const res = await fetch("https://backtask-beta.vercel.app/api/horas", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ rango: hourInputValue })
      });
      const newHour = await res.json();

      // actualizar frontend
      const newHours = [...hoursList];
      newHours[selectedHourIndex] = newHour;
      setHoursList(newHours);

      setIsHourModalOpen(false);
    } catch (err) {
      console.error("Error guardando hora:", err);
    }
  };

  return (
    <div>
      <h2>Horario de Clases</h2>
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Hora</th>
            {days.map(day => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hoursList.map((hourObj, i) => (
            <tr key={hourObj.id}>
              <td
                style={{ cursor: 'pointer', fontWeight: 'bold' }}
                onClick={() => {
                  setSelectedHourIndex(i);
                  setHourInputValue(hourObj.rango);
                  setIsHourModalOpen(true);
                }}
              >
                {hourObj.rango}
              </td>
              {days.map(day => (
                <td
                  key={`${hourObj.rango}-${day}`}
                  onClick={() => handleEdit(hourObj.rango, day)}
                  style={{ cursor: 'pointer' }}
                >
                  {schedule[hourObj.rango]?.[day] || ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal materias */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Editar materia</h3>
            <p>{selected.day} | {selected.hour}</p>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribe la materia..."
            />
            <div className="modal-buttons">
              <button onClick={handleSave}>Guardar</button>
              <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal horas */}
      {isHourModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Editar hora</h3>
            <input
              type="text"
              value={hourInputValue}
              onChange={(e) => setHourInputValue(e.target.value)}
              placeholder="Ej: 8:00 - 9:00"
            />
            <div className="modal-buttons">
              <button onClick={handleSaveHour}>Guardar</button>
              <button onClick={() => setIsHourModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleTable;
