import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import React from 'react';
import NavbarComponent from "./navbar/navbar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './home/home';
import MoviesPage from './movies/movies';
import TvShowsPage from './tv/tv';
import bg from "./bg.png"
import ShowDetailsPage from './showDetails/showDetails';
import MoviesDetailsPage from './moviesDetails/moviesDetails';
import PeopleDetailsPage from './peopleDetails/peopleDetails';

function App() {
  return (
    <div className="App">
      <img src={bg} className='bg' alt='BG img'></img>
      <Router>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/tv" element={<TvShowsPage />} />
          <Route path="/tvshows/:showId" element={<ShowDetailsPage />} />
          <Route path="/movie/:movieId" element={<MoviesDetailsPage />} />
          <Route path="/person/:personId" element={<PeopleDetailsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
