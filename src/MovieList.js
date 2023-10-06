import { Movie } from "./Movie";

export function MovieList({ movies, handleSelectId }) {
	return (
		<ul className="list list-movies">
			{movies?.map((movie) => (
				<Movie
					movie={movie}
					key={movie.imdbID}
					handleSelectId={handleSelectId}
				/>
			))}
		</ul>
	);
}
