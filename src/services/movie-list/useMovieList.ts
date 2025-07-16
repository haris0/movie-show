import useAxios from "axios-hooks"
import type { MovieListParams, Movies } from "./type";

import '../axios'

export const useMovieList = (params?: MovieListParams) => {
  const { category = 'now_playing', page = 1 } = params || {};

  return useAxios<Movies>({
    url: `/movie/${category}`,
    params: {
      language: 'en-US',
      page,
    }
  });
}
