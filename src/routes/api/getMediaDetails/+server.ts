//import { OMDB_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';

export async function POST({ request }: { request: any }) {
	const { title } = await request.json();
	const url = `http://www.omdbapi.com/?apikey=$1e8c7116&t=${title}`;

	const res = await fetch(url);
	const details = await res.json();
	return json(details);
}
