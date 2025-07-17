import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useMovieList } from "../../services/movie-list/useMovieList";
import type { CategoryType } from "../../services/movie-list/type";
import SearchFilter from "../../components/search-filter/SearchFilter";
import MovieCard from "../../components/movie-card/MovieCard";
import loadingIcon from '../../assets/loading.gif'

const Home = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = (searchParams.get('category') as CategoryType) || 'now_playing';
  
  const [page] = useState(1);
  const [keyword, setKeyword] = useState('');

  const [{ data, loading }] = useMovieList({
    category,
    page,
  });

  const handleChangeCategory = (category: CategoryType) => {
    setSearchParams((prevParams) => {
      prevParams.set('category', category);
      return prevParams;
    })
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      navigate(`/search?keyword=${keyword}`)
    }
  };

  return (
    <div>
      <header className="h-60 bg-[#2596be]" />
      <SearchFilter 
        keyword={keyword}
        setKeyword={(key) => setKeyword(key)}
        handleKeyDown={handleKeyDown}
        category={category}
        handleChangeCategory={handleChangeCategory}
      />
      <div className="mx-5 max-w-300 flex justify-center">
        {loading && <img className="mt-10" width={50} src={loadingIcon} alt="loading" />}
      </div>
      <div className="flex justify-center">
        <div className="mx-5 w-full max-w-300 mb-10 gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
          {!loading && data && data.results.map((movie) => (
            <MovieCard 
              id={movie.id}
              title={movie.title}
              overview={movie.overview}
              coverUrl={movie.backdrop_path}
              voteAverage={movie.vote_average}
              release={movie.release_date}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
