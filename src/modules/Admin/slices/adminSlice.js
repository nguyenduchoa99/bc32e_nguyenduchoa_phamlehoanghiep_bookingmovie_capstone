import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import quanLyRapService from '../../../services/quanLyRapService';
import quanLyPhimService from '../../../services/quanLyPhimService';
import quanLyDatVeService from '../../../services/quanLyDatVeService';
const initialState = {
	movies: [],
	movie: {},
	isLoading: false,
	error: null,
	search: "",
	cinemaSystem: [],
	cinemaTheater: [],
};
//get list
export const getMovies = createAsyncThunk(
	"home/admin/getMovies",
	async (_, { getState, rejectWithValue }) => {
		try {
			const { search } = getState().admin;

			const data = await quanLyPhimService.getMovies(search);
			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
//add film
export const addMovie = createAsyncThunk(
	"home/admin/addMovie",
	async (movie, { dispatch, rejectWithValue }) => {
		try {
			await quanLyPhimService.addMovie(movie);
			dispatch(getMovies());
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
//delete Film
export const deleteMovie = createAsyncThunk(
	"home/admin/deleteMovie",
	async (movie, { dispatch, rejectWithValue }) => {
		try {
			await quanLyPhimService.deleteMovie(movie);
			dispatch(getMovies());
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
//edit Film
export const getMovieDetails = createAsyncThunk(
	"home/admin/getMovieDetails",
	async (movieId, { rejectWithValue }) => {
		try {
			const data = await quanLyPhimService.getMovieDetails(movieId);
			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
//update film
export const updateMovie = createAsyncThunk(
	"home/admin/updateMovie",
	async (movieId, { dispatch, rejectWithValue }) => {
		try {
			await quanLyPhimService.updateMovie(movieId);
			dispatch(getMovies());
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
// get cinema system
export const getCinemaSystem = createAsyncThunk(
	"home/admin/showtimes",
	async (_, { rejectWithValue }) => {
		try {
			const data = await quanLyRapService.getCinemaSystem();
			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
// get cinema
export const getCinemaTheater = createAsyncThunk(
	"home/admin/theater",
	async (theaterName, { rejectWithValue }) => {
		try {
			const data = await quanLyRapService.getCinemaTheater(theaterName);
			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

//add showtimes
export const addTheater = createAsyncThunk(
	"home/admin/booking",
	async (showtimes, { dispatch, rejectWithValue }) => {
		try {
			await quanLyDatVeService.addTheater(showtimes);
			dispatch(getMovies());
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

const adminSlice = createSlice({
	name: "home/admin/movies",
	initialState,
	reducers: {
		changeSearch: (state, { payload }) => {
			state.search = payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getMovies.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getMovies.fulfilled, (state, { payload }) => {
			state.movies = payload;
			state.isLoading = false;
		});
		builder.addCase(getMovies.rejected, (state, { payload }) => {
			state.error = payload;
			state.isLoading = false;
		});

		builder.addCase(getMovieDetails.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getMovieDetails.fulfilled, (state, { payload }) => {
			state.movie = payload;
			state.isLoading = false;
		});
		builder.addCase(getMovieDetails.rejected, (state, { payload }) => {
			state.error = payload;
			state.isLoading = false;
		});

		builder.addCase(getCinemaSystem.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getCinemaSystem.fulfilled, (state, { payload }) => {
			state.cinemaSystem = payload;
			state.isLoading = false;
		});
		builder.addCase(getCinemaSystem.rejected, (state, { payload }) => {
			state.error = payload;
			state.isLoading = false;
		});

		builder.addCase(getCinemaTheater.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getCinemaTheater.fulfilled, (state, { payload }) => {
			state.cinemaTheater = payload;
			state.isLoading = false;
		});
		builder.addCase(getCinemaTheater.rejected, (state, { payload }) => {
			state.error = payload;
			state.isLoading = false;
		});
	},
});

export const { changeSearch } = adminSlice.actions;

export default adminSlice.reducer;