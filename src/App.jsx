import { Routes, Route } from 'react-router';
import './App.css'
import Navigation from './components/Navigation.jsx'
import MovieList from './components/MovieList.jsx'
import MovieDetail from './components/MovieDetails.jsx'
import Wishlist from './components/Wishlist.jsx'

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </>
  )
}

export default App
