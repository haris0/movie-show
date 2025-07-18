import BackIcon from "../../assets/BackIcon";

interface PaginationButtonProps {
  currentPage: number;
  totalPage: number;
  onClickPageChange: (type: 'next' | 'back') => void;
}

const PaginationButton = ({
  currentPage,
  totalPage,
  onClickPageChange,
}: PaginationButtonProps) => {
  return (
    <div className="flex gap-2 justify-center mb-5">
      {currentPage > 1 && (
        <button 
          type="button" 
          className="text-gray-900 flex items-center gap-2 cursor-pointer w-fit justify-self-center bg-white border border-gray-300 focus:outline-none rounded-lg text-sm px-3 py-2.5"
          onClick={() => onClickPageChange('back')}
        >
          <BackIcon color="#000000" width={20}/>
          Back
        </button>
      )}
      {currentPage < totalPage && (
        <button 
          type="button" 
          className="text-gray-900 cursor-pointer flex items-center gap-2 w-fit justify-self-center bg-white border border-gray-300 focus:outline-none rounded-lg text-sm px-3 py-2.5"
          onClick={() => onClickPageChange('next')}
        >
          Next
          <BackIcon color="#000000" width={20} className="rotate-180"/>
        </button>
      )}
    </div>
  );
};

export default PaginationButton;
