import { useNavigate, useSearchParams } from "react-router-dom";
import { useMovieSearch } from "../../services/movie-search/useMovieSearch";
import loadingIcon from '../../assets/loading.gif'
import MovieCard from "../../components/movie-card/MovieCard";
import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";

const Search = () => {
  const mavigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();

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

  return (
    <div>
      <header className="h-20 md:h-25 bg-[#2596be] p-5  flex justify-center w-full gap-3 items-center" >
        <div className="w-full max-w-300 flex relative gap-2 items-center">
          <button 
            type="button" 
            className="w-10 h-10 cursor-pointer rounded-full borde flex justify-center items-center"
            onClick={() => mavigate(-1)}
          >
            <svg viewBox="0 0 1024 1024" width={35} xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#ffffff" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path><path fill="#ffffff" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path></g></svg>
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
          <svg 
            viewBox="0 0 24 24"
            className="h-5 w-5 ml-1 absolute top-2.5 right-3.5" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g>
          </svg>
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
                />
              ))}
            </ div>
            <div className="flex gap-2 justify-center mb-5">
              {(data?.page || 0) > 1 && (
                <button 
                  type="button" 
                  className="text-gray-900 cursor-pointer w-fit justify-self-center bg-white border border-gray-300 focus:outline-none rounded-lg text-sm px-5 py-2.5"
                  onClick={() => handleChangePage('back')}
                >
                  Back
                </button>
              )}
              {(data?.page || 0) < (data?.total_pages || 0) && (
                <button 
                  type="button" 
                  className="text-gray-900 cursor-pointer w-fit justify-self-center bg-white border border-gray-300 focus:outline-none rounded-lg text-sm px-5 py-2.5"
                  onClick={() => handleChangePage('next')}
                >
                  Next"
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
