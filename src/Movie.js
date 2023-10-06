export function Movie({ movie, handleSelectId }) {
	const { Poster, Title, Year } = movie;
	return (
		<>
			<li onClick={() => handleSelectId(movie)}>
				<img src={Poster} alt={`${Title} poster`} />
				<h3>{Title}</h3>
				<div>
					<p>
						<span>🗓</span>
						<span>{Year}</span>
					</p>
				</div>
			</li>
		</>
	);
}
