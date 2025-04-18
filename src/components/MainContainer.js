import React from "react";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { useSelector } from "react-redux";
const MainContainer = () => {
  const movies = useSelector((store) => store?.movies?.NowPlayingMovies);
  if (!movies) return null;
  const mainMovie = movies[5];
  // add this above
 // console.log(mainMovie);
    const {original_title,overview,id} = mainMovie;
    return (
      <div className="pt-[30%] bg-black md:pt-0">
        <VideoTitle title={original_title} overview={overview} />
        <VideoBackground movieId={id} />
      </div>
    );
  };

export default MainContainer;
