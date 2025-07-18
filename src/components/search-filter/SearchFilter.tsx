import FilterIcon from "../../assets/FilterIcon";
import SearchIcon from "../../assets/SearchIcon";
import type { CategoryType } from "../../services/movie-list/type";

interface SearchFilterProps {
  keyword?: string;
  setKeyword?: (keyword: string) => void;
  handleKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  category: CategoryType;
  handleChangeCategory: (category: CategoryType) => void
}

const SearchFilter = ({
  keyword,
  setKeyword,
  handleKeyDown,
  category,
  handleChangeCategory
}: SearchFilterProps) => {
  return (
    <div className="w-full rounded-t-4xl -mt-8 min-h-20 bg-white flex justify-center">
      <div className="bg-white rounded-xl border border-slate-200 border-b-blue-100 p-5 w-full m-5 max-w-300 -mt-10 gap-4 flex flex-col">
        <div className="relative">
          <input
            name='search'
            type="text"
            className="bg-gray-50 p-2 pr-8 placeholder-gray-500 text-gray-500 text-sm rounded-lg w-full border border-slate-200 focus:outline-none" 
            placeholder="Search"
            value={keyword}
            onChange={(e) => setKeyword?.(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <SearchIcon
            className="h-5 w-5 ml-1 absolute top-2 right-2.5" 
          />
        </div>
        <div className="relative">
          <select
            name='category'
            className="bg-gray-50 p-2 text-gray-500 text-sm rounded-lg w-full border border-slate-200 focus:outline-none appearance-none cursor-pointer"
            value={category}
            onChange={(e) => handleChangeCategory(e.target.value as CategoryType)}
          >
            <option value="now_playing">Now Playing</option>
            <option value="popular">Popular</option>
            <option value="top_rated">Top Rated</option>
            <option value="upcoming">Upcoming</option>
          </select>
          <FilterIcon />
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
