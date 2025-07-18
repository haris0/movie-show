import useAxios from "axios-hooks";
import type { Video } from "./type";

import '../axios'

export const useMovieVideos = (id: string) => {
  return useAxios<{
    id: number;
    results: Video[]
  }>(`/movie/${id}/videos`);
}
