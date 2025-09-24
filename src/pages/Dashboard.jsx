import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardTitle } from "../components/ui/card";
import { Users, Gift, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const navigate = useNavigate();

  // Floating icons
  const floatingIcons = [...Array(10)];

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-br from-pink-50 via-purple-50 to-white overflow-hidden p-6">
      {/* Floating Background Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300 opacity-30"
            initial={{ y: "100vh", x: Math.random() * window.innerWidth }}
            animate={{ y: -50 }}
            transition={{
              duration: 12 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            {i % 2 === 0 ? <Gift size={26 + Math.random() * 22} /> : <Users size={26 + Math.random() * 22} />}
          </motion.div>
        ))}
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl shadow-md hover:bg-white hover:shadow-lg transition text-pink-600 font-semibold"
      >
        Logout
      </button>

      {/* Logo / Icon */}
      <Heart className="relative z-10 w-16 h-16 text-pink-600 mb-4" />

      {/* Heading */}
      <h1 className="relative z-10 text-4xl font-extrabold text-center mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent drop-shadow-md">
        Welcome to Your AI Assistant
      </h1>

      {/* Motivational Quote */}
      <p className="relative z-10 mb-12 text-center text-gray-600 italic max-w-2xl">
        "Empower your decisions and creativity with AI. Whether you need advice or gift ideas, we're here to help you make life easier and more thoughtful."
      </p>

      {/* Options Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* AI Advisor Option */}
        <Card
          className="cursor-pointer bg-white/80 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition p-8 flex flex-col items-center justify-center text-center hover:scale-105 duration-300"
          onClick={() => navigate("/chat")}
        >
          <Users className="w-16 h-16 text-pink-600 mb-4" />
          <CardTitle className="text-xl font-bold text-purple-700">AI Advisor</CardTitle>
          <CardContent className="text-gray-600 mt-2">
            Get personalized guidance, suggestions, or advice from our AI-powered assistant.
          </CardContent>
        </Card>

        {/* Gift Suggestion Option */}
        <Card
          className="cursor-pointer bg-white/80 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition p-8 flex flex-col items-center justify-center text-center hover:scale-105 duration-300"
          onClick={() => navigate("/gifts")}
        >
          <Gift className="w-16 h-16 text-pink-600 mb-4" />
          <CardTitle className="text-xl font-bold text-purple-700">Gift Suggestions</CardTitle>
          <CardContent className="text-gray-600 mt-2">
            Get creative AI-generated gift ideas for any occasion or relationship.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
