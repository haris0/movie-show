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
      <div className="bg-white rounded-xl border border-slate-200 border-b-blue-100 p-5 w-full m-5 -mt-12 gap-4 flex flex-col">
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
          <svg 
            viewBox="0 0 24 24"
            className="h-5 w-5 ml-1 absolute top-2 right-2.5" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g>
          </svg>
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
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-1 absolute top-2.5 right-2.5"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 5L10 5M10 5C10 6.10457 10.8954 7 12 7C13.1046 7 14 6.10457 14 5M10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5M14 5L20 5M4 12L16 12M16 12C16 13.1046 16.8954 14 18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12ZM8 19L20 19M8 19C8 17.8954 7.10457 17 6 17C4.89543 17 4 17.8954 4 19C4 20.1046 4.89543 21 6 21C7.10457 21 8 20.1046 8 19Z" stroke="#737373" strokeWidth="1.5" strokeLinecap="round"></path> </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
