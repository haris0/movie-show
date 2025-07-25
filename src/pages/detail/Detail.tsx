import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useMovieDetail } from "../../services/movie-detail/useMovieDetail";
import { useMovieCredits } from "../../services/movie-credits/useMovieCredit";
import { useMovieVideos } from "../../services/movie-videos/useMovieVideos";
import { baseBackgroundURL, basePosterCardURL, baseProfileURL } from "../../services/axios";
import { useFavoriteContext } from "../../context/FavoriteContext";

import BackIcon from "../../assets/BackIcon";
import placeholder from '../../assets/thumbnail.png';
import placeholderSquare from '../../assets/thumbnail_square.png';
import { formatDate } from "../../utils/date";
import { convertMinsToHrsMins } from "../../utils/duration";
import StarIcon from "../../assets/StarIcon";
import YoutubeEmbed from "../../components/youtube-embed/YoutubeEmbed";
import loadingIcon from '../../assets/loading.gif'
import BookmarkIcon from "../../assets/Bookmark";
import type { MovieDetail } from "../../services/movie-detail/type";

const Detail = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { addFavorite, checkFavorite, removeFavorite } = useFavoriteContext();
  const [{ data, loading }] = useMovieDetail(id);
  const [{ data: videos }] = useMovieVideos(id);
  const [{ data: credits }] = useMovieCredits(id);

  const isFavorite = useMemo(() =>checkFavorite(data?.id || 0), [checkFavorite, data?.id]);

  const officialTrailer = useMemo(() => {
    return videos?.results?.find(
      (video) => video.name.includes('Official Trailer')
              || video.name.includes('Official Teaser')
              || (video.official && video.type === 'Trailer'));
  }, [videos]);

  const handleFavorite = (movie: MovieDetail) => {
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
      <div className={`h-1 bg-[#2596be]`}/>
      <div
        className='w-full h-[25rem] bg-cover bg-center center bg-no-repeat'
        style={{
          backgroundImage: ` 
            linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
            url(${baseBackgroundURL + data?.backdrop_path})
          `,
        }}
      >
        <div className="flex w-full justify-center p-5">
          <div className="flex w-full max-w-300">
            <button type="button" className="cursor-pointer h-fit w-fit" onClick={() => navigate(-1)}>
              <BackIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="px-5 w-full flex justify-center">
        {loading && <img className="mt-10 items-center" width={50} src={loadingIcon} alt="loading" />}
      </div>
      {!loading && data && (
        <div className="flex flex-col justify-center items-center p-5 mb-10">
          <div className="w-full max-w-300">
            <div className="w-full flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <img 
                src={data?.poster_path ? `${basePosterCardURL}/${data?.poster_path}` : placeholder} 
                alt={data?.title}
                className="rounded-xl w-52 -mt-42"
              />
              <div className="flex flex-col gap-1.5 items-center sm:items-start">
                <div className="flex gap-2 items-center">
                  <p className="text-2xl font-bold text-center">
                    {data?.title} ({data?.release_date.split('-')[0]})
                  </p>
                  <button 
                    type="button" 
                    className="w-fit h-fit cursor-pointer mt-1"
                    onClick={() => isFavorite ? removeFavorite(data.id) : handleFavorite(data)}
                  >
                    <BookmarkIcon 
                      className={`w-6 opacity-80`}
                      fill={isFavorite ? '#2596be' : 'grey'}
                    />
                  </button>
                </div>
                <div className="text-center sm:text-left">
                  <span>
                    {formatDate(data?.release_date)} ({
                      data?.production_companies[data?.production_companies.length - 1]?.origin_country
                    })
                  </span>
                  <span className=""> • </span>
                  {data?.genres.map((genre, idx) => (
                    <span key={genre.id}>
                      {genre.name}
                      {data?.genres.length !== (idx + 1) && (
                        <span>,{' '}</span>
                      )}
                    </span>
                  ))}
                  <span> • </span>
                  <span>{convertMinsToHrsMins(data?.runtime)}</span>
                </div>
                <div className="flex gap-1 text-center">
                  <StarIcon />
                  {data?.vote_average?.toFixed(1)}
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col mt-8 gap-2">
              <p className="text-xl font-bold">Overview</p>
              <p className="italic text-gray-500">{data?.tagline}</p>
              <p>{data?.overview}</p>
            </div>
            <div className="w-full flex flex-col mt-8 gap-2">
              <p className="text-xl font-bold">Top Billed Cast</p>
              <div className="flex flex-row overflow-x-auto gap-3">
                {credits?.cast?.map((cast) => (
                  <div key={cast.id} className="min-w-38 flex flex-col gap-1 mb-3">
                    <img
                      src={cast?.profile_path ? `${baseProfileURL}/${cast.profile_path}` : placeholderSquare}
                      alt={cast?.name}
                      className="object-cover rounded-2xl"
                    />
                    <div>
                      <p>{cast.name}</p>
                      <p className="text-xs text-gray-500">{cast.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {officialTrailer && (
              <div className="w-full flex flex-col mt-8 gap-2">
                <p className="text-xl font-bold">Trailer</p>
                <YoutubeEmbed embedid={officialTrailer?.key} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
