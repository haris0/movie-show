import useAxios from "axios-hooks";
import type { MovieDetail } from "./type";

import '../axios'

export const useMovieDetail = (id: string) => {
  return useAxios<MovieDetail>(`/movie/${id}`);
}
