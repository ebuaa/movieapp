import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import styles from "./MovieDetails.module.css";

const MovieDetail = () => {
    const { id: movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_KEY = "fe07c595d875f4b56cda25a7143f3b39";

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                
                const movieRes = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=fr-FR`);
                const movieData = await movieRes.json();
                setMovie(movieData);

                const castRes = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=fr-FR`);
                const castData = await castRes.json();
                setCast(castData.cast.slice(0, 10));

                const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
                setIsInWishlist(wishlist.some(id => id === parseInt(movieId)));

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        if (movieId) {
            fetchMovieDetails();
        }
    }, [movieId]);

    const toggleWishlist = () => {
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        const movieIdNum = parseInt(movieId);
        
        if (isInWishlist) {
            wishlist = wishlist.filter(id => id !== movieIdNum);
            setIsInWishlist(false);
        } else {
            wishlist.push(movieIdNum);
            setIsInWishlist(true);
        }
        
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        
        // Dispatcher un événement personnalisé pour mettre à jour le compteur
        window.dispatchEvent(new Event("wishlistChanged"));
    };

    if (loading) return <div className={styles.loading}>Chargement...</div>;
    if (error) return <div className={styles.error}>Erreur : {error.message}</div>;
    if (!movie) return <div className={styles.notFound}>Film non trouvé</div>;

    return (
        <div className={styles.container}>
            <Link to="/">
                <button className={styles.backButton}>← Retour à la liste</button>
            </Link>
            
            <div className={styles.movieInfo}>
                <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={movie.title}
                    className={styles.poster}
                />
                <div className={styles.details}>
                    <h1 className={styles.title}>{movie.title}</h1>
                    <p><strong>Date de sortie :</strong> {movie.release_date}</p>
                    <p><strong>Note moyenne :</strong> {movie.vote_average.toFixed(1)}/10</p>
                    <p><strong>Durée :</strong> {movie.runtime} minutes</p>
                    <p><strong>Résumé :</strong> {movie.overview}</p>
                    
                    <button 
                        onClick={toggleWishlist}
                        className={`${styles.wishlistButton} ${isInWishlist ? styles.inWishlist : ''}`}
                    >
                        {isInWishlist ? "Retirer de la wishlist" : "❤︎ Ajouter à la wishlist"}
                    </button>
                </div>
            </div>

            <section className={styles.castSection}>
                <h2>Acteurs principaux</h2>
                <ul className={styles.castList}>
                    {cast.map((actor) => (
                        <li key={actor.id} className={styles.castItem}>
                            {actor.profile_path ? (
                                <img 
                                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} 
                                    alt={actor.name}
                                    className={styles.actorPhoto}
                                />
                            ) : (
                                <div className={styles.noPhoto}>
                                    <span>📷</span>
                                    <p>Photo non disponible</p>
                                </div>
                            )}
                            <div>
                                <h3 className={styles.actorName}>{actor.name}</h3>
                                <p className={styles.characterName}>{actor.character}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default MovieDetail;
