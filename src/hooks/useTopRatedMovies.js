import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "../utils/moviesSlice";
import { Api_options } from "../utils/constant";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getTopRatedMovies = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
          Api_options
        );
        const data = await res.json();
       

        if (data?.results) {
          dispatch(addTopRatedMovies(data.results)); // ✅ safe dispatch
        }
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
      }
    };

    getTopRatedMovies();
  }, [dispatch]);
};

export default useTopRatedMovies;
