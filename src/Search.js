import { useEffect, useRef } from "react";

export function Search({ query, setQuery, onSearch }) {
	const inputEl = useRef(null);

	useEffect(() => {
		function callback(e) {
			if (e.code === "Enter") {
				inputEl.current.focus();
			}
		}
		document.addEventListener("keydown", (e) => callback(e));
	}, []);
	return (
		<form
			className="search-container"
			onSubmit={(e) => {
				e.preventDefault();
				onSearch();
			}}
		>
			<input
				className="search"
				type="text"
				placeholder="Search movies..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				ref={inputEl}
			/>
			<button className="search-btn" type="submit">
				🔍
			</button>
		</form>
	);
}
