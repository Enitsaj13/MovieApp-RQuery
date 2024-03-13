
import { Movie } from "@/types/movies";

const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjJkN2U3ZjVlMmE0YTBhNGYxMTgxZWY5OGM3M2Q0MCIsInN1YiI6IjY1ZjE1ODgxZWVhMzRkMDE4ODEzOTllMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qMgduNCj1K0uieRt_PDwM2fPKuqKD3JxlvrMiWtqLTc'

const headers = {
    accept: 'application/json',
    Authorization: 'Bearer ' + apiKey,
};

interface RequestOptions {
    method: string;
    headers: {
        accept: string;
        Authorization: string;
    };
}

export const fetchTopRatedMovies = async (): Promise<Movie[]> => {
    const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
    const options: RequestOptions = {
        method: 'GET',
        headers, // if same value, shortcut if that not put the declared variable
    };

    const res = await fetch(url, options);

    if (!res.ok) {
        throw new Error('Failed to fetch movies');
    }

    const json = await res.json() as { results: Movie[] }; // Type assertion for the response JSON
    return json.results;
};

export const fetchMovie = async (id: string | string[]) => {

    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    const options = {
        method: 'GET',
        headers,
    };

    const res = await fetch(url, options);

    if (!res.ok) {
        throw new Error('Failed to fetch movies');
    }

    const json = await res.json(); // Type assertion for the response JSON
    return json // return json itself

}