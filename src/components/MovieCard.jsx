const MovieCard = ({ movieData }) => {
    return (
        <li className="card">
            <img src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} alt={movieData.title} />
            <h2 className="movie-title">{movieData.title}</h2>
            <p className="movie-info"><span>Release Date:</span> {movieData.release_date}</p>
            <p className="movie-info"><span>Rating:</span> {movieData.vote_average}</p> 
            <p className="movie-overview">{movieData.overview}</p>
        </li>
    );
}
export default MovieCard;