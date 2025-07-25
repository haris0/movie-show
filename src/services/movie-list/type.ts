import type { Movie } from "../../types/movie";

export type CategoryType = 'now_playing' | 'popular' | 'top_rated' | 'upcoming';

export interface MovieListParams {
  category?: CategoryType;
  page?: number;
}

export interface Movies {
  dates: Dates
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface Dates {
  maximum: string
  minimum: string
}
