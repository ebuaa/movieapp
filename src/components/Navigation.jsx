import { Link } from "react-router";
import { useState, useEffect } from "react";
import styles from "./Navigation.module.css";

const Navigation = () => {
    const [wishlistCount, setWishlistCount] = useState(0);

    useEffect(() => {
        const updateCount = () => {
            const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
            setWishlistCount(wishlist.length);
        };

        updateCount();

        window.addEventListener("wishlistChanged", updateCount);
        window.addEventListener("storage", updateCount);

        return () => {
            window.removeEventListener("wishlistChanged", updateCount);
            window.removeEventListener("storage", updateCount);
        };
    }, []);

    return (
        <nav className={styles.nav}>
            <div className={styles.navContainer}>
                <Link to="/" className={styles.navBrand}>
                    MovieApp
                </Link>
                <div className={styles.navLinks}>
                    <Link to="/" className={styles.navLink}>
                        Accueil
                    </Link>
                    <Link to="/wishlist" className={styles.wishlistLink}>
                        <span>Liste de souhaits</span>
                        {wishlistCount > 0 && (
                            <span className={styles.badge}>{wishlistCount}</span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
