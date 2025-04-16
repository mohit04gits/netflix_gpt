import { IMG_CDN_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const MovieCard = ({ id, posterPath }) => {
  if (!posterPath) return null;

  return (
    <div>
      <Link to={`/browse/moviedetails/${id}`}>
        <div className="w-36 md:w-48 pr-4">
          <img alt="Movie Card" src={IMG_CDN_URL + posterPath} />
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
