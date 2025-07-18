import { Link } from "react-router-dom";
import { basePosterCardURL } from "../../services/axios";
import placeholder from '../../assets/thumbnail.png'
import StarIcon from "../../assets/StarIcon";

interface MovieCardProps {
  id: number;
  title?: string;
  overview?: string;
  coverUrl?: string;
  voteAverage?: number;
  release?: string;
}

const MovieCard = ({
  id,
  title,
  coverUrl,
  overview,
  voteAverage,
  release
}: MovieCardProps) => {
  return (
    <Link to={`/${id}`}>
      <div className="flex gap-4">
        <img 
          src={coverUrl ? `${basePosterCardURL}/${coverUrl}` : placeholder} 
          alt={title}
          className="rounded-xl w-43"
        />
        <div className="py-6 flex flex-col gap-1">
          <p className="text-lg font-bold">{title}</p>
          <p>{release?.split('-')[0]}</p>
          <p className="text-xs text-gray-400 line-clamp-5">{overview}</p>
          <div className="flex gap-1">
            <StarIcon />
            {voteAverage?.toFixed(1)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
