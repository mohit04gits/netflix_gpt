import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import useMovieTrailer from "../hooks/useMovieTrailer";

const MovieTrailer = () => {
  const { id } = useParams();          
  const navigate = useNavigate();
  useMovieTrailer(id);                 
  const trailer = useSelector((s) => s.movies.trailerVideo);

  const src = trailer
    ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1&controls=0&modestbranding=0&rel=0&iv_load_policy=3`
    : "";

  if (!trailer) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <p className="text-white text-lg animate-pulse">Loading trailer…</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-2">
      {/* Close button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-red-500"
      >
        ✕
      </button>

      {/* Video Container */}
      <div className="w-full max-w-7xl max-h-[90vh] aspect-video rounded-xl overflow-hidden shadow-2xl">
        <iframe
          className="w-full h-full"
          src={src}
          title="Movie Trailer"
          frameBorder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default MovieTrailer;
