import { Link } from "react-router-dom";
import MovieCard from "../../components/movie-card/MovieCard";
import { primaryColor } from "../../constans";
import { useFavoriteContext } from "../../context/FavoriteContext";
import type { Favorite } from "../../types/favorite";
import BackIcon from "../../assets/BackIcon";

const Favorite = () => {
  const { addFavorite, checkFavorite, removeFavorite, favorites } = useFavoriteContext();

  const handleFavorite = (movie: Favorite) => {
    addFavorite({
      id: movie.id,
      title: movie.title,
      posterPath: movie.posterPath,
      overview: movie.overview,
      releaseDate: movie.releaseDate,
      voteAverage: movie.voteAverage
    })
  }
  
  return (
    <div>
      <header className={`h-40 bg-[${primaryColor}] rounded-b-4xl`}>
        <div className="flex flex-col h-full w-full p-5 items-center">
          <div className="w-full max-w-300">
            <Link to={'..'} >
              <button type="button" className="cursor-pointer h-fit w-fit">
                <BackIcon />
              </button>
            </Link>
            <div className="flex justify-center mt-3">
              <p className="text-3xl text-white">Favorite Movie</p>
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-col items-center p-5 mt-5">
        <div className="w-full max-w-300">
          {favorites.length > 0 ? (
            <div className="mb-8 gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
              {favorites.map((movie) => (
                <MovieCard 
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  overview={movie.overview}
                  coverUrl={movie.posterPath}
                  voteAverage={movie.voteAverage}
                  release={movie.releaseDate}
                  onFavorite={
                    (action) => action === 'add' 
                      ? handleFavorite(movie) 
                      : removeFavorite(movie.id)
                  }
                  isFavorite={checkFavorite(movie.id)}
                />
              ))}
            </div>
          ) : (
            <p className="self-center text-center text-2xl mt-5 text-gray-400">Belum ada Favorite</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorite;
