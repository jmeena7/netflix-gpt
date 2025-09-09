import YouTube from "react-youtube";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId, onVideoEnd }) => {
  const trailerKey = useMovieTrailer(movieId);

  console.log(trailerKey);

  if (!trailerKey) {
    return <p className="text-white">Loading trailer...</p>;
  }

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      iv_load_policy: 3,
    },
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <YouTube
        videoId={trailerKey}
        opts={opts}
        className="absolute top-0 left-0 w-full h-full object-cover"
        onEnd={() => onVideoEnd && onVideoEnd()} // ✅ safe call
      />
    </div>
  );
};

export default VideoBackground;
