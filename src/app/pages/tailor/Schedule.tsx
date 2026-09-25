import { useState } from "react";
import { SCHEDULE_EVENTS } from "../../data/mockData";
import { Clock, Plus, Calendar, User, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

const EVENT_TYPES: Record<string, { color: string; bg: string }> = {
  Measurement: { color: "#E2725B", bg: "#FEF0ED" },
  Fitting: { color: "#2A9D8F", bg: "#E8F5F4" },
  Consultation: { color: "#F4A261", bg: "#FFF3E8" },
  "Fitting #2": { color: "#2A9D8F", bg: "#E8F5F4" },
  "Pick-up": { color: "#9B59B6", bg: "#F3E8FF" },
};

export function Schedule() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [showAddModal, setShowAddModal] = useState(false);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const monthName = new Date(currentYear, currentMonth).toLocaleDateString("en", { month: "long", year: "numeric" });

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  // Mock events for specific dates
  const eventsForDate = (day: number) => {
    // Show events on 16, 17, 18, 19
    const eventDays: Record<number, number> = { 16: 2, 17: 1, 18: 1, 19: 1 };
    return eventDays[day] || 0;
  };

  const selectedEvents = SCHEDULE_EVENTS.filter(e => {
    const d = new Date(e.date);
    return d.getDate() === selectedDate;
  });

  return (
    <div className="px-4 py-4">
      {/* Calendar */}
      <div className="bg-white rounded-3xl shadow-sm p-4 mb-4">
        {/* Month Nav */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <ChevronLeft size={16} className="text-gray-600" />
          </button>
          <h3 className="font-semibold text-gray-800">{monthName}</h3>
          <button onClick={nextMonth} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <ChevronRight size={16} className="text-gray-600" />
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 mb-2">
          {DAYS.map(d => (
            <div key={d} className="text-center text-xs text-gray-400 font-medium py-1">{d}</div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
            const isSelected = day === selectedDate;
            const eventCount = eventsForDate(day);

            return (
              <button
                key={day}
                onClick={() => setSelectedDate(day)}
                className={`flex flex-col items-center py-1.5 rounded-xl transition-all ${
                  isSelected ? "text-white" : isToday ? "text-[#E2725B]" : "text-gray-700"
                }`}
                style={isSelected ? { background: "#2A9D8F" } : isToday ? { background: "#FEF0ED" } : {}}
              >
                <span className="text-sm font-medium">{day}</span>
                {eventCount > 0 && (
                  <div className="flex gap-0.5 mt-0.5">
                    {Array.from({ length: Math.min(eventCount, 3) }).map((_, j) => (
                      <div key={j} className={`w-1 h-1 rounded-full ${isSelected ? "bg-white/70" : "bg-[#E2725B]"}`} />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Events */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">
          April {selectedDate} — {selectedEvents.length > 0 ? `${selectedEvents.length} appointment${selectedEvents.length > 1 ? "s" : ""}` : "No appointments"}
        </h3>
        <button
          onClick={() => setShowAddModal(true)}
          className="w-8 h-8 rounded-full text-white flex items-center justify-center"
          style={{ background: "#2A9D8F" }}
        >
          <Plus size={16} />
        </button>
      </div>

      {selectedEvents.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center text-gray-400">
          <Calendar size={32} className="mx-auto mb-2 text-gray-300" />
          <p className="text-sm">No appointments on this day</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-3 px-4 py-2 rounded-xl text-sm font-medium text-white"
            style={{ background: "#2A9D8F" }}
          >
            Add Appointment
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {selectedEvents.map((event, i) => {
            const conf = EVENT_TYPES[event.type] || EVENT_TYPES.Consultation;
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-sm p-4 flex gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-full" style={{ background: conf.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{ color: conf.color, background: conf.bg }}
                      >
                        {event.type}
                      </span>
                      <div className="flex items-center gap-2 mt-2">
                        <User size={14} className="text-gray-400" />
                        <p className="font-semibold text-sm text-gray-800">{event.client}</p>
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock size={12} /> {event.time}
                        </span>
                        <span className="text-xs text-gray-500">• {event.duration}</span>
                      </div>
                    </div>
                    <button className="text-xs text-[#2A9D8F] font-medium px-2 py-1 rounded-lg bg-[#E8F5F4]">
                      Reschedule
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center" onClick={() => setShowAddModal(false)}>
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="bg-white rounded-t-3xl p-6 w-full max-w-lg"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="font-bold text-lg text-gray-800 mb-4">Add Appointment</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Client Name</label>
                <input type="text" placeholder="Enter client name" className="w-full p-3 rounded-xl bg-gray-50 text-sm focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Type</label>
                  <select className="w-full p-3 rounded-xl bg-gray-50 text-sm focus:outline-none">
                    <option>Consultation</option>
                    <option>Measurement</option>
                    <option>Fitting</option>
                    <option>Pick-up</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Time</label>
                  <select className="w-full p-3 rounded-xl bg-gray-50 text-sm focus:outline-none">
                    <option>9:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>1:00 PM</option>
                    <option>2:00 PM</option>
                    <option>3:00 PM</option>
                  </select>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-full py-3.5 rounded-2xl text-white font-semibold"
                style={{ background: "#2A9D8F" }}
              >
                Add Appointment
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
