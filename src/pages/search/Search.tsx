import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMovieSearch } from "../../services/movie-search/useMovieSearch";
import loadingIcon from '../../assets/loading.gif'
import MovieCard from "../../components/movie-card/MovieCard";
import { useDebounce } from "../../hooks/useDebounce";
import PaginationButton from "../../components/pagination-button/PaginationButton";
import SearchIcon from "../../assets/SearchIcon";
import BackIcon from "../../assets/BackIcon";
import type { Movie } from "../../types/movie";
import { useFavoriteContext } from "../../context/FavoriteContext";

const Search = () => {
  const mavigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();
    const { addFavorite, checkFavorite, removeFavorite } = useFavoriteContext();

  const query = searchParams.get('keyword') || '';
  const page = Number(searchParams.get('page')) || 1;
  const [{ data, loading }] = useMovieSearch(query, page);
  const [keyword, setKeyword] = useState(query);

  const handleChangePage = (type: 'next' | 'back') => {
    setSearchParams((prevParams) => {
      let newPage;
      if(type === 'next') {
        newPage = ((data?.page || 0) + 1);
      } else {
        newPage = ((data?.page || 0) - 1);
      }
      prevParams.set('page', newPage.toString());
      return prevParams;
    })
    window.scrollTo({
      top: 0,
    });
  }

  const updateQueryParams = useDebounce((key: string) => {
    if (key) {
      setSearchParams((prev) => {
        prev.delete('page');
        prev.set('keyword', key);
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.delete('page');
        prev.delete('keyword');
        return prev;
      });
    }
  }, 700);

  const handleFavorite = (movie: Movie) => {
    addFavorite({
      id: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
      overview: movie.overview,
      releaseDate: movie.release_date,
      voteAverage: movie.vote_average
    })
  }

  return (
    <div>
      <header className={`h-20 md:h-25 bg-[#2596be] p-5 flex justify-center w-full gap-3 items-center`}>
        <div className="w-full max-w-300 flex relative gap-2 items-center">
          <button 
            type="button" 
            className="w-10 h-10 cursor-pointer rounded-full borde flex justify-center items-center"
            onClick={() => mavigate('/')}
          >
            <BackIcon />
          </button>
          <input
            name='search'
            type="text"
            className="bg-gray-50 py-2 pl-3 pr-8 placeholder-gray-500 text-gray-500 text-md rounded-xl w-full border border-slate-200 focus:outline-none" 
            placeholder="Search"
            value={keyword}
            onChange={(e) => {
              const { value } = e.target;
              setKeyword(value);
              updateQueryParams(value);
            }}
          />
          <SearchIcon 
            className="h-5 w-5 ml-1 absolute top-2.5 right-2.5" 
          />
        </div>
      </header>
      <div className="px-5 mt-10 w-full flex justify-center">
        {loading && <img className="mt-10 items-center" width={50} src={loadingIcon} alt="loading" />}
        {!loading && (data?.results.length || 0) < 1 && (
          <span className="text-xl mt-10">Tidak ada hasil pencarian</span>
        )}
      </div>
      <div className="flex justify-center flex-col items-center px-5">
        {!loading && data?.results && (
          <>
            <div className="w-full max-w-300 mb-8 gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
              {data.results?.map((movie) => (
                <MovieCard 
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  overview={movie.overview}
                  coverUrl={movie.backdrop_path}
                  voteAverage={movie.vote_average}
                  release={movie.release_date}
                  isFavorite={checkFavorite(movie.id)}
                  onFavorite={
                    (action) => action === 'add' 
                      ? handleFavorite(movie) 
                      : removeFavorite(movie.id)
                  }
                />
              ))}
            </ div>
            <PaginationButton
              currentPage={data?.page || 0}
              totalPage={data?.total_pages || 0}
              onClickPageChange={handleChangePage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
