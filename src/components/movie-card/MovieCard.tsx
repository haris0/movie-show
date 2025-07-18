import { Link } from "react-router-dom";
import { basePosterCardURL } from "../../services/axios";
import placeholder from '../../assets/thumbnail.png'
import StarIcon from "../../assets/StarIcon";
import BookmarkIcon from "../../assets/Bookmark";

interface MovieCardProps {
  id: number;
  title?: string;
  overview?: string;
  coverUrl?: string;
  voteAverage?: number;
  release?: string;
  onFavorite?: (action: 'add' | 'remove') => void;
  isFavorite?: boolean;
}

const MovieCard = ({
  id,
  title,
  coverUrl,
  overview,
  voteAverage,
  release,
  onFavorite,
  isFavorite,
}: MovieCardProps) => {
  return (
    <Link to={`/${id}`}>
      <div className="flex gap-4">
        <div className="relative min-w-43">
          <img 
            src={coverUrl ? `${basePosterCardURL}/${coverUrl}` : placeholder} 
            alt={title}
            className="rounded-xl w-43"
          />
          <button 
            type="button" 
            className="w-fit h-fit cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onFavorite?.(isFavorite ? 'remove' : 'add')
            }}
          >
            <BookmarkIcon 
              className={`absolute top-2 left-2 w-6 opacity-80`}
              fill={isFavorite ? '#2596be' : 'grey'}
            />
          </button>
        </div>
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
