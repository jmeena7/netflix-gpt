import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";
import { Api_options } from "../utils/constant"; // ✅ capital letters (case-sensitive)

const usePopularMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
          Api_options // ✅ correct object
        );
        const data = await res.json();

        if (data?.results) {
          dispatch(addPopularMovies(data.results));
        } else {
          console.error("No results found in API response:", data);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    getPopularMovies();
  }, [dispatch]);
};

export default usePopularMovies;

