import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  // movies slice se data lena
  const movies = useSelector((store) => store.movies);
  if (!movies) return null; // agar movies state empty hai to null render karo

  return (
    // ✅ overflow-x-auto ko hata ke overflow-x-hidden kar diya
    <div className="bg-black -mt-40 z-30 relative overflow-x-hidden">
      <MovieList title="Now Playing" movies={movies.nowPlayingMovies} />
      <MovieList title="Top Rated" movies={movies.topRatedMovies} />
      <MovieList title="Popular" movies={movies.popularMovies} />
      <MovieList title="Upcoming" movies={movies.upComingMovies} />
    </div>
  );
};

export default SecondaryContainer;
