import { useState, useEffect, useContext } from "react";
// import { useTypeData } from "hooks";
import PokemonContext, { PokemonContextType } from "context/PokemonContext";

const FilterField = ({ setGridView, numGrid }: FilterFieldProps) => {
  // const { typeOptions } = useTypeData();
  // const [typeFilter, setTypeFilter2] = useState("");
  const [sortAsc, setSortAsc] = useState(
    localStorage.getItem("sortDirection") === "asc" ? true : false
  );
  const [selectedSort, setSelectedSort] = useState(
    localStorage.getItem("sortByField") || "default"
  );
  const { setSortByField }: PokemonContextType = useContext(PokemonContext);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setSelectedSort(e.target.value);
  };

  useEffect(() => {
    setSortByField(selectedSort + " " + (sortAsc ? "asc" : "desc"));
    localStorage.setItem("sortByField", selectedSort);
    localStorage.setItem("sortDirection", sortAsc ? "asc" : "desc");
  }, [selectedSort, sortAsc]);

  // const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   if (e.target.value.length >= 3) {
  //     setTypeFilter2(e.target.value);
  //     console.log(typeFilter);
  //   }
  // };

  return (
    <div className="flex justify-between px-5 py-4 w-full">
      {/* <input
        className="px-4 py-[6px] text-sm rounded-lg w-2/3 bg-chronicle text-velvet-robe"
        list="type-list"
        placeholder="Input pokemon type"
        onFocus={(e) => (e.currentTarget.value = "")}
        onChange={() => handleFilterChange}
      />
      <datalist id="type-list">
        <option key="all" value="All" />
        {typeOptions}
      </datalist> */}
      {/* input sort by default, name, atk, def, hp */}
      <div className="w-5/6 flex gap-1 text-velvet-robe">
        <button
          className={`w-1/6 h-9 py-2 px-5 text-sm rounded-lg grid grid-cols-2 gap-1 ${
            numGrid ? "bg-chronicle-dark" : "bg-chronicle"
          }`}
          onClick={() => setSortAsc(!sortAsc)}
        >
          {sortAsc ? "↓" : "↑"}
        </button>

        <select
          className="px-4 py-[6px] text-sm rounded-lg w-2/3 bg-chronicle"
          value={selectedSort}
          onChange={handleSortChange}
        >
          <option value="default">Default</option>
          <option value="name">Name</option>
          <option value="hp">Hp</option>
          <option value="atk">Atk</option>
          <option value="def">Def</option>
        </select>
      </div>

      <div className="w-1/4 flex justify-end">
        <button
          className={`w-1/2 h-9 py-3 px-5 text-sm rounded-l-lg grid grid-cols-2 gap-1 ${
            numGrid ? "bg-chronicle-dark" : "bg-chronicle"
          }`}
          onClick={() => setGridView(true)}
        >
          <div className="w-3 h-3 bg-velvet-robe"></div>
        </button>
        <button
          className={`w-1/2 py-3 px-5 text-sm rounded-r-lg grid grid-cols-2 gap-1 
          ${numGrid ? "bg-chronicle" : "bg-chronicle-dark"}`}
          onClick={() => setGridView(false)}
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
