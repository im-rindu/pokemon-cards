const FilterField = ({ setGridView, numGrid }: FilterFieldProps) => {
  function gridView({ gridView }: { gridView: boolean }) {
    setGridView(gridView);
  }

  return (
    <div className="flex justify-between px-5 py-4 w-full">
      <select id="sort-by" className="px-4 py-[6px] text-sm rounded-lg w-2/3">
        <option value="default">Default</option>
        <option value="name">Name</option>
        <option value="health">Health</option>
        <option value="attack">Attack</option>
        <option value="defense">Defense</option>
      </select>
      <div className="w-1/4 flex justify-end">
        <button
          className={`w-1/2 h-9 py-3 px-5 text-sm rounded-l-lg grid grid-cols-2 gap-1 ${
            numGrid ? "bg-chronicle-dark" : "bg-chronicle"
          }`}
          onClick={() => gridView({ gridView: true })}
        >
          <div className="w-3 h-3 bg-velvet-robe"></div>
        </button>
        <button
          className={`w-1/2 py-3 px-5 text-sm rounded-r-lg grid grid-cols-2 gap-1 
          ${numGrid ? "bg-chronicle" : "bg-chronicle-dark"}`}
          onClick={() => gridView({ gridView: false })}
        >
          <div className="w-1 h-1 bg-velvet-robe"></div>
          <div className="w-1 h-1 bg-velvet-robe"></div>
          <div className="w-1 h-1 bg-velvet-robe"></div>
          <div className="w-1 h-1 bg-velvet-robe"></div>
        </button>
      </div>
    </div>
  );
};

interface FilterFieldProps {
  setGridView: (gridView: boolean) => void;
  numGrid: boolean;
}

export default FilterField;
