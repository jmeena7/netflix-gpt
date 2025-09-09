const VideoTitle = ({ title, overview }) => {
  if (!title) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-6 md:px-12 bg-gradient-to-r from-black via-black/70 to-transparent text-white">
      
      {/* Title */}
      <h1 className="text-2xl md:text-5xl font-extrabold mb-4 drop-shadow-lg leading-tight">
        {title}
      </h1>

      {/* Overview */}
      <p className="max-w-xl md:max-w-2xl text-sm md:text-lg mb-6 text-gray-200 drop-shadow-md line-clamp-3">
        {overview}
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <button className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded-md text-sm md:text-lg font-semibold hover:bg-gray-200 transition shadow-lg">
          ▶ Play
        </button>
        <button className="flex items-center gap-2 bg-gray-700/70 text-white px-5 py-2 rounded-md text-sm md:text-lg font-semibold hover:bg-gray-600 transition shadow-lg">
          ℹ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;

