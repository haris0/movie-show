import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMovieSearch } from "../../services/movie-search/useMovieSearch";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [page] = useState(1);

  const keyword = searchParams.get('keyword') || '';
  const [{ data, loading }] = useMovieSearch(keyword, page);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Search Result</h1>
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
  );
};

export default Search;
