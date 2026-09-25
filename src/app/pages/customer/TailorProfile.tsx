import { useParams, useNavigate } from "react-router";
import { TAILORS } from "../../data/mockData";
import { Star, MapPin, CheckCircle, MessageCircle, Calendar, ChevronRight, Award, Clock } from "lucide-react";
import { motion } from "motion/react";

const REVIEWS = [
  { id: "r1", name: "Rachel L.", rating: 5, text: "Amazing work! The gown was exactly what I envisioned.", date: "March 2026", avatar: "https://images.unsplash.com/photo-1694872780969-570e465890e9?w=50&h=50&fit=crop" },
  { id: "r2", name: "Mark V.", rating: 5, text: "Professional and punctual. Highly recommended!", date: "Feb 2026", avatar: "https://images.unsplash.com/photo-1600091106645-2e76e1787372?w=50&h=50&fit=crop" },
  { id: "r3", name: "Sofia G.", rating: 4, text: "Great quality, slight delay but the result was perfect.", date: "Jan 2026", avatar: "https://images.unsplash.com/photo-1742497359527-209679267627?w=50&h=50&fit=crop" },
];

export function TailorProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const tailor = TAILORS.find(t => t.id === id);

  if (!tailor) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        <div className="text-center">
          <p className="text-4xl mb-2">✂️</p>
          <p>Tailor not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-4">
      {/* Cover */}
      <div className="relative h-56">
        <img src={tailor.coverImage} alt={tailor.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Availability Badge */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${tailor.available ? "bg-green-500 text-white" : "bg-gray-500 text-white"}`}>
          {tailor.available ? "✓ Available" : "× Busy"}
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-md p-4">
          <div className="flex items-start gap-3">
            <img src={tailor.avatar} alt={tailor.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow" />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="font-bold text-gray-800 text-xl">{tailor.name}</h1>
                  <p className="text-[#E2725B] text-sm font-medium">{tailor.specialty}</p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-gray-800">{tailor.rating}</span>
                  </div>
                  <span className="text-xs text-gray-400">({tailor.reviews} reviews)</span>
                </div>
              </div>

              <div className="flex items-center gap-1 mt-2">
                <MapPin size={12} className="text-gray-400" />
                <span className="text-xs text-gray-500">{tailor.location}</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-2 mt-3 flex-wrap">
            {tailor.tags.map(tag => (
              <span key={tag} className="text-xs bg-[#FEF0ED] text-[#E2725B] px-3 py-1 rounded-full font-medium">{tag}</span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-100">
            {[
              { value: tailor.completedOrders.toString(), label: "Orders", icon: CheckCircle },
              { value: tailor.reviews.toString(), label: "Reviews", icon: Star },
              { value: "12", label: "Yrs Exp.", icon: Award },
            ].map(stat => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <Icon size={16} className="text-[#E2725B] mx-auto mb-1" />
                  <p className="font-bold text-gray-800">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Price Range */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mt-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Starting Price</p>
            <p className="font-bold text-[#E2725B] text-lg">{tailor.price}</p>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <Clock size={14} />
            <span className="text-xs">3–14 days delivery</span>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mt-3">
          <h3 className="font-semibold text-gray-800 mb-2">About</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{tailor.bio}</p>
        </div>

        {/* Portfolio */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Portfolio</h3>
            <button className="text-sm text-[#E2725B] flex items-center gap-1">See all <ChevronRight size={14} /></button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {tailor.portfolio.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="aspect-square rounded-2xl overflow-hidden"
              >
                <img src={img} alt={`Portfolio ${i + 1}`} className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-4">
          <h3 className="font-semibold text-gray-800 mb-3">Reviews</h3>
          <div className="space-y-3">
            {REVIEWS.map(review => (
              <div key={review.id} className="bg-white rounded-2xl shadow-sm p-4">
                <div className="flex items-start gap-3">
                  <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm text-gray-800">{review.name}</p>
                      <p className="text-xs text-gray-400">{review.date}</p>
                    </div>
                    <div className="flex gap-0.5 my-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={12} className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"} />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">{review.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => navigate("/messages")}
            className="flex-1 py-3.5 rounded-2xl border-2 border-[#E2725B] text-[#E2725B] font-semibold flex items-center justify-center gap-2"
          >
            <MessageCircle size={18} /> Message
          </button>
          <button
            onClick={() => navigate("/customer/booking")}
            className="flex-1 py-3.5 rounded-2xl text-white font-semibold flex items-center justify-center gap-2 shadow-lg"
            style={{ background: "linear-gradient(135deg, #E2725B, #C4566E)" }}
          >
            <Calendar size={18} /> Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
