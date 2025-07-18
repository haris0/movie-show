import useAxios from "axios-hooks";

import '../axios'
import type { Cast } from "./type";

export const useMovieCredits = (id: string) => {
  return useAxios<{
    cast: Cast[],
    crew: Cast[],
  }>(`/movie/${id}/credits`);
}
