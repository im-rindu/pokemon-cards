import { useEffect, useState, useContext } from "react";
import PageButton from "./PageButton";
import PokemonContext, { PokemonContextType } from "context/PokemonContext";

function Pagination() {
  const [page, setPage] = useState(1);
  const totalPages =
    parseInt(localStorage.getItem("totalPages") || "1", 10) + 1;
  const { setCurrentPage }: PokemonContextType = useContext(PokemonContext);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-around">
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm bg-brilliant-white cursor-pointer">
            <PageButton page="prev" setPage={setPage} currentPage={page} />

            {[...Array(totalPages).keys()]
              .filter((i) => i <= page + 3 && i >= Math.max(1, page - 3))
              .map((i) => (
                <PageButton
                  key={i}
                  page={i.toString()}
                  setPage={setPage}
                  currentPage={page}
                />
              ))}

            <PageButton page="next" setPage={setPage} currentPage={page} />
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
