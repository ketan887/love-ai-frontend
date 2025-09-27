
// import { useState, useEffect, useRef } from "react";
// import API from "../api/axios";
// import { motion } from "framer-motion";
// import { Heart, Send, Plus, Menu } from "lucide-react";

// export default function Chat() {
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);
//   const [conversations, setConversations] = useState([]);
//   const [activeConversation, setActiveConversation] = useState(null);
//   const [mode, setMode] = useState("romantic");
//   const [typing, setTyping] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const chatEndRef = useRef(null);

//   // 🔹 Fetch conversations list
//   useEffect(() => {
//     const fetchConversations = async () => {
//       try {
//         const res = await API.get("/chat/conversations");
//         setConversations(res.data.conversations || []);
//       } catch (err) {
//         console.error("⚠️ Error fetching conversations:", err);
//       }
//     };
//     fetchConversations();
//   }, []);

//   // 🔹 Load conversation messages
//   const loadConversation = async (id) => {
//     try {
//       const res = await API.get(`/chat/conversation/${id}`);
//       const history = res.data.messages || []; // ✅ use messages
//       const mapped = history.map((h) => ({
//         user: h.sender === "user" ? h.message : "",
//         ai: h.sender === "ai" ? h.message : "",
//         timestamp: h.createdAt || h.timestamp,
//       }));
//       setChat(mapped);
//       setActiveConversation(id);
//     } catch (err) {
//       console.error("⚠️ Error loading conversation", err);
//     }
//   };

//   // 🔹 Start new conversation
//   const startNewConversation = async () => {
//     try {
//       const res = await API.post("/chat/start", {
//         title: `Conversation ${new Date().toLocaleTimeString()}`,
//       });
//       const newConv = res.data.conversation;
//       setConversations((prev) => [newConv, ...prev]);
//       setActiveConversation(newConv._id);
//       setChat([]);
//     } catch (err) {
//       console.error("⚠️ Error starting new conversation", err);
//     }
//   };

//   // 🔹 Auto scroll to bottom
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chat, typing]);

//   const sendMessage = async () => {
//     if (!message.trim() || !activeConversation) return;

//     const newChat = [...chat, { user: message, ai: "", timestamp: new Date() }];
//     setChat(newChat);
//     setTyping(true);

//     try {
//       const res = await API.post("/ai/advice", {
//         message,
//         mode,
//         conversationId: activeConversation,
//         history: chat,
//       });

//       const reply = res.data.reply || "Hmm, I’m not sure right now 🥺";

//       let i = 0;
//       const interval = setInterval(() => {
//         if (i < reply.length) {
//           setChat((prev) => {
//             const updated = [...newChat];
//             updated[updated.length - 1].ai = reply.slice(0, i + 1);
//             return updated;
//           });
//           i++;
//         } else {
//           clearInterval(interval);
//           setTyping(false);

//           // 🔹 Save both messages
//           API.post("/chat/save", {
//             conversationId: activeConversation,
//             sender: "user",
//             message,
//           }).catch((err) => console.error("⚠️ Save user error:", err));

//           API.post("/chat/save", {
//             conversationId: activeConversation,
//             sender: "ai",
//             message: reply,
//           }).catch((err) => console.error("⚠️ Save AI error:", err));
//         }
//       }, 25);
//     } catch (err) {
//       console.error(err);
//       setTyping(false);
//     }

//     setMessage("");
//   };

//   const modes = [
//     { value: "romantic", label: "🥰 Romantic" },
//     { value: "flirty", label: "😎 Flirty" },
//     { value: "funny", label: "😂 Funny" },
//     { value: "caring", label: "🫂 Caring" },
//   ];

//   return (
//     <div className="relative h-screen w-screen flex bg-gradient-to-br from-pink-50 via-purple-50 to-white overflow-hidden">
//       {/* Floating Hearts */}
//       <div className="absolute inset-0 pointer-events-none">
//         {[...Array(12)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute text-pink-300 opacity-40"
//             initial={{ y: "100vh", x: Math.random() * window.innerWidth }}
//             animate={{ y: -50 }}
//             transition={{
//               duration: 10 + Math.random() * 10,
//               repeat: Infinity,
//               delay: Math.random() * 5,
//             }}
//           >
//             <Heart size={22 + Math.random() * 24} />
//           </motion.div>
//         ))}
//       </div>

//       {/* Sidebar */}
//       {sidebarOpen && (
//         <div className="w-64 bg-white/80 backdrop-blur-md shadow-lg z-20 flex flex-col">
//           <div className="flex items-center justify-between p-4 border-b">
//             <h2 className="text-lg font-bold text-pink-700">Conversations</h2>
//             <button
//               onClick={() => setSidebarOpen(false)}
//               className="text-gray-500 hover:text-pink-600"
//             >
//               ✖
//             </button>
//           </div>
//           <button
//             onClick={startNewConversation}
//             className="m-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md"
//           >
//             <Plus size={18} /> New Chat
//           </button>
//           <div className="flex-1 overflow-y-auto px-2">
//             {conversations.map((c) => (
//               <div
//                 key={c._id}
//                 className={`p-2 hover:bg-gray-100 rounded cursor-pointer ${
//                   activeConversation === c._id ? "bg-pink-100" : ""
//                 }`}
//                 onClick={() => loadConversation(c._id)}
//               >
//                 <h3 className="font-semibold text-sm">{c.title}</h3>
//                 <p className="text-xs text-gray-500 truncate">
//                   {c.lastMessage || "No messages yet"}
//                 </p>
//                 <p className="text-xs text-gray-400">
//                   {c.lastTime ? new Date(c.lastTime).toLocaleString() : ""}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Main Chat Area */}
//       <div className="flex-1 relative z-10 flex flex-col">
//         {/* Header */}
//         <div className="px-6 py-6 bg-white/60 backdrop-blur-md shadow-md flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             {!sidebarOpen && (
//               <button
//                 onClick={() => setSidebarOpen(true)}
//                 className="p-2 bg-pink-100 rounded-full text-pink-700 shadow-md"
//               >
//                 <Menu size={20} />
//               </button>
//             )}
//             <h1 className="text-2xl font-extrabold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent drop-shadow-md">
//               💌 AI Relationship Advisor
//             </h1>
//           </div>
//           <div className="flex gap-2">
//             {modes.map((m) => (
//               <button
//                 key={m.value}
//                 onClick={() => setMode(m.value)}
//                 className={`px-3 py-1 rounded-full text-sm font-medium transition ${
//                   mode === m.value
//                     ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md"
//                     : "bg-white/70 text-gray-700 hover:bg-pink-100"
//                 }`}
//               >
//                 {m.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-transparent">
//           {chat.map((c, i) => (
//             <div key={i} className="flex flex-col">
//               {c.user && (
//                 <div className="self-end max-w-[70%] text-right">
//                   <span className="block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-2xl shadow-md text-lg">
//                     {c.user}
//                   </span>
//                   <p className="text-xs text-gray-400 mt-1">
//                     {new Date(c.timestamp).toLocaleTimeString()}
//                   </p>
//                 </div>
//               )}
//               {c.ai && (
//                 <div className="self-start max-w-[70%] mt-2">
//                   <span className="block bg-white/80 backdrop-blur-md text-pink-700 px-4 py-2 rounded-2xl shadow-md text-lg">
//                     {c.ai}
//                   </span>
//                   <p className="text-xs text-gray-400 mt-1">
//                     {new Date(c.timestamp).toLocaleTimeString()}
//                   </p>
//                 </div>
//               )}
//             </div>
//           ))}
//           {typing && (
//             <p className="italic text-gray-500 text-sm">AI is typing...</p>
//           )}
//           <div ref={chatEndRef} />
//         </div>

//         {/* Input */}
//         <div className="relative z-10 px-6 py-4 bg-white/40 backdrop-blur-xl shadow-lg">
//           <div className="flex items-center bg-pink-100/60 backdrop-blur-md rounded-full px-4 py-2 shadow-md border border-pink-200/50">
//             <input
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Type a message..."
//               className="flex-1 bg-transparent border-none focus:outline-none text-lg px-2 placeholder-pink-400 text-pink-700"
//             />
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={sendMessage}
//               className="ml-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white p-3 rounded-full shadow-md hover:shadow-lg transition flex items-center justify-center"
//             >
//               <Send size={20} />
//             </motion.button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





// import { useState, useEffect, useRef } from "react";
// import API from "../api/axios";
// import { motion } from "framer-motion";
// import { Heart, Send, Plus, Menu } from "lucide-react";

// export default function Chat() {
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);
//   const [conversations, setConversations] = useState([]);
//   const [activeConversation, setActiveConversation] = useState(null);
//   const [mode, setMode] = useState("romantic");
//   const [typing, setTyping] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false); // mobile closed by default

//   const chatEndRef = useRef(null);

//   // Fetch conversations
//   useEffect(() => {
//     const fetchConversations = async () => {
//       try {
//         const res = await API.get("/chat/conversations");
//         setConversations(res.data.conversations || []);
//       } catch (err) {
//         console.error("Error fetching conversations:", err);
//       }
//     };
//     fetchConversations();
//   }, []);

//   // Load conversation messages
//   const loadConversation = async (id) => {
//     try {
//       const res = await API.get(`/chat/conversation/${id}`);
//       const history = res.data.messages || [];
//       const mapped = history.map((h) => ({
//         user: h.sender === "user" ? h.message : "",
//         ai: h.sender === "ai" ? h.message : "",
//         timestamp: h.createdAt || h.timestamp,
//       }));
//       setChat(mapped);
//       setActiveConversation(id);
//       if (window.innerWidth < 768) setSidebarOpen(false); // close sidebar on mobile
//     } catch (err) {
//       console.error("Error loading conversation", err);
//     }
//   };

//   // Start new conversation
//   const startNewConversation = async () => {
//     try {
//       const res = await API.post("/chat/start", {
//         title: `Conversation ${new Date().toLocaleTimeString()}`,
//       });
//       const newConv = res.data.conversation;
//       setConversations((prev) => [newConv, ...prev]);
//       setActiveConversation(newConv._id);
//       setChat([]);
//       if (window.innerWidth < 768) setSidebarOpen(false);
//     } catch (err) {
//       console.error("Error starting new conversation", err);
//     }
//   };

//   // Auto scroll
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chat, typing]);

//   const sendMessage = async () => {
//     if (!message.trim() || !activeConversation) return;

//     const newChat = [...chat, { user: message, ai: "", timestamp: new Date() }];
//     setChat(newChat);
//     setTyping(true);

//     try {
//       const res = await API.post("/ai/advice", {
//         message,
//         mode,
//         conversationId: activeConversation,
//         history: chat,
//       });

//       const reply = res.data.reply || "Hmm, I’m not sure right now 🥺";

//       let i = 0;
//       const interval = setInterval(() => {
//         if (i < reply.length) {
//           setChat((prev) => {
//             const updated = [...newChat];
//             updated[updated.length - 1].ai = reply.slice(0, i + 1);
//             return updated;
//           });
//           i++;
//         } else {
//           clearInterval(interval);
//           setTyping(false);

//           // Save messages
//           API.post("/chat/save", {
//             conversationId: activeConversation,
//             sender: "user",
//             message,
//           }).catch(console.error);

//           API.post("/chat/save", {
//             conversationId: activeConversation,
//             sender: "ai",
//             message: reply,
//           }).catch(console.error);
//         }
//       }, 25);
//     } catch (err) {
//       console.error(err);
//       setTyping(false);
//     }

//     setMessage("");
//   };

//   const modes = [
//     { value: "romantic", label: "🥰 Romantic" },
//     { value: "flirty", label: "😎 Flirty" },
//     { value: "funny", label: "😂 Funny" },
//     { value: "caring", label: "🫂 Caring" },
//   ];

//   return (
//     <div className="relative h-screen w-screen flex flex-col md:flex-row bg-gradient-to-br from-pink-50 via-purple-50 to-white overflow-hidden">
//       {/* Floating Hearts */}
//       <div className="absolute inset-0 pointer-events-none">
//         {[...Array(12)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute text-pink-300 opacity-40"
//             initial={{ y: "100vh", x: Math.random() * window.innerWidth }}
//             animate={{ y: -50 }}
//             transition={{
//               duration: 10 + Math.random() * 10,
//               repeat: Infinity,
//               delay: Math.random() * 5,
//             }}
//           >
//             <Heart size={22 + Math.random() * 24} />
//           </motion.div>
//         ))}
//       </div>

//       {/* Sidebar */}
//       <div
//         className={`fixed md:relative z-30 h-full w-64 bg-white/80 backdrop-blur-md shadow-lg flex flex-col transform transition-transform duration-300 ease-in-out ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
//         }`}
//       >
//         <div className="flex items-center justify-between p-4 border-b">
//           <h2 className="text-lg font-bold text-pink-700">Conversations</h2>
//           <button
//             onClick={() => setSidebarOpen(false)}
//             className="text-gray-500 hover:text-pink-600 md:hidden"
//           >
//             ✖
//           </button>
//         </div>
//         <button
//           onClick={startNewConversation}
//           className="m-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md"
//         >
//           <Plus size={18} /> New Chat
//         </button>
//         <div className="flex-1 overflow-y-auto px-2">
//           {conversations.map((c) => (
//             <div
//               key={c._id}
//               className={`p-2 hover:bg-gray-100 rounded cursor-pointer ${
//                 activeConversation === c._id ? "bg-pink-100" : ""
//               }`}
//               onClick={() => loadConversation(c._id)}
//             >
//               <h3 className="font-semibold text-sm">{c.title}</h3>
//               <p className="text-xs text-gray-500 truncate">
//                 {c.lastMessage || "No messages yet"}
//               </p>
//               <p className="text-xs text-gray-400">
//                 {c.lastTime ? new Date(c.lastTime).toLocaleString() : ""}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main Chat */}
//       <div className="flex-1 flex flex-col relative z-10 md:ml-64">
//         {/* Header */}
//         <div className="px-6 py-6 bg-white/60 backdrop-blur-md shadow-md flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             {!sidebarOpen && (
//               <button
//                 onClick={() => setSidebarOpen(true)}
//                 className="p-2 bg-pink-100 rounded-full text-pink-700 shadow-md md:hidden"
//               >
//                 <Menu size={20} />
//               </button>
//             )}
//             <h1 className="text-2xl font-extrabold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent drop-shadow-md">
//               💌 AI Relationship Advisor
//             </h1>
//           </div>
//           <div className="flex gap-2 flex-wrap">
//             {modes.map((m) => (
//               <button
//                 key={m.value}
//                 onClick={() => setMode(m.value)}
//                 className={`px-3 py-1 rounded-full text-sm font-medium transition ${
//                   mode === m.value
//                     ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md"
//                     : "bg-white/70 text-gray-700 hover:bg-pink-100"
//                 }`}
//               >
//                 {m.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-transparent">
//           {chat.map((c, i) => (
//             <div key={i} className="flex flex-col">
//               {c.user && (
//                 <div className="self-end max-w-[70%] text-right break-words">
//                   <span className="block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-2xl shadow-md text-lg">
//                     {c.user}
//                   </span>
//                   <p className="text-xs text-gray-400 mt-1">
//                     {new Date(c.timestamp).toLocaleTimeString()}
//                   </p>
//                 </div>
//               )}
//               {c.ai && (
//                 <div className="self-start max-w-[70%] mt-2 break-words">
//                   <span className="block bg-white/80 backdrop-blur-md text-pink-700 px-4 py-2 rounded-2xl shadow-md text-lg">
//                     {c.ai}
//                   </span>
//                   <p className="text-xs text-gray-400 mt-1">
//                     {new Date(c.timestamp).toLocaleTimeString()}
//                   </p>
//                 </div>
//               )}
//             </div>
//           ))}
//           {typing && (
//             <p className="italic text-gray-500 text-sm">AI is typing...</p>
//           )}
//           <div ref={chatEndRef} />
//         </div>

//         {/* Input */}
//         <div className="relative z-10 px-6 py-4 bg-white/40 backdrop-blur-xl shadow-lg">
//           <div className="flex items-center bg-pink-100/60 backdrop-blur-md rounded-full px-4 py-2 shadow-md border border-pink-200/50">
//             <input
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Type a message..."
//               className="flex-1 bg-transparent border-none focus:outline-none text-lg px-2 placeholder-pink-400 text-pink-700"
//             />
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={sendMessage}
//               className="ml-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white p-3 rounded-full shadow-md hover:shadow-lg transition flex items-center justify-center"
//             >
//               <Send size={20} />
//             </motion.button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






// import { useState, useEffect, useRef } from "react";
// import API from "../api/axios";
// import { motion } from "framer-motion";
// import { Heart, Send, Plus, Menu } from "lucide-react";

// export default function Chat() {
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);
//   const [conversations, setConversations] = useState([]);
//   const [activeConversation, setActiveConversation] = useState(null);
//   const [mode, setMode] = useState("romantic");
//   const [typing, setTyping] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const chatEndRef = useRef(null);

//   // Fetch conversations
//   useEffect(() => {
//     const fetchConversations = async () => {
//       try {
//         const res = await API.get("/chat/conversations");
//         setConversations(res.data.conversations || []);
//       } catch (err) {
//         console.error("Error fetching conversations:", err);
//       }
//     };
//     fetchConversations();
//   }, []);

//   // Load conversation messages
//   const loadConversation = async (id) => {
//     try {
//       const res = await API.get(`/chat/conversation/${id}`);
//       const history = res.data.messages || [];
//       const mapped = history.map((h) => ({
//         user: h.sender === "user" ? h.message : "",
//         ai: h.sender === "ai" ? h.message : "",
//         timestamp: h.createdAt || h.timestamp,
//       }));
//       setChat(mapped);
//       setActiveConversation(id);
//       if (window.innerWidth < 768) setSidebarOpen(false);
//     } catch (err) {
//       console.error("Error loading conversation", err);
//     }
//   };

//   // Start new conversation
//   const startNewConversation = async () => {
//     try {
//       const res = await API.post("/chat/start", {
//         title: `Conversation ${new Date().toLocaleTimeString()}`,
//       });
//       const newConv = res.data.conversation;
//       setConversations((prev) => [newConv, ...prev]);
//       setActiveConversation(newConv._id);
//       setChat([]);
//       return newConv._id;
//     } catch (err) {
//       console.error("Error starting new conversation", err);
//     }
//   };

//   // Auto scroll
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chat, typing]);

//   const sendMessage = async () => {
//     if (!message.trim()) return;

//     let conversationId = activeConversation;
//     // ✅ Auto-create conversation if none exists
//     if (!conversationId) {
//       conversationId = await startNewConversation();
//     }

//     const newChat = [...chat, { user: message, ai: "", timestamp: new Date() }];
//     setChat(newChat);
//     setTyping(true);

//     try {
//       const res = await API.post("/ai/advice", {
//         message,
//         mode,
//         conversationId,
//         history: chat,
//       });

//       const reply = res.data.reply || "Hmm, I’m not sure right now 🥺";

//       let i = 0;
//       const interval = setInterval(() => {
//         if (i < reply.length) {
//           setChat((prev) => {
//             const updated = [...newChat];
//             updated[updated.length - 1].ai = reply.slice(0, i + 1);
//             return updated;
//           });
//           i++;
//         } else {
//           clearInterval(interval);
//           setTyping(false);

//           // Save both messages
//           API.post("/chat/save", {
//             conversationId,
//             sender: "user",
//             message,
//           }).catch(console.error);

//           API.post("/chat/save", {
//             conversationId,
//             sender: "ai",
//             message: reply,
//           }).catch(console.error);
//         }
//       }, 25);
//     } catch (err) {
//       console.error(err);
//       setTyping(false);
//     }

//     setMessage("");
//   };

//   const modes = [
//     { value: "romantic", label: "🥰 Romantic" },
//     { value: "flirty", label: "😎 Flirty" },
//     { value: "funny", label: "😂 Funny" },
//     { value: "caring", label: "🫂 Caring" },
//   ];

//   return (
//     <div className="relative h-screen w-screen flex bg-gradient-to-br from-pink-50 via-purple-50 to-white overflow-hidden">
//       {/* Floating Hearts */}
//       <div className="absolute inset-0 pointer-events-none">
//         {[...Array(12)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute text-pink-300 opacity-40"
//             initial={{ y: "100vh", x: Math.random() * window.innerWidth }}
//             animate={{ y: -50 }}
//             transition={{
//               duration: 10 + Math.random() * 10,
//               repeat: Infinity,
//               delay: Math.random() * 5,
//             }}
//           >
//             <Heart size={22 + Math.random() * 24} />
//           </motion.div>
//         ))}
//       </div>

//       {/* Sidebar */}
//       <motion.div
//         animate={{ x: sidebarOpen || window.innerWidth >= 768 ? 0 : -300 }}
//         transition={{ duration: 0.3, ease: "easeInOut" }}
//         className="z-30 h-full w-64 bg-white/80 backdrop-blur-md shadow-lg flex flex-col"
//       >
//         <div className="flex items-center justify-between p-4 border-b">
//           <h2 className="text-lg font-bold text-pink-700">Conversations</h2>
//           <button
//             onClick={() => setSidebarOpen(false)}
//             className="text-gray-500 hover:text-pink-600 md:hidden"
//           >
//             ✖
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto px-2">
//           {conversations.map((c) => (
//             <div
//               key={c._id}
//               className={`p-2 mb-1 hover:bg-pink-50 rounded-lg cursor-pointer shadow-sm transition ${
//                 activeConversation === c._id ? "bg-pink-100 shadow" : ""
//               }`}
//               onClick={() => loadConversation(c._id)}
//             >
//               <h3 className="font-semibold text-sm text-pink-700">{c.title}</h3>
//               <p className="text-xs text-gray-500 truncate">
//                 {c.lastMessage || "No messages yet"}
//               </p>
//               <p className="text-xs text-gray-400">
//                 {c.lastTime ? new Date(c.lastTime).toLocaleString() : ""}
//               </p>
//             </div>
//           ))}
//         </div>
//       </motion.div>

//       {/* Main Chat */}
//       <div className="flex-1 flex flex-col relative z-10">
//         {/* Header */}
//         <div className="px-6 py-6 bg-white/60 backdrop-blur-md shadow-md flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="p-2 bg-pink-100 rounded-full text-pink-700 shadow-md md:hidden"
//             >
//               <Menu size={20} />
//             </button>
//             <h1 className="text-2xl font-extrabold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent drop-shadow-md">
//               💌 AI Relationship Advisor
//             </h1>
//           </div>
//           <div className="flex gap-2 flex-wrap">
//             {modes.map((m) => (
//               <button
//                 key={m.value}
//                 onClick={() => setMode(m.value)}
//                 className={`px-3 py-1 rounded-full text-sm font-medium transition ${
//                   mode === m.value
//                     ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md"
//                     : "bg-white/70 text-gray-700 hover:bg-pink-100"
//                 }`}
//               >
//                 {m.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-transparent">
//           {chat.map((c, i) => (
//             <div key={i} className="flex flex-col">
//               {c.user && (
//                 <div className="self-end max-w-[70%] text-right break-words">
//                   <span className="block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-2xl shadow-md text-lg">
//                     {c.user}
//                   </span>
//                   <p className="text-xs text-gray-400 mt-1">
//                     {new Date(c.timestamp).toLocaleTimeString()}
//                   </p>
//                 </div>
//               )}
//               {c.ai && (
//                 <div className="self-start max-w-[70%] mt-2 break-words">
//                   <span className="block bg-white/80 backdrop-blur-md text-pink-700 px-4 py-2 rounded-2xl shadow-md text-lg">
//                     {c.ai}
//                   </span>
//                   <p className="text-xs text-gray-400 mt-1">
//                     {new Date(c.timestamp).toLocaleTimeString()}
//                   </p>
//                 </div>
//               )}
//             </div>
//           ))}
//           {typing && (
//             <p className="italic text-gray-500 text-sm">AI is typing...</p>
//           )}
//           <div ref={chatEndRef} />
//         </div>

//         {/* Input */}
//         <div className="relative z-10 px-6 py-4 bg-white/40 backdrop-blur-xl shadow-lg">
//           <div className="flex items-center bg-pink-100/60 backdrop-blur-md rounded-full px-4 py-2 shadow-md border border-pink-200/50">
//             <input
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Type a message..."
//               className="flex-1 bg-transparent border-none focus:outline-none text-lg px-2 placeholder-pink-400 text-pink-700"
//             />
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={sendMessage}
//               className="ml-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white p-3 rounded-full shadow-md hover:shadow-lg transition flex items-center justify-center"
//             >
//               <Send size={20} />
//             </motion.button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }











import { useState, useEffect, useRef } from "react";
import API from "../api/axios";
import { motion } from "framer-motion";
import { Heart, Send, Menu } from "lucide-react";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [mode, setMode] = useState("romantic");
  const [typing, setTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await API.get("/chat/conversations");
        setConversations(res.data.conversations || []);
      } catch (err) {
        console.error("Error fetching conversations:", err);
      }
    };
    fetchConversations();
  }, []);

  const loadConversation = async (id) => {
    try {
      const res = await API.get(`/chat/conversation/${id}`);
      const history = res.data.messages || [];
      const mapped = history.map((h) => ({
        user: h.sender === "user" ? h.message : "",
        ai: h.sender === "ai" ? h.message : "",
        timestamp: h.createdAt || h.timestamp,
      }));
      setChat(mapped);
      setActiveConversation(id);
      if (window.innerWidth < 768) setSidebarOpen(false);
    } catch (err) {
      console.error("Error loading conversation", err);
    }
  };

  const startNewConversation = async () => {
    try {
      const res = await API.post("/chat/start", {
        title: `Conversation ${new Date().toLocaleTimeString()}`,
      });
      const newConv = res.data.conversation;
      setConversations((prev) => [newConv, ...prev]);
      setActiveConversation(newConv._id);
      setChat([]);
      return newConv._id;
    } catch (err) {
      console.error("Error starting new conversation", err);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, typing]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    let conversationId = activeConversation;
    if (!conversationId) {
      conversationId = await startNewConversation();
    }

    const newChat = [...chat, { user: message, ai: "", timestamp: new Date() }];
    setChat(newChat);
    setTyping(true);

    try {
      const res = await API.post("/ai/advice", {
        message,
        mode,
        conversationId,
        history: chat,
      });

      const reply = res.data.reply || "Hmm, I’m not sure right now 🥺";

      let i = 0;
      const interval = setInterval(() => {
        if (i < reply.length) {
          setChat((prev) => {
            const updated = [...newChat];
            updated[updated.length - 1].ai = reply.slice(0, i + 1);
            return updated;
          });
          i++;
        } else {
          clearInterval(interval);
          setTyping(false);

          API.post("/chat/save", { conversationId, sender: "user", message });
          API.post("/chat/save", { conversationId, sender: "ai", message: reply });
        }
      }, 25);
    } catch (err) {
      console.error(err);
      setTyping(false);
    }

    setMessage("");
  };

  const modes = [
    { value: "romantic", label: "🥰 Romantic" },
    { value: "flirty", label: "😎 Flirty" },
    { value: "funny", label: "😂 Funny" },
    { value: "caring", label: "🫂 Caring" },
  ];

  return (
    <div className="relative h-screen w-screen flex bg-gradient-to-br from-pink-50 via-purple-50 to-white overflow-hidden">
      {/* Floating Hearts */}
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

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        animate={{ x: sidebarOpen || window.innerWidth >= 768 ? 0 : -300 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed md:relative z-30 h-full w-64 bg-white/80 backdrop-blur-md shadow-lg flex flex-col"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold text-pink-700">Conversations</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-500 hover:text-pink-600 md:hidden"
          >
            ✖
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-2">
          {conversations.map((c) => (
            <div
              key={c._id}
              className={`p-2 mb-1 hover:bg-pink-50 rounded-lg cursor-pointer shadow-sm transition ${
                activeConversation === c._id ? "bg-pink-100 shadow" : ""
              }`}
              onClick={() => loadConversation(c._id)}
            >
              <h3 className="font-semibold text-sm text-pink-700">{c.title}</h3>
              <p className="text-xs text-gray-500 truncate">
                {c.lastMessage || "No messages yet"}
              </p>
              <p className="text-xs text-gray-400">
                {c.lastTime ? new Date(c.lastTime).toLocaleString() : ""}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Header */}
        <div className="px-4 py-4 md:px-6 md:py-6 bg-white/60 backdrop-blur-md shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 bg-pink-100 rounded-full text-pink-700 shadow-md md:hidden"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg md:text-2xl font-extrabold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent drop-shadow-md">
              💌 AI Relationship Advisor
            </h1>
          </div>
          <div className="flex gap-2 flex-wrap justify-end">
            {modes.map((m) => (
              <button
                key={m.value}
                onClick={() => setMode(m.value)}
                className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium transition ${
                  mode === m.value
                    ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md"
                    : "bg-white/70 text-gray-700 hover:bg-pink-100"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 md:px-6 py-4 space-y-4 bg-transparent">
          {chat.map((c, i) => (
            <div key={i} className="flex flex-col">
              {c.user && (
                <div className="self-end max-w-[80%] text-right break-words">
                  <span className="block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 md:px-4 py-2 rounded-2xl shadow-md text-sm md:text-lg">
                    {c.user}
                  </span>
                  <p className="text-[10px] md:text-xs text-gray-400 mt-1">
                    {new Date(c.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              )}
              {c.ai && (
                <div className="self-start max-w-[80%] mt-2 break-words">
                  <span className="block bg-white/80 backdrop-blur-md text-pink-700 px-3 md:px-4 py-2 rounded-2xl shadow-md text-sm md:text-lg">
                    {c.ai}
                  </span>
                  <p className="text-[10px] md:text-xs text-gray-400 mt-1">
                    {new Date(c.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              )}
            </div>
          ))}
          {typing && (
            <p className="italic text-gray-500 text-sm">AI is typing...</p>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="relative z-10 px-3 md:px-6 py-3 md:py-4 bg-white/40 backdrop-blur-xl shadow-lg">
          <div className="flex items-center bg-pink-100/60 backdrop-blur-md rounded-full px-3 md:px-4 py-2 shadow-md border border-pink-200/50">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-transparent border-none focus:outline-none text-sm md:text-lg px-2 placeholder-pink-400 text-pink-700"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={sendMessage}
              className="ml-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white p-2 md:p-3 rounded-full shadow-md hover:shadow-lg transition flex items-center justify-center"
            >
              <Send size={18} className="md:w-5 md:h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}




