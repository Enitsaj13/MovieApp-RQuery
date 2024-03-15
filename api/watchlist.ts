export const fetchWatchListMovies = async () => {

    const url = 'https://api.themoviedb.org/3/account/21099013/watchlist/movies?language=en-US&page=1&sort_by=created_at.desc';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjJkN2U3ZjVlMmE0YTBhNGYxMTgxZWY5OGM3M2Q0MCIsInN1YiI6IjY1ZjE1ODgxZWVhMzRkMDE4ODEzOTllMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qMgduNCj1K0uieRt_PDwM2fPKuqKD3JxlvrMiWtqLTc'
        }
    };

    const res = await fetch(url, options);

    if (!res.ok) {
        throw new Error('Failed to fetch movies');
    }

    const json = await res.json(); // Type assertion for the response JSON
    return json.results; // return json results because the response is array
};

export const addMovieToWatchList = async (movieId: string | string[]) => {

    const url = 'https://api.themoviedb.org/3/account/21099013/watchlist';
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjJkN2U3ZjVlMmE0YTBhNGYxMTgxZWY5OGM3M2Q0MCIsInN1YiI6IjY1ZjE1ODgxZWVhMzRkMDE4ODEzOTllMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qMgduNCj1K0uieRt_PDwM2fPKuqKD3JxlvrMiWtqLTc'
        },
        body: JSON.stringify({
            media_type: 'movie',
            media_id: movieId,
            watchlist: true
        })
    };


    const res = await fetch(url, options);

    if (!res.ok) {
        throw new Error('Failed to fetch movies');
    }

    const json = await res.json(); // Type assertion for the response JSON
    return json; // return json itself because the response is similar to this

    // {
    //     "success": true,
    //     "status_code": 12,
    //     "status_message": "The item/record was updated successfully."
    //   }

};