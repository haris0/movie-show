import { useParams } from "react-router-dom";
import { useMovieDetail } from "../../services/movie-detail/useMovieDetail";

const Detail = () => {
  const { id = '' } = useParams();
  const [{ data, loading }] = useMovieDetail(id);

  return (
    <div>
      Detail Page for ID: {id}
      {loading && <p>Loading...</p>}
      {!loading && data && (
        <pre>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default Detail;
