
// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardHeader, CardContent, CardTitle } from "../components/ui/card"
// import { Loader2, Gift } from "lucide-react"
// import { motion } from "framer-motion"

// export default function GiftRecommendation() {
//   const [relationship, setRelationship] = useState("")
//   const [occasion, setOccasion] = useState("")
//   const [budget, setBudget] = useState("")
//   const [hobbies, setHobbies] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [gifts, setGifts] = useState([])

//   const fetchGifts = async () => {
//     setLoading(true)
//     try {
//       const res = await fetch("http://localhost:5000/api/gifts", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ relationship, occasion, budget, hobbies }),
//       })
//       const data = await res.json()
//       if (data.success) {
//         setGifts(data.data)
//       } else {
//         setGifts([])
//       }
//     } catch (err) {
//       console.error(err)
//     }
//     setLoading(false)
//   }

//   return (
//     <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-br from-pink-50 via-purple-50 to-white overflow-hidden p-6">
//       {/* Floating Background Icons */}
//       <div className="absolute inset-0 pointer-events-none">
//         {[...Array(10)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute text-pink-300 opacity-30"
//             initial={{ y: "100vh", x: Math.random() * window.innerWidth }}
//             animate={{ y: -50 }}
//             transition={{
//               duration: 12 + Math.random() * 10,
//               repeat: Infinity,
//               delay: Math.random() * 5,
//             }}
//           >
//             <Gift size={26 + Math.random() * 22} />
//           </motion.div>
//         ))}
//       </div>

//       {/* Heading */}
//       <h1 className="relative z-10 text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent drop-shadow-md">
//         🎁 AI Gift Suggestion
//       </h1>

//       {/* Input Section */}
//       <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl w-full">
//         <Input
//           placeholder="Relationship (e.g. girlfriend, mom)"
//           value={relationship}
//           onChange={(e) => setRelationship(e.target.value)}
//           className="bg-white/70 backdrop-blur-md shadow-md border-pink-200/50 focus:ring-2 focus:ring-pink-400"
//         />
//         <Input
//           placeholder="Occasion (e.g. birthday, anniversary)"
//           value={occasion}
//           onChange={(e) => setOccasion(e.target.value)}
//           className="bg-white/70 backdrop-blur-md shadow-md border-pink-200/50 focus:ring-2 focus:ring-pink-400"
//         />
//         <Input
//           placeholder="Budget (e.g. ₹1000)"
//           value={budget}
//           onChange={(e) => setBudget(e.target.value)}
//           className="bg-white/70 backdrop-blur-md shadow-md border-pink-200/50 focus:ring-2 focus:ring-pink-400"
//         />
//         <Input
//           placeholder="Hobbies (e.g. books, music, fashion)"
//           value={hobbies}
//           onChange={(e) => setHobbies(e.target.value)}
//           className="bg-white/70 backdrop-blur-md shadow-md border-pink-200/50 focus:ring-2 focus:ring-pink-400"
//         />
//       </div>

//       {/* Button */}
//       <Button
//         className="relative z-10 w-full max-w-4xl mt-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition"
//         onClick={fetchGifts}
//         disabled={loading}
//       >
//         {loading ? (
//           <Loader2 className="animate-spin h-5 w-5 mr-2" />
//         ) : (
//           "✨ Get Gift Ideas"
//         )}
//       </Button>

//       {/* Gift Suggestions */}
//       <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 max-w-6xl w-full">
//         {gifts.map((gift, idx) => (
//           <Card
//             key={idx}
//             className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition"
//           >
//             <CardHeader>
//               <CardTitle className="text-lg font-semibold text-pink-700">
//                 {gift.item}
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-sm text-gray-600">{gift.description}</p>
//               <p className="font-semibold mt-2 text-purple-600">
//                 {gift.price}
//               </p>
//               {gift.link && (
//                 <a
//                   href={gift.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-pink-600 underline block mt-2 hover:text-purple-600 transition"
//                 >
//                   🔗 Buy Now
//                 </a>
//               )}
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }




// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardHeader, CardContent, CardTitle } from "../components/ui/card";
// import { Loader2, Gift } from "lucide-react";
// import { motion } from "framer-motion";

// export default function GiftRecommendation() {
//   const [relationship, setRelationship] = useState("");
//   const [occasion, setOccasion] = useState("");
//   const [budget, setBudget] = useState("");
//   const [hobbies, setHobbies] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [gifts, setGifts] = useState([]);
//   const [history, setHistory] = useState([]);

//   const token = localStorage.getItem("token"); // JWT token stored in localStorage

//   // Fetch AI-generated gift ideas
//   const fetchGifts = async () => {
//     if (!token) return alert("You must be logged in to generate gifts.");
//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/gifts", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // send JWT
//         },
//         body: JSON.stringify({ relationship, occasion, budget, hobbies }),
//       });

//       if (res.status === 401) throw new Error("Unauthorized. Please log in.");
//       const data = await res.json();
//       if (data.success) {
//         setGifts(data.data);
//         fetchHistory(); // update history after generating gifts
//       } else {
//         setGifts([]);
//         alert(data.message || "Failed to fetch gift ideas.");
//       }
//     } catch (err) {
//       console.error("Error fetching gifts:", err.message || err);
//     }
//     setLoading(false);
//   };

//   // Fetch gift history
//   const fetchHistory = async () => {
//     if (!token) return;
//     try {
//       const res = await fetch("http://localhost:5000/api/gifts/history", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (res.status === 401) throw new Error("Unauthorized. Please log in.");
//       const data = await res.json();
//       if (data.success) setHistory(data.data);
//     } catch (err) {
//       console.error("Error fetching gift history:", err.message || err);
//     }
//   };

//   // Load history on component mount
//   useEffect(() => {
//     if (token) fetchHistory();
//   }, [token]);

//   return (
//     <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-br from-pink-50 via-purple-50 to-white overflow-hidden p-6">
//       {/* Floating Background Icons */}
//       <div className="absolute inset-0 pointer-events-none">
//         {[...Array(10)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute text-pink-300 opacity-30"
//             initial={{ y: "100vh", x: Math.random() * window.innerWidth }}
//             animate={{ y: -50 }}
//             transition={{
//               duration: 12 + Math.random() * 10,
//               repeat: Infinity,
//               delay: Math.random() * 5,
//             }}
//           >
//             <Gift size={26 + Math.random() * 22} />
//           </motion.div>
//         ))}
//       </div>

//       {/* Heading */}
//       <h1 className="relative z-10 text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent drop-shadow-md">
//         🎁 AI Gift Suggestion
//       </h1>

//       {/* Input Section */}
//       <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl w-full">
//         <Input
//           placeholder="Relationship (e.g. girlfriend, mom)"
//           value={relationship}
//           onChange={(e) => setRelationship(e.target.value)}
//           className="bg-white/70 backdrop-blur-md shadow-md border-pink-200/50 focus:ring-2 focus:ring-pink-400"
//         />
//         <Input
//           placeholder="Occasion (e.g. birthday, anniversary)"
//           value={occasion}
//           onChange={(e) => setOccasion(e.target.value)}
//           className="bg-white/70 backdrop-blur-md shadow-md border-pink-200/50 focus:ring-2 focus:ring-pink-400"
//         />
//         <Input
//           placeholder="Budget (e.g. ₹1000)"
//           value={budget}
//           onChange={(e) => setBudget(e.target.value)}
//           className="bg-white/70 backdrop-blur-md shadow-md border-pink-200/50 focus:ring-2 focus:ring-pink-400"
//         />
//         <Input
//           placeholder="Hobbies (e.g. books, music, fashion)"
//           value={hobbies}
//           onChange={(e) => setHobbies(e.target.value)}
//           className="bg-white/70 backdrop-blur-md shadow-md border-pink-200/50 focus:ring-2 focus:ring-pink-400"
//         />
//       </div>

//       {/* Button */}
//       <Button
//         className="relative z-10 w-full max-w-4xl mt-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition"
//         onClick={fetchGifts}
//         disabled={loading}
//       >
//         {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : "✨ Get Gift Ideas"}
//       </Button>

//       {/* Gift Suggestions */}
//       <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 max-w-6xl w-full">
//         {gifts.map((gift, idx) => (
//           <Card
//             key={idx}
//             className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition"
//           >
//             <CardHeader>
//               <CardTitle className="text-lg font-semibold text-pink-700">{gift.item}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-sm text-gray-600">{gift.description}</p>
//               <p className="font-semibold mt-2 text-purple-600">{gift.price}</p>
//               {gift.link && (
//                 <a
//                   href={gift.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-pink-600 underline block mt-2 hover:text-purple-600 transition"
//                 >
//                   🔗 Buy Now
//                 </a>
//               )}
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Gift History */}
//       {history.length > 0 && (
//         <div className="relative z-10 mt-12 max-w-6xl w-full">
//           <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">🕒 Gift History</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {history.map((entry, idx) => (
//               <Card
//                 key={idx}
//                 className="bg-white/70 backdrop-blur-md rounded-2xl shadow-md hover:shadow-lg transition"
//               >
//                 <CardHeader>
//                   <CardTitle className="text-md font-semibold text-pink-700">
//                     {entry.relationship} - {entry.occasion}
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-sm text-gray-600">Budget: {entry.budget || "N/A"}</p>
//                   {entry.recommendations.map((gift, i) => (
//                     <div key={i} className="mt-2">
//                       <p className="font-semibold text-purple-600">{gift.item} - {gift.price}</p>
//                       <p className="text-sm text-gray-600">{gift.description}</p>
//                       {gift.link && (
//                         <a
//                           href={gift.link}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-pink-600 underline block mt-1 hover:text-purple-600 transition"
//                         >
//                           🔗 Buy Now
//                         </a>
//                       )}
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }








import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "../components/ui/card";
import { Loader2, Gift } from "lucide-react";
import { motion } from "framer-motion";

export default function GiftRecommendation() {
  const [relationship, setRelationship] = useState("");
  const [occasion, setOccasion] = useState("");
  const [budget, setBudget] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [loading, setLoading] = useState(false);
  const [gifts, setGifts] = useState([]);

  // Fetch AI-generated gift ideas
  const fetchGifts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/gifts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ relationship, occasion, budget, hobbies }),
      });

      const data = await res.json();
      if (data.success) {
        setGifts(data.data);
      } else {
        setGifts([]);
        alert(data.message || "Failed to fetch gift ideas.");
      }
    } catch (err) {
      console.error("Error fetching gifts:", err);
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-br from-pink-50 via-purple-50 to-white overflow-hidden p-6">
      {/* Floating Background Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
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
            <Gift size={26 + Math.random() * 22} />
          </motion.div>
        ))}
      </div>

      {/* Heading */}
      <h1 className="relative z-10 text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent drop-shadow-md">
        🎁 AI Gift Suggestion
      </h1>

      {/* Input Section */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl w-full">
        <Input
          placeholder="Relationship (e.g. girlfriend, mom)"
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
          className="bg-white/70 backdrop-blur-md shadow-md border-pink-200/50 focus:ring-2 focus:ring-pink-400"
        />
        <Input
          placeholder="Occasion (e.g. birthday, anniversary)"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
          className="bg-white/70 backdrop-blur-md shadow-md border-pink-200/50 focus:ring-2 focus:ring-pink-400"
        />
        <Input
          placeholder="Budget (e.g. ₹1000)"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="bg-white/70 backdrop-blur-md shadow-md border-pink-200/50 focus:ring-2 focus:ring-pink-400"
        />
        <Input
          placeholder="Hobbies (e.g. books, music, fashion)"
          value={hobbies}
          onChange={(e) => setHobbies(e.target.value)}
          className="bg-white/70 backdrop-blur-md shadow-md border-pink-200/50 focus:ring-2 focus:ring-pink-400"
        />
      </div>

      {/* Button */}
      <Button
        className="relative z-10 w-full max-w-4xl mt-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition"
        onClick={fetchGifts}
        disabled={loading}
      >
        {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : "✨ Get Gift Ideas"}
      </Button>

      {/* Gift Suggestions */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 max-w-6xl w-full">
        {gifts.map((gift, idx) => (
          <Card
            key={idx}
            className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition"
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-pink-700">{gift.item}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{gift.description}</p>
              <p className="font-semibold mt-2 text-purple-600">{gift.price}</p>
              {gift.link && (
                <a
                  href={gift.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 underline block mt-2 hover:text-purple-600 transition"
                >
                  🔗 Buy Now
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
