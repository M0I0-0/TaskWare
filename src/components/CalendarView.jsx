import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../styles/Calendar.css";

const CalendarView = () => {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);

  // ⚡ Token de autenticación
  const token = localStorage.getItem("authToken");

  // 📌 Cargar eventos + tareas desde backend
  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        // Traer eventos del usuario
        const resEventos = await fetch("https://backtask-beta.vercel.app/api/eventos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!resEventos.ok) throw new Error("Error al cargar eventos");
        const eventos = await resEventos.json();

        // Traer tareas del usuario
        const resTareas = await fetch("https://backtask-beta.vercel.app/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!resTareas.ok) throw new Error("Error al cargar tareas");
        const tareas = await resTareas.json();

        // Formatear eventos
        const formattedEventos = (eventos || []).map((e) => ({
          id: e.id,
          title: "🎊 " + e.titulo,
          start: e.fecha_inicio,
          backgroundColor: "#3990ee",
          borderColor: "#3990ee",
          textColor: "#000000ff",
          className: "calendar-event",
          type: "evento",
        }));

        // Formatear tareas
        const formattedTareas = (tareas || []).map((t) => ({
          id: t.id,
          title: "📌 " + t.nombre,
          start: t.fecha,
          backgroundColor: "#6fce87",
          borderColor: "#6fce87",
          textColor: "#000000ff",
          className: "calendar-task",
          type: "tarea",
        }));

        setEvents([...formattedEventos, ...formattedTareas]);

        // Establecer fecha actual
        const date = new Date();
        setCurrentDate(
          date.toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        );
      } catch (err) {
        console.error("Error cargando calendario:", err);
      }
    };

    fetchData();
  }, [token]);

  // 📌 Abrir modal para agregar evento
  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setEventTitle("");
    setShowModal(true);
  };

  // 📌 Abrir modal para eliminar evento
  const handleEventClick = (info) => {
    if (info.event.extendedProps.type === "tarea") {
      setSelectedEvent(info.event);
      setShowDeleteModal(true);
      return;
    }

    setSelectedEvent(info.event);
    setShowDeleteModal(true);
  };

  // 📌 Agregar evento nuevo
  const addEvent = async () => {
    if (!eventTitle.trim()) return;

    try {
      const res = await fetch("https://backtask-beta.vercel.app/api/eventos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          titulo: eventTitle,
          fecha_inicio: selectedDate,
        }),
      });

      if (!res.ok) throw new Error("Error al crear el evento");

      const newEvent = await res.json();

      setEvents((prev) => [
        ...prev,
        {
          id: newEvent.id,
          title: "🎊 " + newEvent.titulo,
          start: newEvent.fecha_inicio,
          backgroundColor: "#3990ee",
          borderColor: "#3990ee",
          textColor: "#000000ff",
          className: "calendar-event",
          type: "evento",
        },
      ]);
      
      setShowModal(false);
      setEventTitle("");
    } catch (error) {
      console.error("Error creando evento:", error);
      alert("Error al crear el evento. Por favor, intenta nuevamente.");
    }
  };

  // 📌 Eliminar evento
  const deleteEvent = async () => {
    if (!selectedEvent) return;

    // Solo permitir eliminar eventos, no tareas
    if (selectedEvent.extendedProps.type === "tarea") {
      alert("Las tareas solo pueden eliminarse desde la sección de tareas.");
      setShowDeleteModal(false);
      return;
    }

    try {
      const res = await fetch(
        `https://backtask-beta.vercel.app/api/eventos/${selectedEvent.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Error al eliminar evento");

      setEvents((prev) => prev.filter((e) => e.id !== selectedEvent.id));
      setShowDeleteModal(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error("Error eliminando evento:", error);
      alert("Error al eliminar el evento. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div className="apple-calendar-container">
      {/* Modal para agregar evento */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Agregar Evento</h3>
            </div>
            <div className="modal-body">
              <p>Fecha: {selectedDate}</p>
              <input
                type="text"
                placeholder="Título del evento"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                className="modal-input"
                onKeyPress={(e) => e.key === 'Enter' && addEvent()}
                autoFocus
              />
            </div>
            <div className="modal-footer">
              <button 
                className="modal-btn modal-btn-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button 
                className="modal-btn modal-btn-confirm"
                onClick={addEvent}
                disabled={!eventTitle.trim()}
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para eliminar evento */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>
                {selectedEvent?.extendedProps.type === "tarea" 
                  ? "Información" 
                  : "Eliminar Evento"}
              </h3>
            </div>
            <div className="modal-body">
              {selectedEvent?.extendedProps.type === "tarea" ? (
                <p>Las tareas solo pueden eliminarse desde la sección de tareas.</p>
              ) : (
                <p>¿Estás seguro de que deseas eliminar el evento "{selectedEvent?.title.replace('🎊 ', '')}"?</p>
              )}
            </div>
            <div className="modal-footer">
              <button 
                className="modal-btn modal-btn-cancel"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancelar
              </button>
              {selectedEvent?.extendedProps.type !== "tarea" && (
                <button 
                  className="modal-btn modal-btn-danger"
                  onClick={deleteEvent}
                >
                  Eliminar
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="calendar-header">
        <h1 className="calendar-title">Calendario</h1>
        <p className="calendar-date">{currentDate}</p>
        <Link to="/Dashboard">
          <button className="back-button">Regresar</button>
        </Link>
      </div>

      <div className="calendar-wrapper">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          ref={calendarRef}
          editable={true}
          selectable={true}
          headerToolbar={{
            left: "today",
            center: "",
            right: "prev,next",
          }}
          height="100%"
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          dayMaxEventRows={3}
          moreLinkClick="week"
          dayHeaderFormat={{ weekday: "short" }}
        />
      </div>

      <div className="calendar-legend">
        <div className="legend-item">
          <span className="legend-color event-color"></span>
          <span>Eventos</span>
        </div>
        <div className="legend-item">
          <span className="legend-color task-color"></span>
          <span>Tareas</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;