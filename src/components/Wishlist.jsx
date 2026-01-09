import { useState, useEffect } from "react";
import { Link } from "react-router";
import styles from "./Wishlist.module.css";

const Wishlist = () => {
    const [wishlistMovies, setWishlistMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    const API_KEY = "fe07c595d875f4b56cda25a7143f3b39";

    useEffect(() => {
        const loadWishlistMovies = async () => {
            try {
                setLoading(true);
                const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
                
                if (wishlist.length === 0) {
                    setWishlistMovies([]);
                    setFilteredMovies([]);
                    setLoading(false);
                    return;
                }

                const moviesData = await Promise.all(
                    wishlist.map(movieId =>
                        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=fr-FR`)
                            .then(res => res.json())
                    )
                );

                setWishlistMovies(moviesData);
                setFilteredMovies(moviesData);
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors du chargement de la wishlist:", error);
                setLoading(false);
            }
        };

        loadWishlistMovies();
    }, []);

    useEffect(() => {
        const filtered = wishlistMovies.filter((movie) =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMovies(filtered);
    }, [searchTerm, wishlistMovies]);

    const removeFromWishlist = (movieId) => {
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        wishlist = wishlist.filter(id => id !== movieId);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        
        setWishlistMovies(wishlistMovies.filter(movie => movie.id !== movieId));
        
        window.dispatchEvent(new Event("wishlistChanged"));
    };

    if (loading) return <div className={styles.container}><p className={styles.loading}>Chargement...</p></div>;

    return (
        <div className={styles.container}>
            <Link to="/">
                <button className={styles.backButton}>← Retour à la liste</button>
            </Link>

            <h1>Ma Wishlist</h1>

            {wishlistMovies.length === 0 ? (
                <p className={styles.emptyMessage}>Votre wishlist est vide.</p>
            ) : (
                <>
                    <div className={styles.searchContainer}>
                        <input
                            type="text"
                            placeholder="Rechercher dans votre wishlist..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>

                    <div className={styles.movieCount}>
                        {filteredMovies.length} film{filteredMovies.length > 1 ? "s" : ""} trouvé{filteredMovies.length > 1 ? "s" : ""}
                    </div>

                    <div className={styles.wishlistGrid}>
                        {filteredMovies.map((movie) => (
                            <div key={movie.id} className={styles.wishlistCard}>
                                <img 
                                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} 
                                    alt={movie.title}
                                    className={styles.moviePoster}
                                />
                                <div className={styles.cardContent}>
                                    <h2 className={styles.movieTitle}>{movie.title}</h2>
                                    <p className={styles.movieInfo}>
                                        <strong>Date :</strong> {movie.release_date}
                                    </p>
                                    <p className={styles.movieInfo}>
                                        <strong>Note :</strong> {movie.vote_average}/10
                                    </p>
                                    <Link to={`/movie/${movie.id}`}>
                                        <button className={styles.viewButton}>Voir les détails</button>
                                    </Link>
                                    <button 
                                        onClick={() => removeFromWishlist(movie.id)}
                                        className={styles.removeButton}
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Wishlist;
