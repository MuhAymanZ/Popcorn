import { useEffect } from "react";
export function useKey(key, onKeyPress) {
	useEffect(() => {
		function callBack(e) {
			if (e.code.toLowerCase() === key.toLowerCase()) {
				onKeyPress();
			}
		}
		document.addEventListener("keydown", callBack);
		return function () {
			document.removeEventListener("keydown", callBack);
		};
	}, [onKeyPress, key]);
}
