
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Login() {
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(form.email, form.password);
    if (success) navigate("/dashboard");
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300 opacity-40"
            initial={{ y: "100vh", x: Math.random() * window.innerWidth }}
            animate={{ y: -50 }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            <Heart size={22 + Math.random() * 24} />
          </motion.div>
        ))}
      </div>

      {/* Login Card */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-white/70 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-[28rem] border border-white/40"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
        >
          Welcome Back 💜
        </motion.h1>

        {error && (
          <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
        )}

        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="email"
          name="email"
          placeholder="Email"
          className="border w-full p-4 mb-5 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
          value={form.email}
          onChange={handleChange}
          required
        />
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="password"
          name="password"
          placeholder="Password"
          className="border w-full p-4 mb-6 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
          value={form.password}
          onChange={handleChange}
          required
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white w-full p-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition"
        >
          Login
        </motion.button>

        <p className="text-center text-gray-600 mt-5 text-base">
          New here?{" "}
          <Link
            to="/register"
            className="text-purple-600 font-semibold hover:underline"
          >
            Create an account
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
