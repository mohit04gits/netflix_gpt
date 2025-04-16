import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  //console.log(movies)
  return (
    movies.NowPlayingMovies && (
      <div className="bg-black">
     <div className=" mt-0 md:-mt-52 pl-4 md:pl-12 relative z-20">
        
        <MovieList title={"Now Playing"} movies={movies.NowPlayingMovies} /> </div>
        <MovieList title={"Trending"} movies={movies.trendingMovies} />
        <MovieList title={"Popular"} movies={movies.PopularMovies} />
        <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies} />
        <MovieList title={"Top Rated Movies"} movies={movies.topRatedMovies} />
      </div>
    )
  );
};

export default SecondaryContainer;



