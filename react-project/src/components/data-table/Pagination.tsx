export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 border border-gray-300 rounded ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-gray-50"
        }`}
      >
        Previous
      </button>

      {totalPages <= 5 ? (
        pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-3 py-1 border border-gray-300 rounded ${
              currentPage === number
                ? "bg-blue-600 text-white"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            {number}
          </button>
        ))
      ) : (
        <>
          {currentPage > 2 && (
            <button
              onClick={() => onPageChange(1)}
              className="px-3 py-1 border border-gray-300 rounded bg-white hover:bg-gray-50"
            >
              1
            </button>
          )}

          {currentPage > 3 && <span className="px-1">...</span>}

          {currentPage > 1 && (
            <button
              onClick={() => onPageChange(currentPage - 1)}
              className="px-3 py-1 border border-gray-300 rounded bg-white hover:bg-gray-50"
            >
              {currentPage - 1}
            </button>
          )}

          <button className="px-3 py-1 border border-gray-300 rounded bg-blue-600 text-white">
            {currentPage}
          </button>

          {currentPage < totalPages && (
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className="px-3 py-1 border border-gray-300 rounded bg-white hover:bg-gray-50"
            >
              {currentPage + 1}
            </button>
          )}

          {currentPage < totalPages - 2 && <span className="px-1">...</span>}

          {currentPage < totalPages - 1 && (
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-3 py-1 border border-gray-300 rounded bg-white hover:bg-gray-50"
            >
              {totalPages}
            </button>
          )}
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
        className={`px-3 py-1 border border-gray-300 rounded ${
          currentPage === totalPages || totalPages === 0
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-gray-50"
        }`}
      >
        Next
      </button>
    </div>
  );
};
