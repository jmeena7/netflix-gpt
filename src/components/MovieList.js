import { useRef } from "react";
import MovieCards from "./MovieCards";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const MovieList = ({ title, movies }) => {
  const scrollRef = useRef(null);

  if (!movies) return null; // safety check

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      scrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative p-4 group">
      <h1 className="text-xl font-bold text-white mb-2">{title}</h1>

      {/* Left Arrow (hidden until hover) */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 
                   bg-black/50 rounded-full text-white hover:bg-black/80 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <FaChevronLeft size={20} />
      </button>

      {/* Movies Row */}
      <div
        ref={scrollRef}
        className="flex space-x-4 scroll-smooth select-none pointer-events-auto"
        style={{
          overflowX: "hidden", // ✅ disable manual horizontal scroll
          overflowY: "hidden",
        }}
      >
        {movies.map((movie) => (
          <MovieCards key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Right Arrow (hidden until hover) */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 
                   bg-black/50 rounded-full text-white hover:bg-black/80 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  );
};

export default MovieList;
