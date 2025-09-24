import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-pink-600">❤️ LoveAI</Link>
        <div className="flex space-x-4">
          <Link to="/login">
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg shadow">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
