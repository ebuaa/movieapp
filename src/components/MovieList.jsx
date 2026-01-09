import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    
    const API="https://api.themoviedb.org/3/movie/popular?api_key=fe07c595d875f4b56cda25a7143f3b39"

    const fetchMovies = async () => {
        try {
            const res = await fetch(API);
            const data = await res.json();

            setMovies(data.results);
            
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <section>
            <header><h1>Popular Movies</h1></header>

            <div>
                <ul className="cards">
                    {movies.map((curMovie) => (
                        <MovieCard key={curMovie.id} movieData={curMovie} />
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default MovieList;