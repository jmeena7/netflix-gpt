import { useState } from "react";
import lang from "../utils/languageConstants";
import { GoogleGenerativeAI } from "@google/generative-ai";

// 🔑 .env se keys load karo
const TMDB_API_KEY = process.env.REACT_APP_TMDB_KEY;
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_KEY;

// Gemini init
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const GptSearchBar = () => {
  const [currentLang, setCurrentLang] = useState("en");
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const { placeholder = "Search...", search = "Search" } =
    lang?.[currentLang] || lang?.en || {};

  // 🔹 Function: Get AI Suggestions + TMDB results
  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);

    try {
      // 1️⃣ Gemini se movie suggestion
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Suggest 5 popular movies for: ${query}.
                      Return only movie names as a comma-separated list.`;

      const result = await model.generateContent(prompt);
      const suggestionText = result.response.text();
      console.log("🎬 Gemini Suggestions:", suggestionText);

      // Split into array
      const movieNames = suggestionText
        .split(",")
        .map((name) => name.trim())
        .filter((name) => name.length > 0);

      // 2️⃣ For each movie, fetch TMDB details
      const results = [];
      for (const name of movieNames) {
        const encodedName = encodeURIComponent(name);
        const url = `${process.env.REACT_APP_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodedName}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.results?.length > 0) {
          results.push(data.results[0]);
        }
      }

      setMovies(results);
    } catch (error) {
      console.error("❌ Error in Gemini Search:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4 py-8">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-extrabold text-white text-center mb-8 drop-shadow-lg">
          🎬 Gemini Movie Search
        </h1>

        {/* Language Selector */}
        <div className="flex justify-end mb-4">
          <select
            value={currentLang}
            onChange={(e) => setCurrentLang(e.target.value)}
            className="px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="es">Español</option>
          </select>
        </div>

        {/* Search Bar */}
        <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="flex-grow px-6 py-3 text-gray-700 focus:outline-none text-lg"
          />
          <button
            onClick={handleSearch}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 transition-all duration-300"
          >
            {loading ? "Loading..." : search}
          </button>
        </div>
      </div>

      {/* Movie Results */}
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full max-w-6xl">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300"
          >
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
            ) : (
              <div className="w-full h-64 flex items-center justify-center bg-gray-700 text-gray-400">
                No Image
              </div>
            )}
            <div className="p-3 text-white">
              <h2 className="font-bold text-lg truncate">{movie.title}</h2>
              <p className="text-sm text-gray-400">
                {movie.release_date || "Unknown"}
              </p>
              <p className="text-sm">⭐ {movie.vote_average}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GptSearchBar;
