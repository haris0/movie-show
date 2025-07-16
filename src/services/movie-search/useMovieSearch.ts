import useAxios from "axios-hooks";
import type { SearchMovie } from "./type";

import '../axios'

export const useMovieSearch = (query: string, page: number = 1) => {
  return useAxios<SearchMovie>({
    url: '/search/movie',
    params: {
      include_adult: false,
      language: 'en-US',
      query,
      page,
    }
  });
}
