import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useMovieList } from "../../services/movie-list/useMovieList";
import type { CategoryType } from "../../services/movie-list/type";
import SearchFilter from "../../components/search-filter/SearchFilter";

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
      <div className="px-5">
        {loading && <p>Loading...</p>}
        {!loading && data && (
          <ul>
            {data.results.map((movie) => (
              <li key={movie.id} className="mb-2">
                <a href={`/${movie.id}`} className="text-blue-500 hover:underline">
                  {movie.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
