/* eslint-disable array-callback-return */
import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  FormControl,
  Button,
  InputGroup,
  Row,
  Card,
} from "react-bootstrap";
import "./style.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [trendingtv, setTrendingtv] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [populartv, setPopulartv] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const apiKey = "bb393b7476beaebaea70ee092e45bb47";
  const [searchToggle, setSearchToggle] = useState(false);
  const [genreMoviesToggle, setGenreMoviesToggle] = useState(false);
  const [genreShowsToggle, setGenreShowsToggle] = useState(false);
  const [moviesByGenre, setMoviesByGenre] = useState([]);
  const [showsByGenre, setShowsBygenre] = useState([]);

  const scrollRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
        );
        const data = await response.json();
        setTrendingMovies(data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };
    fetchTrendingMovies();
  }, []);
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`
        );
        const data = await response.json();
        setTrending(data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };
    fetchTrending();
  }, []);
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
        );
        const data = await response.json();
        setPopularMovies(data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };
    fetchPopularMovies();
  }, []);
  useEffect(() => {
    const fetchTrendingtv = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}`
        );
        const data = await response.json();
        setTrendingtv(data.results);
      } catch (error) {
        console.error("Error fetching trending tvseries:", error);
      }
    };
    fetchTrendingtv();
  }, []);
  useEffect(() => {
    const fetchPopulartv = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`
        );
        const data = await response.json();
        setPopulartv(data.results);
      } catch (error) {
        console.error("Error fetching trending tvseries:", error);
      }
    };
    fetchPopulartv();
  }, []);

  function search() {
    const searchURI = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=`;
    fetch(searchURI + searchInput)
      .then((response) => response.json())
      .then((data) => {
        const searchResults = data.results;
        setSearchResult(searchResults);
        console.log({ searchInput, searchResults, searchToggle });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  const scrollLeft = (index) => {
    const scrollContainerRef = scrollRefs[index];
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200, // Adjust the scroll amount as per your requirement
        behavior: "smooth",
      });
    }
  };

  const scrollRight = (index) => {
    const scrollContainerRef = scrollRefs[index];
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200, // Adjust the scroll amount as per your requirement
        behavior: "smooth",
      });
    }
  };
  const resetScroll = (index) => {
    const scrollRef = scrollRefs[index];
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTvGenres] = useState([]);

  useEffect(() => {
    const fetchMovieGenres = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
      );
      const data = await response.json();
      setMovieGenres(data.genres);
    };

    const fetchTvGenres = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}`
      );
      const data = await response.json();
      setTvGenres(data.genres);
    };

    fetchMovieGenres();
    fetchTvGenres();
  }, []);
  const getGenreMovies = async (genreId) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`
    );
    const data = await response.json();
    setMoviesByGenre(data.results);
  };
  const getGenreShows = async (genreId) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${genreId}`
    );
    const data = await response.json();
    setShowsBygenre(data.results);
  };
  return (
    <div className="home">
      {/* search Bar */}
      <Container className="search-bar-container">
        <h1 className="welcome">Welcome</h1>
        <InputGroup className="search-bar">
          <FormControl
            className="search-input"
            placeholder="Search Movies,TV shows and People"
            size="lg"
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === "enter" || e.keyCode === 13) {
                search();
                setSearchToggle(true);
              }
            }}
          />
          <Button
            variant="dark"
            className="search-btn"
            onClick={() => {
              search();
              setSearchToggle(true);
            }}
          >
            <i className="bi bi-search"></i>
          </Button>
        </InputGroup>
      </Container>
      {searchToggle && (
        <div className="search-container">
          <h1 className="search-head"> Search Results</h1>
          <button
            type="button"
            class="btn btn-outline-danger close-btn"
            on
            onClick={() => {
              setSearchToggle(false);
              setSearchResult([]);
              document.getElementsByClassName("search-input")[0].value = "";
            }}
          >
            <i class="bi bi-x"></i>
          </button>
          {searchResult.length === 0 ? (
            <h1>No results</h1>
          ) : (
            <div>
              <p className="search-type">Movies</p>
              <div>
                <Row className="row row-cols-6 search-list">
                  {searchResult.map((movie) => {
                    if (movie.media_type === "movie") {
                      return (
                        <Link to={`/movie/${movie.id}`}>
                          <Card className="search-item m-2">
                            <Card.Img
                              src={
                                movie.poster_path
                                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
                              }
                              className="search-img"
                            ></Card.Img>
                            <Card.Body className="search-content">
                              <Card.Text className="search-name">
                                {movie.title}
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Link>
                      );
                    }
                  })}
                </Row>
              </div>
              <p className="search-type">Tv Shows</p>
              <div>
                <Row className="row row-cols-6 search-list">
                  {searchResult.map((movie) => {
                    if (movie.media_type === "tv") {
                      return (
                        <Link to={`/tvshows/${movie.id}`}>
                          <Card className="search-item m-2">
                            <Card.Img
                              src={
                                movie.poster_path
                                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
                              }
                              className="search-img"
                            ></Card.Img>
                            <Card.Body className="search-content">
                              <Card.Text className="search-name">
                                {movie.name}
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Link>
                      );
                    }
                  })}
                </Row>
              </div>
              <p className="search-type">People</p>
              <div>
                <Row className="row row-cols-6 search-list">
                  {searchResult.map((movie) => {
                    if (movie.media_type === "person") {
                      return (
                        <Link to={`/person/${movie.id}`}>
                          <Card className="search-item m-2">
                            <Card.Img
                              src={
                                movie.profile_path
                                  ? `https://image.tmdb.org/t/p/w500${movie.profile_path}`
                                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
                              }
                              className="search-img"
                            ></Card.Img>
                            <Card.Body className="search-content">
                              <Card.Text className="search-name">
                                {movie.name}
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Link>
                      );
                    }
                  })}
                </Row>
              </div>
            </div>
          )}
        </div>
      )}
      {/* All Trending */}
      <Container className="trending-container">
        <h1 className="trending-head">Trending Now</h1>
        <button
          className="right-btn"
          onClick={() => {
            scrollRight(0);
          }}
        >
          <i class="bi bi-arrow-right-circle"></i>
        </button>
        <button
          className="left-btn"
          onClick={() => {
            scrollLeft(0);
          }}
        >
          <i class="bi bi-arrow-left-circle"></i>
        </button>
        <div className="trending-list" ref={scrollRefs[0]}>
          {trending.map((movie) => {
            if (movie.media_type === "movie") {
              return (
                <Link to={`/movie/${movie.id}`}>
                  <div className="trending-item">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      className="trending-img"
                      alt={movie.title}
                    ></img>
                    <div className="trending-content">
                      <p className="trending-name">{movie.title}</p>
                      <p className="trending-date">{movie.release_date}</p>
                    </div>
                    <div className="rating-container">
                      <i className="bi bi-star-fill star"></i>
                      <p className="rating">{movie.vote_average.toFixed(1)}</p>
                    </div>
                  </div>
                </Link>
              );
            } else if (movie.media_type === "tv") {
              return (
                <Link to={`/tvshows/${movie.id}`}>
                  <div className="trending-item">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      className="trending-img"
                      alt={movie.title}
                    ></img>
                    <div className="trending-content">
                      <p className="trending-name">{movie.name}</p>
                      <p className="trending-date">{movie.first_air_date}</p>
                    </div>
                    <div className="rating-container">
                      <i className="bi bi-star-fill star"></i>
                      <p className="rating">{movie.vote_average.toFixed(1)}</p>
                    </div>
                  </div>
                </Link>
              );
            }
          })}
        </div>
      </Container>
      {/* Trending Movies */}
      <Container className="trending-container">
        <h1 className="trending-head">Trending Movies</h1>
        <button
          className="right-btn"
          onClick={() => {
            scrollRight(1);
          }}
        >
          <i class="bi bi-arrow-right-circle"></i>
        </button>
        <button
          className="left-btn"
          onClick={() => {
            scrollLeft(1);
          }}
        >
          <i class="bi bi-arrow-left-circle"></i>
        </button>
        <div className="trending-list" ref={scrollRefs[1]}>
          {trendingMovies.map((movie) => {
            return (
              <Link to={`/movie/${movie.id}`}>
                <div className="trending-item">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className="trending-img"
                    alt={movie.title}
                  ></img>
                  <div className="trending-content">
                    <p className="trending-name">{movie.title}</p>
                    <p className="trending-date">{movie.release_date}</p>
                  </div>
                  <div className="rating-container">
                    <i className="bi bi-star-fill star"></i>
                    <p className="rating">{movie.vote_average.toFixed(1)}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
      {/* Popular Movies */}
      <Container className="trending-container">
        <h1 className="trending-head">Popular Movies</h1>
        <button
          className="right-btn"
          onClick={() => {
            scrollRight(2);
          }}
        >
          <i class="bi bi-arrow-right-circle"></i>
        </button>
        <button
          className="left-btn"
          onClick={() => {
            scrollLeft(2);
          }}
        >
          <i class="bi bi-arrow-left-circle"></i>
        </button>
        <div className="trending-list" ref={scrollRefs[2]}>
          {popularMovies.map((movie) => {
            return (
              <Link to={`/movie/${movie.id}`}>
                <div className="trending-item">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className="trending-img"
                    alt={movie.title}
                  ></img>
                  <div className="trending-content">
                    <p className="trending-name">{movie.title}</p>
                    <p className="trending-date">{movie.release_date}</p>
                  </div>
                  <div className="rating-container">
                    <i className="bi bi-star-fill star"></i>
                    <p className="rating">{movie.vote_average.toFixed(1)}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
      {/* Trending Shows */}
      <Container className="trending-container">
        <button
          className="right-btn"
          onClick={() => {
            scrollRight(3);
          }}
        >
          <i class="bi bi-arrow-right-circle"></i>
        </button>
        <button
          className="left-btn"
          onClick={() => {
            scrollLeft(3);
          }}
        >
          <i class="bi bi-arrow-left-circle"></i>
        </button>
        <h1 className="trending-head">Trending TV shows</h1>
        <div className="trending-list" ref={scrollRefs[3]}>
          {trendingtv.map((movie) => {
            return (
              <Link to={`/tvshows/${movie.id}`}>
                <div className="trending-item">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className="trending-img"
                    alt={movie.name}
                  ></img>
                  <div className="trending-content">
                    <p className="trending-name">{movie.name}</p>
                    <p className="trending-date">{movie.first_air_date}</p>
                  </div>
                  <div className="rating-container">
                    <i className="bi bi-star-fill star"></i>
                    <p className="rating">{movie.vote_average.toFixed(1)}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
      {/* Popular Shows */}
      <Container className="trending-container">
        <button
          className="right-btn"
          onClick={() => {
            scrollRight(4);
          }}
        >
          <i class="bi bi-arrow-right-circle"></i>
        </button>
        <button
          className="left-btn"
          onClick={() => {
            scrollLeft(4);
          }}
        >
          <i class="bi bi-arrow-left-circle"></i>
        </button>
        <h1 className="trending-head">Popular TV shows</h1>
        <div className="trending-list" ref={scrollRefs[4]}>
          {populartv.map((movie) => {
            return (
              <Link to={`/tvshows/${movie.id}`}>

              <div className="trending-item">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="trending-img"
                  alt={movie.title}
                ></img>
                <div className="trending-content">
                  <p className="trending-name">{movie.name}</p>
                  <p className="trending-date">{movie.first_air_date}</p>
                </div>
                <div className="rating-container">
                  <i className="bi bi-star-fill star"></i>
                  <p className="rating">{movie.vote_average.toFixed(1)}</p>
                </div>
              </div>
              </Link>
            );
          })}
        </div>
      </Container>
      <div className="genre-container">
        <h1>Movies By Genre</h1>
        <div className="genre-list" ref={scrollRefs[5]}>
          <button
            className="bttn left-btn"
            onClick={() => {
              scrollLeft(5);
            }}
          >
            <i class="bi bi-chevron-left"></i>
          </button>
          {movieGenres.map((genre) => {
            return (
              <div
                className="genre-item"
                onClick={() => {
                  getGenreMovies(genre.id);
                  setGenreMoviesToggle(true);
                  resetScroll(7);
                }}
              >
                <p>{genre.name}</p>
              </div>
            );
          })}
          <button
            className="bttn right-btn"
            onClick={() => {
              scrollRight(5);
            }}
          >
            <i class="bi bi-chevron-right"></i>
          </button>
        </div>
        {genreMoviesToggle && (
          <div className="genre-movie-list" ref={scrollRefs[7]}>
            <button
              className="bttn left-btn"
              onClick={() => {
                scrollLeft(7);
              }}
            >
              <i class="bi bi-chevron-left"></i>
            </button>
            {moviesByGenre.map((movie) => {
              return (
                <Link to={`/movie/${movie.id}`}>

                <div className="genre-movie-item">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
                    }
                    alt={movie.title}
                    className="movie-img"
                  ></img>
                  <p className="movie-name">{movie.title}</p>
                  <div className="rating-container">
                    <i className="bi bi-star-fill star"></i>
                    <p className="rating">{movie.vote_average.toFixed(1)}</p>
                  </div>
                </div>
                </Link>
              );
            })}
            <button
              className="bttn right-btn"
              onClick={() => {
                scrollRight(7);
              }}
            >
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>
        )}
      </div>
      <div className="genre-container">
        <h1>Shows By Genre</h1>
        <div className="genre-list" ref={scrollRefs[6]}>
          <button
            className="bttn left-btn"
            onClick={() => {
              scrollLeft(6);
            }}
          >
            <i class="bi bi-chevron-left"></i>
          </button>
          {tvGenres.map((genre) => {
            return (
              <div
                className="genre-item"
                onClick={() => {
                  getGenreShows(genre.id);
                  setGenreShowsToggle(true);
                  resetScroll(8);
                }}
              >
                <p>{genre.name}</p>
              </div>
            );
          })}
          <button
            className="bttn right-btn"
            onClick={() => {
              scrollRight(6);
            }}
          >
            <i class="bi bi-chevron-right"></i>
          </button>
        </div>
        {genreShowsToggle && (
          <div className="genre-movie-list" ref={scrollRefs[8]}>
            <button
              className="bttn left-btn"
              onClick={() => {
                scrollLeft(8);
              }}
            >
              <i class="bi bi-chevron-left"></i>
            </button>
            {showsByGenre.map((movie) => {
              return (
                <Link to={`/tvshows/${movie.id}`}>
                <div className="genre-movie-item">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
                    }
                    alt={movie.name}
                    className="movie-img"
                  ></img>
                  <p className="movie-name">{movie.name}</p>
                  <div className="rating-container">
                    <i className="bi bi-star-fill star"></i>
                    <p className="rating">{movie.vote_average.toFixed(1)}</p>
                  </div>
                </div>
                </Link>
              );
            })}
            <button
              className="bttn right-btn"
              onClick={() => {
                scrollRight(8);
              }}
            >
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
