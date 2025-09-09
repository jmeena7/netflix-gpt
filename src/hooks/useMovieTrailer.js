import { useEffect, useState } from "react";
import { Api_options } from "../utils/constant";

const useMovieTrailer = (movieId) => {
  const [trailerKey, setTrailerKey] = useState(null);

  const getMovieVideos = async () => {
    try {
      setTrailerKey(null); // reset before fetching new trailer

      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        Api_options
      );
      const json = await res.json();

      const videos = json?.results || [];
      

      // Filter only Trailer type from YouTube
     const trailers = videos.filter(
      (video) =>
      (video.type === "Trailer" || video.type === "Teaser") &&
      video.site === "YouTube"
     );

      if (trailers.length > 0) {
        // Prefer official trailer, otherwise last one
        const officialTrailer =
          trailers.find((t) =>
            t.name.toLowerCase().includes("official")
          ) || trailers[trailers.length - 1];

        setTrailerKey(officialTrailer.key);
      } else {
        console.warn(`❌ No trailer found for movieId: ${movieId}`);
      }
    } catch (error) {
      console.error("🔥 Error fetching movie videos:", error);
    }
  };

  useEffect(() => {
    if (movieId) getMovieVideos();
  }, [movieId]);

  return trailerKey;
};

export default useMovieTrailer;
