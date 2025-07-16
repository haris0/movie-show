import type { Result } from "../../types/movie"

export interface SearchMovie {
  page: number
  results: Result[]
  total_pages: number
  total_results: number
}
