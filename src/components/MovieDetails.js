import { Link, Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IMG_CDN_URL } from "../utils/constants";

const MovieDetails = () => {
  const { id } = useParams();
  const movies = useSelector((store) => store.movies);

  const allMovies = [
    ...(movies?.nowPlayingMovies || []),
    ...(movies?.popularMovies || []),
    ...(movies?.topRatedMovies || []),
    ...(movies?.upcomingMovies || []),
    ...(movies?.trendingMovies || []),
  ];

  const movie = allMovies.find((m) => m.id.toString() === id);

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <div className="text-2xl font-semibold text-gray-700">
          Movie not found!
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-8">
      {/* Poster */}

      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={IMG_CDN_URL + movie.poster_path}
          alt={movie.original_title}
          className="rounded-2xl shadow-2xl w-80 md:w-96 object-cover"
        />
      </div>

      {/* Details */}
      <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-12 text-white">
        <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
        <p className="text-xl text-yellow-400 mb-6">
          ⭐ {movie.vote_average}/10
        </p>
        <p className="text-lg text-gray-300">{movie.overview}</p>

        {/* Extra info (optional) */}
        <div className="mt-6">
          {/* <Link to={`trailer/${id}`}> */}
          <Link to={`/browse/movietrailer/${movie.id}`}>
            <button className="px-6 py-3 bg-red-600 hover:bg-red-700 transition rounded-full text-lg font-semibold">
              Watch Trailer
            </button>
          </Link>

          {/* </Link> */}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetails;
