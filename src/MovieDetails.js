import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { useKey } from "./useKey";
import { KEY } from "./App";
import { Loader } from "./Loader";

export function MovieDetails({
	selectedId,
	onCloseMovie,
	onAddWatched,
	watchedRatedMovie,
}) {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [userRating, setUserRating] = useState("");

	const {
		Title: title,
		Year: year,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre,
	} = movie;

	function handleAdd() {
		const newWatchedMovie = {
			imdbID: selectedId,
			title,
			year,
			poster,
			imdbRating: Number(imdbRating),
			runtime: Number(runtime.split(" ").at(0)),
			userRating,
		};

		onAddWatched(newWatchedMovie);
		onCloseMovie();
	}

	useKey("Escape", onCloseMovie);
	useEffect(() => {
		async function getMovieDetails() {
			setIsLoading(true);
			const res =
				await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}
			`);
			const data = await res.json();
			setMovie(data);
			setIsLoading(false);
		}
		getMovieDetails();
	}, [selectedId]);

	useEffect(() => {
		if (!title) return;
		document.title = `Movie | ${title}`;
		return function () {
			document.title = "UsePopCorn";
		};
	}, [title]);

	return (
		<div className="details">
			{isLoading ? (
				<Loader />
			) : (
				<>
					<header>
						<img src={poster} alt={`Poster of the movie ${title}`} />
						<div className="details-overview">
							<h2>{title}</h2>
							<p>
								{released} &bull; {runtime}
							</p>
							<p>{genre}</p>
							<p>
								<span>⭐</span>
								{imdbRating} IMDB Rating
							</p>
						</div>
						<button className="btn-back" onClick={onCloseMovie}>
							&larr;
						</button>
					</header>
					<section>
						<div className="rating">
							{!watchedRatedMovie ? (
								<>
									<StarRating
										size={24}
										maxRating={10}
										onSetMovie={setUserRating}
									/>

									{userRating && (
										<button
											className="btn-add"
											onClick={() => {
												handleAdd();
											}}
										>
											+ Add to list
										</button>
									)}
								</>
							) : (
								<p>
									<strong>
										This Movie Already Been Rated {watchedRatedMovie.userRating}
									</strong>
								</p>
							)}
						</div>

						<p>
							<em>{plot}</em>
						</p>
						<p>Starring {actors}</p>
						<p>
							<strong>Directed By {director}</strong>
						</p>
					</section>
				</>
			)}
		</div>
	);
}
