import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  if (!movies || movies.length === 0) {
    return <h1 className="text-white">Loading...</h1>;
  }

  const handleVideoEnd = () => {
    setCurrentMovieIndex((prevIndex) =>
      prevIndex === movies.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentMovie = movies[currentMovieIndex];

  return (
    <div className="relative w-full h-screen">
      {/* Background video will auto-change on trailer end */}
      <VideoBackground
        movieId={currentMovie.id}
        onVideoEnd={handleVideoEnd} // ✅ callback pass kiya
      />
      <VideoTitle
        title={currentMovie?.title}
        overview={currentMovie?.overview}
      />
    </div>
  );
};

export default MainContainer;
