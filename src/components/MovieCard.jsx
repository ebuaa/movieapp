import { Link } from 'react-router';
import styles from './MovieCard.module.css';

const MovieCard = ({ movieData }) => {
    return (
        <li className={styles.card}>
            <img src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} alt={movieData.title} />
            <h2 className={styles.movieTitle}>{movieData.title}</h2>
            <p className={styles.movieInfo}><span>Rating:</span> {movieData.vote_average.toFixed(1)}</p> 
            <Link to={`/movie/${movieData.id}`}>
                <button className={styles.detailButton}>Voir le détail</button>
            </Link>
        </li>
    );
}
export default MovieCard;