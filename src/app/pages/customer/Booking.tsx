import { useState } from "react";
import { useNavigate } from "react-router";
import { TAILORS } from "../../data/mockData";
import { Check, ChevronRight, Calendar, Clock, MapPin, Scissors, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const STEPS = ["Choose Tailor", "Select Date", "Details", "Confirm"];
const TIMES = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];
const SERVICE_TYPES = [
  { id: "consultation", label: "Consultation", desc: "Discuss your design ideas", price: 0, duration: "30 min" },
  { id: "measurement", label: "Measurement", desc: "Taking your measurements", price: 0, duration: "45 min" },
  { id: "fitting", label: "Fitting Session", desc: "Try on in-progress garment", price: 0, duration: "1 hour" },
  { id: "full_order", label: "Full Order", desc: "Complete garment order", price: null, duration: "Varies" },
];

const DATES = Array.from({ length: 10 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i + 1);
  return d;
});

export function Booking() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedTailor, setSelectedTailor] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const tailor = TAILORS.find(t => t.id === selectedTailor);
  const service = SERVICE_TYPES.find(s => s.id === selectedService);

  const canNext = () => {
    if (step === 0) return !!selectedTailor;
    if (step === 1) return !!selectedDate && !!selectedTime && !!selectedService;
    if (step === 2) return true;
    return false;
  };

  const handleConfirm = () => {
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-[#FAF3E0] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <Check size={48} className="text-green-600" />
          </div>
          <h2 className="font-bold text-2xl text-gray-800 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-500 mb-2">Your appointment has been sent to</p>
          <p className="font-semibold text-[#E2725B]">{tailor?.name}</p>
          <div className="bg-white rounded-2xl shadow-sm p-4 mt-6 text-left space-y-2">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-[#E2725B]" />
              <span className="text-sm text-gray-700">{selectedDate?.toLocaleDateString("en-PH", { weekday: "long", month: "long", day: "numeric" })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-[#E2725B]" />
              <span className="text-sm text-gray-700">{selectedTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Scissors size={16} className="text-[#E2725B]" />
              <span className="text-sm text-gray-700">{service?.label}</span>
            </div>
          </div>
          <button
            onClick={() => navigate("/customer/projects")}
            className="w-full mt-6 py-4 rounded-2xl text-white font-semibold shadow-lg"
            style={{ background: "linear-gradient(135deg, #E2725B, #C4566E)" }}
          >
            View My Projects
          </button>
          <button onClick={() => navigate("/customer/home")} className="mt-3 text-gray-500 text-sm">Back to Home</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-6">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
              i < step ? "bg-green-500 text-white" :
              i === step ? "bg-[#E2725B] text-white" :
              "bg-gray-200 text-gray-400"
            }`}>
              {i < step ? <Check size={14} /> : i + 1}
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 ${i < step ? "bg-green-500" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 0: Choose Tailor */}
        {step === 0 && (
          <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="font-bold text-xl text-gray-800 mb-1">Choose a Tailor</h2>
            <p className="text-gray-500 text-sm mb-4">Select the tailor you'd like to book</p>
            <div className="space-y-3">
              {TAILORS.map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTailor(t.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl border-2 transition-all text-left ${
                    selectedTailor === t.id ? "border-[#E2725B] bg-[#FEF0ED]" : "border-transparent bg-white shadow-sm"
                  }`}
                >
                  <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-xl object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-800">{t.name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${t.available ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {t.available ? "Available" : "Busy"}
                      </span>
                    </div>
                    <p className="text-xs text-[#E2725B] font-medium">{t.specialty}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        ⭐ {t.rating}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin size={11} /> {t.location.split(",")[0]}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-gray-700 mt-1">{t.price}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${selectedTailor === t.id ? "bg-[#E2725B] border-[#E2725B]" : "border-gray-300"}`}>
                    {selectedTailor === t.id && <Check size={12} className="text-white m-auto mt-0.5" />}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 1: Date & Service */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <div>
              <h2 className="font-bold text-xl text-gray-800 mb-1">Select Date & Time</h2>
              <p className="text-gray-500 text-sm mb-3">Pick your preferred schedule</p>

              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                {DATES.map((date, i) => {
                  const isSelected = selectedDate?.toDateString() === date.toDateString();
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(date)}
                      className={`flex-shrink-0 flex flex-col items-center px-4 py-3 rounded-2xl transition-all ${
                        isSelected ? "text-white shadow-md" : "bg-white text-gray-700 shadow-sm"
                      }`}
                      style={isSelected ? { background: "#E2725B" } : {}}
                    >
                      <span className="text-xs uppercase">{date.toLocaleDateString("en", { weekday: "short" })}</span>
                      <span className="font-bold text-lg">{date.getDate()}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Time Slot</h3>
              <div className="grid grid-cols-3 gap-2">
                {TIMES.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                      selectedTime === time ? "text-white" : "bg-white text-gray-600 shadow-sm"
                    }`}
                    style={selectedTime === time ? { background: "#E2725B" } : {}}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Service Type</h3>
              <div className="space-y-2">
                {SERVICE_TYPES.map(service => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all ${
                      selectedService === service.id ? "border-2 border-[#E2725B] bg-[#FEF0ED]" : "bg-white shadow-sm"
                    }`}
                  >
                    <div>
                      <p className="font-medium text-sm text-gray-800">{service.label}</p>
                      <p className="text-xs text-gray-500">{service.desc}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{service.duration}</p>
                      <p className="text-xs font-semibold text-[#E2725B]">{service.price === 0 ? "Free" : "Quote basis"}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="font-bold text-xl text-gray-800 mb-1">Garment Details</h2>
            <p className="text-gray-500 text-sm mb-4">Describe what you need made</p>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">What do you need?</label>
                <select className="w-full p-3 rounded-2xl bg-white border border-gray-100 shadow-sm text-sm focus:outline-none">
                  <option>Wedding Gown</option>
                  <option>Barong Tagalog</option>
                  <option>Terno / Filipiniana</option>
                  <option>Suit</option>
                  <option>Casual Dress</option>
                  <option>Alterations</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Design Notes</label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Describe your design, preferred colors, special requests..."
                  rows={4}
                  className="w-full p-3 rounded-2xl bg-white border border-gray-100 shadow-sm text-sm focus:outline-none resize-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Budget Range</label>
                <select className="w-full p-3 rounded-2xl bg-white border border-gray-100 shadow-sm text-sm focus:outline-none">
                  <option>₱500 – ₱2,000</option>
                  <option>₱2,000 – ₱5,000</option>
                  <option>₱5,000 – ₱15,000</option>
                  <option>₱15,000+</option>
                  <option>Let tailor quote</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="font-bold text-xl text-gray-800 mb-1">Confirm Booking</h2>
            <p className="text-gray-500 text-sm mb-4">Review your booking details</p>

            <div className="bg-white rounded-2xl shadow-sm p-4 space-y-4">
              {/* Tailor */}
              {tailor && (
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <img src={tailor.avatar} alt={tailor.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <p className="font-semibold text-gray-800">{tailor.name}</p>
                    <p className="text-xs text-[#E2725B]">{tailor.specialty}</p>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FEF0ED] flex items-center justify-center">
                    <Calendar size={16} className="text-[#E2725B]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="text-sm font-medium text-gray-800">{selectedDate?.toLocaleDateString("en-PH", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FEF0ED] flex items-center justify-center">
                    <Clock size={16} className="text-[#E2725B]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="text-sm font-medium text-gray-800">{selectedTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FEF0ED] flex items-center justify-center">
                    <Scissors size={16} className="text-[#E2725B]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Service</p>
                    <p className="text-sm font-medium text-gray-800">{service?.label}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FEF0ED] flex items-center justify-center">
                    <MapPin size={16} className="text-[#E2725B]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm font-medium text-gray-800">{tailor?.location}</p>
                  </div>
                </div>
              </div>

              {notes && (
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Notes</p>
                  <p className="text-sm text-gray-700">{notes}</p>
                </div>
              )}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 mt-4">
              <p className="text-xs text-amber-700">💡 The tailor will confirm your booking within 24 hours. You'll receive a notification once confirmed.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-3 mt-6">
        {step > 0 && (
          <button
            onClick={() => setStep(s => s - 1)}
            className="flex-1 py-3.5 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold"
          >
            Back
          </button>
        )}
        {step < 3 ? (
          <button
            onClick={() => setStep(s => s + 1)}
            disabled={!canNext()}
            className="flex-1 py-3.5 rounded-2xl text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            style={{ background: "linear-gradient(135deg, #E2725B, #C4566E)" }}
          >
            Continue <ChevronRight size={18} />
          </button>
        ) : (
          <button
            onClick={handleConfirm}
            className="flex-1 py-3.5 rounded-2xl text-white font-semibold flex items-center justify-center gap-2 shadow-lg"
            style={{ background: "linear-gradient(135deg, #E2725B, #C4566E)" }}
          >
            <Check size={18} /> Confirm Booking
          </button>
        )}
      </div>
    </div>
  );
}
