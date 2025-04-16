// import { useSelector } from "react-redux";
// import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
// import usePopularMovies from "../hooks/UsePopularMovies";
// import useTopRatedMovies from "../hooks/useTopRatedMovies";
// import useTrendingMovies from "../hooks/useTrendingMovies";
// import useUpcomingMovies from "../hooks/useUpcomingMovies";
// import Header from "./Header";
// import MainContainer from "./MainContainer";
// import SecondaryContainer from "./SecondaryContainer";
// import GptSearch from "./GptSearch";

// const Browse = () => {
//   const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

//   useNowPlayingMovies();
//   usePopularMovies();
//   useUpcomingMovies();
//   useTrendingMovies();
//   useTopRatedMovies();
//   return (
//     <div className="relative h-screen w-screen">
//       {/* <div className="absolute inset-0"> */}
//       <Header />
//       {showGptSearch ? (
//         <GptSearch />
//       ) : (
//         <>
//           <MainContainer />
//           <SecondaryContainer />
//         </>
//       )}
//       {/* </div> */}
//     </div>
//   );
// };

// export default Browse;


// Browse.js
import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/UsePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GptSearch from "./GptSearch";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  useNowPlayingMovies();
  usePopularMovies();
  useUpcomingMovies();
  useTrendingMovies();
  useTopRatedMovies();

  return (
    <>
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </>
  );
};

export default Browse;
