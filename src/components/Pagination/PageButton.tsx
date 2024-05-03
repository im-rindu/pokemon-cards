function PageButton({ page, setPage, currentPage = 1 }: PageButtonProps) {
  let button;
  if (page === "prev") {
    button = (
      <a
        onClick={() => setPage(1)}
        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
    );
  } else if (page === "next") {
    button = (
      <a
        onClick={() =>
          setPage(parseInt(localStorage.getItem("totalPages") || "1"))
        }
        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
    );
  } else {
    button = (
      <span>
        <a
          onClick={() => setPage(parseInt(page, 10))}
          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
            currentPage === parseInt(page, 10)
              ? "bg-chronicle text-velvet-robe"
              : ""
          }`}
        >
          {page}
        </a>
      </span>
    );
  }
  return button;
}

interface PageButtonProps {
  page: string;
  setPage: (page: number) => void;
  currentPage: number;
}

export default PageButton;
