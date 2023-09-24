import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ fetch }) => {
	const res = await fetch('/en-long.json'); // Assuming en.json is in the static folder
	const data = await res.json();

	return {
		props: {
			translation: data
		}
	};
};
