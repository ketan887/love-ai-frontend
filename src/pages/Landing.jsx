



import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { Heart, Gift, MessageCircle, CheckCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-white min-h-screen overflow-hidden">
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
            <Heart size={20 + Math.random() * 20} />
          </motion.div>
        ))}
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center pt-32 px-6 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight"
        >
          Make Your Love Life{" "}
          <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Smarter ❤️
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-4 text-lg text-gray-600 max-w-2xl"
        >
          AI-powered relationship assistant that writes romantic texts, suggests cute surprises,
          and keeps your love life fresh and exciting.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="mt-6"
        >
          <Link to="/register">
            <button className="px-8 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90 transition rounded-full text-lg font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-105 duration-200">
              Get Started Free
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 px-6 relative z-10">
        {[
          {
            icon: <Heart className="mx-auto text-pink-500" size={40} />,
            title: "Romantic Texts",
            desc: "AI generates beautiful, heartfelt messages tailored to your relationship.",
          },
          {
            icon: <Gift className="mx-auto text-purple-500" size={40} />,
            title: "Gift Suggestions",
            desc: "Get unique and thoughtful gift recommendations for any occasion.",
          },
          {
            icon: <MessageCircle className="mx-auto text-blue-500" size={40} />,
            title: "AI Conversations",
            desc: "Chat with AI to get instant advice, tips, and personalized relationship guidance.",
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 + i * 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition"
          >
            {feature.icon}
            <h3 className="text-xl font-semibold mt-3">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Pricing Section */}
      <section className="max-w-6xl mx-auto mt-24 px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center text-gray-900"
        >
          Choose Your Plan
        </motion.h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition"
          >
            <h3 className="text-2xl font-bold text-gray-800">Free Plan</h3>
            <p className="text-gray-600 mt-2">Perfect for starters</p>
            <p className="text-4xl font-bold mt-4">
              ₹0<span className="text-lg text-gray-500">/mo</span>
            </p>
            <ul className="mt-6 space-y-3 text-gray-600">
              <li className="flex items-center gap-2">
                <CheckCircle className="text-green-500" size={18} /> 5 AI romantic texts per day
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="text-green-500" size={18} /> Basic gift suggestions
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="text-green-500" size={18} /> Limited AI conversations
              </li>
            </ul>
            <Link to="/register">
              <button className="mt-6 w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition">
                Get Free Plan
              </button>
            </Link>
          </motion.div>

          {/* Paid Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-pink-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white relative overflow-hidden hover:shadow-xl transition"
          >
            <span className="absolute top-3 right-3 bg-white text-pink-600 text-xs font-bold px-3 py-1 rounded-full shadow-md">
              Popular
            </span>
            <h3 className="text-2xl font-bold">Premium Plan</h3>
            <p className="text-pink-100 mt-2">For serious lovers</p>
            <p className="text-4xl font-bold mt-4">
              ₹99<span className="text-lg text-pink-200">/mo</span>
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-2">
                <CheckCircle className="text-white" size={18} /> Unlimited AI romantic texts
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="text-white" size={18} /> Advanced gift ideas
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="text-white" size={18} /> Unlimited AI conversations
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="text-white" size={18} /> Personalized relationship tips
              </li>
            </ul>
            <Link to="/register">
              <button className="mt-6 w-full px-6 py-3 bg-white hover:bg-gray-100 text-pink-600 rounded-lg font-semibold transition">
                Get Premium
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-6xl mx-auto mt-24 px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center text-gray-900"
        >
          Happy Couples 💕
        </motion.h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Aarav & Priya",
              review: "This app brought us closer — daily love messages keep our relationship fun and fresh!",
            },
            {
              name: "Rohan & Ananya",
              review: "Gift suggestions are spot on. My girlfriend was so happy with the surprises!",
            },
            {
              name: "Karan & Meera",
              review: "AI conversations actually helped us solve small relationship problems. Amazing!",
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 + i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition text-center"
            >
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 italic">"{t.review}"</p>
              <h4 className="mt-4 font-semibold text-gray-900">{t.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="flex flex-col items-center justify-center mt-24 pb-20 relative z-10">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-gray-900 text-center"
        >
          Ready to Make Your Relationship Better?
        </motion.h2>
        <Link to="/register">
          <button className="mt-8 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 duration-200">
            Join Free Today
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10 mt-12 relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white">LoveAI</h3>
            <p className="text-gray-400 mt-2">
              Making relationships smarter, happier, and stronger with AI ❤️
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Quick Links</h4>
            <ul className="mt-3 space-y-2">
              <li><Link to="/" className="hover:text-pink-400">Home</Link></li>
              <li><Link to="/register" className="hover:text-pink-400">Register</Link></li>
              <li><Link to="/pricing" className="hover:text-pink-400">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white">Connect</h4>
            <ul className="mt-3 space-y-2">
              <li><a href="https://x.com/KetanLokha30918" rel="noopener noreferrer" target="_blank" className="hover:text-pink-400">Twitter</a></li>
              <li><a href="https://www.instagram.com/ketan_lokhande__/"  rel="noopener noreferrer" target="_blank" className="hover:text-pink-400">Instagram</a></li>
              <li><a href="https://ketan-portfolio-sandy.vercel.app/"   rel="noopener noreferrer" target="_blank" className="hover:text-pink-400">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-500 mt-10 border-t border-gray-700 pt-6">
          © {new Date().getFullYear()} LoveAI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

