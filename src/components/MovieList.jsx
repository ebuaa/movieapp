import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState("popular");
    const [searchTerm, setSearchTerm] = useState("");

    const API_KEY = "fe07c595d875f4b56cda25a7143f3b39";
    const categories = {
        popular: "popular",
        nowPlaying: "now_playing",
        topRated: "top_rated",
        upcoming: "upcoming"
    };

    const fetchMovies = async () => {
        try {
            const API = `https://api.themoviedb.org/3/movie/${categories[category]}?api_key=${API_KEY}`;
            const res = await fetch(API);
            const data = await res.json();

            setMovies(data.results);
            setSearchTerm("");
            
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [category]);

    useEffect(() => {
        const filteredMovieName = movies.filter((movie) =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMovies(filteredMovieName);
    }, [searchTerm, movies]);

    return (
        <section>
            <header>
                <h1>Popular Movies</h1>
            </header>

            <div>
                <div>
                    <button onClick={() => setCategory("nowPlaying")}>En salle</button>
                    <button onClick={() => setCategory("popular")}>Populaires</button>
                    <button onClick={() => setCategory("topRated")}>Les mieux notés</button>
                    <button onClick={() => setCategory("upcoming")}>Sorties à venir</button>
                </div>

                <input type="text" placeholder="Rechercher un film..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>

            <div>
                <ul className="cards">
                    {filteredMovies.map((curMovie) => (
                        <MovieCard key={curMovie.id} movieData={curMovie} />
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default MovieList;