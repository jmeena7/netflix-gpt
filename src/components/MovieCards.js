const MovieCards = ({ movie }) => {
  if (!movie) return null;

  const { poster_path, title } = movie;

  return (
    <div className="w-48 md:w-56 lg:w-60 flex-shrink-0 cursor-pointer">
      <img
        className="rounded-md hover:scale-110 transition-transform duration-300 ease-in-out shadow-xl"
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={title}
      />
    </div>
  );
};

export default MovieCards;
