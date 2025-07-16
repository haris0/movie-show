import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useMovieList } from "../../services/movie-list/useMovieList";
import type { CategoryType } from "../../services/movie-list/type";

const Home = () => {
  const [searchParams] = useSearchParams();
  const [page] = useState(1);
  
  const category = (searchParams.get('category') as CategoryType) || 'now_playing';

  const [{ data, loading }] = useMovieList({
    category,
    page,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Movie List</h1>
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

export default Home;
