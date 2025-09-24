import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import GiftRecommendation from "./pages/GiftRecommendation";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat/>}/>
         <Route path="/gifts" element={<GiftRecommendation />} />
      </Routes>
    </BrowserRouter>
  );
}
