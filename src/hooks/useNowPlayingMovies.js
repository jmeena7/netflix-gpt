import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { Api_options } from "../utils/constant";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getNowPlayingMovies = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?page=1",
          Api_options
        );
        const data = await res.json();
        dispatch(addNowPlayingMovies(data.results));
         // ✅ correct key
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    getNowPlayingMovies();
  }, [dispatch]);
};

export default useNowPlayingMovies;
