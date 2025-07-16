import useAxios from "axios-hooks";
import type { MovieDetail } from "./type";

export const useMovieDetail = (id: string) => {
  return useAxios<MovieDetail>(`/movie/${id}`);
}
