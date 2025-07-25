import type { Movie } from "../../types/movie"

export interface SearchMovie {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}
