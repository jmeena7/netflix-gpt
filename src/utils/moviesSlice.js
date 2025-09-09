import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: [],
    popularMovies: [], // ✅ camelCase
    topRatedMovies:[],
    upComingMovies:[]
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload; // ✅ camelCase
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload; // ✅ camelCase
    },
    addUpComingMovies: (state, action) => {
      state.upComingMovies = action.payload; // ✅ camelCase
    },
  },
});

export const { addNowPlayingMovies, addPopularMovies , addTopRatedMovies ,addUpComingMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
