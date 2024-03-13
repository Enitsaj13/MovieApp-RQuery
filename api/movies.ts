
export const fetchTopRatedMovies = async () => {
    const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjJkN2U3ZjVlMmE0YTBhNGYxMTgxZWY5OGM3M2Q0MCIsInN1YiI6IjY1ZjE1ODgxZWVhMzRkMDE4ODEzOTllMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qMgduNCj1K0uieRt_PDwM2fPKuqKD3JxlvrMiWtqLTc'
        }
    };

    const res = await fetch(url, options);

    if (!res.ok) {
        throw new Error('Failed to fetch movies')
    }

    const json = await res.json();
    return json.results;
};
