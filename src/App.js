import { useState } from "react";
import { Box } from "./Box";
import { ErrorMessage } from "./ErrorMessage";
import { Loader } from "./Loader";
import { Logo } from "./Logo";
import { Main } from "./Main";
import { Message } from "./Message";
import { MovieDetails } from "./MovieDetails";
import { MovieList } from "./MovieList";
import { NavBar } from "./NavBar";
import { NumResults } from "./NumResults";
import { Search } from "./Search";
import { useLocalStorageState } from "./useLocalStorageState";
import { useMovies } from "./useMovies";
import { WatchedList } from "./WatchedList";
import { WatchedSummary } from "./WatchedSummary";

export const average = (arr) => {
	return arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
};

export const KEY = `3c9b1082`;

export default function App() {
	const [query, setQuery] = useState("");

	const [selectedId, setSelectedId] = useState(null); // "tt0120689"

	const [watched, setWatched] = useLocalStorageState([], "watched");

	const { movies, isLoading, error, handleSearch } = useMovies(query);

	console.log(movies);

	const watchedRatedMovie = watched.find(
		(movie) => movie.imdbID === selectedId
	);

	function handleSelectId(movie) {
		const movieId = movie.imdbID;
		setSelectedId((selectedId) => (selectedId !== movieId ? movieId : null));
	}
	function handleCloseMovie() {
		setSelectedId(null);
	}

	function handleAddWatched(movie) {
		setWatched((watched) => [...watched, movie]);
	}

	function handleDeleteWatched(id) {
		setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
	}

	return (
		<>
			<NavBar>
				<Logo />
				<Search query={query} setQuery={setQuery} onSearch={handleSearch} />
				<NumResults movies={movies} />
			</NavBar>
			<Main>
				<Box>
					{movies.length === 0 && !isLoading && !error && (
						<Message message={"Your search will appear here"} />
					)}
					{!isLoading && !error && (
						<MovieList movies={movies} handleSelectId={handleSelectId} />
					)}
					{error && <ErrorMessage message={error} />}
					{isLoading && <Loader />}
				</Box>
				<Box>
					{selectedId ? (
						<MovieDetails
							selectedId={selectedId}
							onCloseMovie={handleCloseMovie}
							onAddWatched={handleAddWatched}
							watchedRatedMovie={watchedRatedMovie}
							watched={watched}
						/>
					) : (
						<>
							<WatchedSummary
								watched={watched}
								onAddWatched={handleAddWatched}
							/>
							<WatchedList
								watched={watched}
								onAddWatched={handleAddWatched}
								onDeleteWatched={handleDeleteWatched}
							/>
						</>
					)}
				</Box>
			</Main>
		</>
	);
}
