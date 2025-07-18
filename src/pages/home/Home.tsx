import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useMovieList } from "../../services/movie-list/useMovieList";
import type { CategoryType } from "../../services/movie-list/type";
import SearchFilter from "../../components/search-filter/SearchFilter";
import MovieCard from "../../components/movie-card/MovieCard";
import loadingIcon from '../../assets/loading.gif'
import PaginationButton from "../../components/pagination-button/PaginationButton";
import { primaryColor } from "../../constans";

const Home = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = (searchParams.get('category') as CategoryType) || 'now_playing';
  const page = Number(searchParams.get('page')) || 1;
  
  const [keyword, setKeyword] = useState('');

  const [{ data, loading }] = useMovieList({
    category,
    page,
  });

  const handleChangeCategory = (category: CategoryType) => {
    setSearchParams((prevParams) => {
      prevParams.delete('page')
      prevParams.set('category', category);
      return prevParams;
    })
  }

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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      navigate(`/search?keyword=${keyword}`)
    }
  };

  return (
    <div>
      <header className={`h-60 bg-[${primaryColor}]`}/>
      <SearchFilter 
        keyword={keyword}
        setKeyword={(key) => setKeyword(key)}
        handleKeyDown={handleKeyDown}
        category={category}
        handleChangeCategory={handleChangeCategory}
      />
      <div className="px-5 w-full flex justify-center">
        {loading && <img className="mt-10 items-center" width={50} src={loadingIcon} alt="loading" />}
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

export default Home;
