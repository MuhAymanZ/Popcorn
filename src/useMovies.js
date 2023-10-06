import { useState, useEffect } from "react";
export function useMovies(query) {
	const KEY = `3c9b1082`;
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	function handleSearch() {
		const controller = new AbortController();
		async function fetchMovies() {
			try {
				setIsLoading(true);
				setError("");
				const res = await fetch(
					`http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`,
					{ signal: controller.signal }
				);
				if (!res.ok) throw new Error("Something went wrong!");
				const data = await res.json();
				console.log(data);
				if (data.Response === "False") throw new Error(data.Error);
				else {
					setMovies(data.Search);
				}
			} catch (err) {
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		}
		if (!query.length) {
			setError("");
			setMovies([]);
			return;
		}
		fetchMovies();
		// handleCloseMovie();

		return function () {
			controller.abort();
		};
	}

	return { movies, isLoading, error, handleSearch };
}
