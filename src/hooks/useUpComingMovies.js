import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUpComingMovies} from "../utils/moviesSlice";
import { Api_options } from "../utils/constant";

const useUpComingMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUpComingMovies = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
          Api_options
        );
        const data = await res.json();

        if (data?.results) {
          dispatch(addUpComingMovies(data.results)); // ✅ safe dispatch
        }
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
      }
    };

    getUpComingMovies();
  }, [dispatch]);
};

export default useUpComingMovies;