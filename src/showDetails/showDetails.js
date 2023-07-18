import "./style.css";
import React, { useEffect, useState,useRef } from "react";
import { useParams } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function ShowDetailsPage() {
  const { showId } = useParams();
  const [showDetails, setShowDetails] = useState({});
  const [isLoadingShow, setIsLoadingShow] = useState(true);
  const [castDetails, setCastDetails] = useState([]);
  const [crewDetails, setCrewDetails] = useState([]);
  const [similar, setSimilar] = useState([]);
  const apiKey = "bb393b7476beaebaea70ee092e45bb47";
  const [isLoadingCast, setIsLoadingCast] = useState(true);
  const [isLoadingCrew, setIsLoadingCrew] = useState(true);
  const [isLoadingSimilar, setIsLoadingSimilar] = useState(true);
  const [combinedCrew, setCombinedCrew] = useState([]);
  const scrollRefs = [useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    const fetchShowData = async () => {
      try {
        const [
          showResponse,
          castResponse,
          crewResponse,
          similarResponse
        ] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/tv/${showId}?api_key=${apiKey}`
          ),
          fetch(
            `https://api.themoviedb.org/3/tv/${showId}/credits?api_key=${apiKey}`
          ),
          fetch(
            `https://api.themoviedb.org/3/tv/${showId}/credits?api_key=${apiKey}`
          ),
          fetch(
            `https://api.themoviedb.org/3/tv/${showId}/similar?api_key=${apiKey}`
          )
        ]);

        const showData = await showResponse.json();
        setShowDetails(showData);
        setIsLoadingShow(false);

        const castData = await castResponse.json();
        setCastDetails(castData.cast);
        setIsLoadingCast(false);

        const crewData = await crewResponse.json();
        setCrewDetails(crewData.crew);
        setIsLoadingCrew(false);

        const similarData = await similarResponse.json();
        setSimilar(similarData.results);
        setIsLoadingSimilar(false);

        const newCombinedCrew = combineCrewMembers(crewData.crew);
        setCombinedCrew(newCombinedCrew);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchShowData();
  }, [showId, apiKey]);

  const combineCrewMembers = (crewDetails) => {
    const combinedCrew = [];
    crewDetails.forEach((crew) => {
      const existingCrew = combinedCrew.find((c) => c.id === crew.id);
      if (existingCrew) {
        existingCrew.job.push(crew.job);
      } else {
        combinedCrew.push({
          id: crew.id,
          original_name: crew.original_name,
          profile_path: crew.profile_path,
          job: [crew.job],
        });
      }
    });
    return combinedCrew;
  };



  if (isLoadingShow) {
    return <div>Loading...</div>; // Render a loading state while showDetails is being fetched
  }

  const widt = `${Math.floor(showDetails.vote_average * 10)}%`;
  let seas = `${Object.keys(showDetails.seasons).length} Seasons`;
  
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
  return (
    <div className="show-details">
      <div className="details-container">
        <img
          src={`https://image.tmdb.org/t/p/original/${showDetails.backdrop_path}`}
          className="backdrop-img"
          alt=""
        />
        <div className="poster-container">
          <img
            src={`https://image.tmdb.org/t/p/w500/${showDetails.poster_path}`}
            className="poster-img"
            alt=""
          />
          <div className="title-container">
            <p className="title">
              {showDetails.name}
              <span className="year">
                ({showDetails.first_air_date.substring(0, 4)})
              </span>{" "}
            </p>
            <p className="date">
              {showDetails.first_air_date}
              {Object.values(showDetails.genres).map((genre) => (
                <span className="genre">{genre.name}</span>
              ))}
              <span className="duration">{seas}</span>
            </p>
            <div className="rating-container">
              <p>
                <span className="rating-text">
                  {showDetails.vote_average.toFixed(1)}
                </span>
                /10
              </p>
              <div className="rating-outer">
                <div className="rating-inner" style={{ width: widt }}></div>
              </div>
            </div>
            <p className="tagline">{showDetails.tagline}</p>
            <p className="overview">{showDetails.overview}</p>
          </div>
        </div>
      </div>
      <div className="seasons-container">
        <h1 season-head>Seasons</h1>
        <div className="season-list">
          {Object.values(showDetails.seasons).map((season, index) => {
            if (index === +Object.values(showDetails.seasons).length - 1) {
              return (
                <div
                  className="season-item"
                  style={{
                    borderStyle: "none",
                    borderWidth: "0",
                    borderColor: "transparent",
                  }}
                >
                  <img
                    src={
                      season.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${season.poster_path}`
                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
                    }
                    alt=""
                    className="season-img"
                  ></img>
                  <div className="season-content">
                    <p className="season-name">
                      {season.name}
                      {season.air_date ? (
                        <span className="year">{`(${season.air_date.substring(
                          0,
                          4
                        )})`}</span>
                      ) : (
                        ""
                      )}
                    </p>
                    <p className="season-date">
                      {season.air_date}
                      <span className="season-episodes">
                        {season.episode_count} Episodes
                      </span>
                    </p>
                    <p className="season-rating">
                      <i className="bi bi-star-fill star"></i>
                      {season.vote_average}
                      <span className="rating-text">/10</span>
                    </p>
                    <p className="season-overview">{season.overview}</p>
                  </div>
                </div>
              );
            }
            return (
              <div className="season-item">
                <img
                  src={
                    season.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${season.poster_path}`
                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
                  }
                  alt=""
                  className="season-img"
                ></img>
                <div className="season-content">
                  <p className="season-name">
                    {season.name}
                    {season.air_date ? (
                        <span className="year">{`(${season.air_date.substring(
                          0,
                          4
                        )})`}</span>
                      ) : (
                        ""
                      )}
                  </p>
                  <p className="season-date">
                    {season.air_date?season.air_date:""}
                    <span className="season-episodes">
                      {season.episode_count} Episodes
                    </span>
                  </p>
                  <p className="season-rating">
                    <i className="bi bi-star-fill star"></i>
                    {season.vote_average}
                    <span className="rating-text">/10</span>
                  </p>
                  <p className="season-overview">{season.overview}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="cast-container">
        <h1>Cast</h1>
        <div className="cast-list" ref={scrollRefs[1]}>
          <button
            className="bttn left-btn"
            onClick={() => {
              scrollLeft(1);
            }}
          >
            <i class="bi bi-chevron-compact-left"></i>
          </button>
          {castDetails.map((cast) => {
            return (
              <Link to={`/person/${cast.id}`}>
              <div className="cast-item">
                <img
                  src={
                    cast.profile_path?
                    `https://image.tmdb.org/t/p/w500/${cast.profile_path}` :
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
                  }
                  alt=""
                  className="cast-img"
                ></img>
                <div className="cast-text">
                  <p className="cast-name">{cast.original_name}</p>
                  <p className="cast-character">{cast.character}</p>
                </div>
              </div>
              </Link>
            );
          })}
          <button
            className="bttn right-btn"
            onClick={() => {
              scrollRight(1);
            }}
          >
            <i class="bi bi-chevron-compact-right"></i>
          </button>
        </div>
      </div>
      <div className="cast-container">
        <h1>Crew</h1>
        <div className="cast-list" ref={scrollRefs[0]}>
          <button
            className="bttn left-btn"
            onClick={() => {
              scrollLeft(0);
            }}
          >
            <i class="bi bi-chevron-compact-left"></i>
          </button>
          {combinedCrew.map((crew, index) => (
            <Link to={`/person/${crew.id}`}>
            <div className="cast-item" key={index}>
              <img
                src={
                  crew.profile_path?  
                  `https://image.tmdb.org/t/p/w500/${crew.profile_path}`:
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
                }
                alt=""
                className="cast-img"
              />
              <div className="cast-text">
                <p className="cast-name">{crew.original_name}</p>
                <p className="cast-character">{crew.job.join("/")}</p>
              </div>
            </div>
            </Link>
          ))}

          <button
            className="bttn right-btn"
            onClick={() => {
              scrollRight(0);
            }}
          >
            <i class="bi bi-chevron-compact-right"></i>
          </button>
        </div>
      </div>
      <div className="cast-container">
        <h1>Similar Shows</h1>
        <div className="cast-list" ref={scrollRefs[2]}>
          <button
            className="bttn left-btn"
            onClick={() => {
              scrollLeft(2);
            }}
          >
            <i class="bi bi-chevron-compact-left"></i>
          </button>
          {similar.map((movie, index) => (
            <Link to={`/tv/${movie.id}`}>
            <div className="cast-item" key={index}>
              <img
                src={
                  movie.poster_path?  
                  `https://image.tmdb.org/t/p/w500/${movie.poster_path}`:
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
                }
                alt=""
                className="cast-img"
              />
              <div className="cast-text">
                <p className="cast-name">{movie.title}</p>
              </div>
            </div>
            </Link>
          ))}

          <button
            className="bttn right-btn"
            onClick={() => {
              scrollRight(2);
            }}
          >
            <i class="bi bi-chevron-compact-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowDetailsPage;
