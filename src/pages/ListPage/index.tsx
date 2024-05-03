import { useState } from "react";
import {
  Card,
  Header,
  MobileWrapper,
  FilterField,
  Pagination,
} from "components";
import { usePokemonList } from "hooks";

const ListPage: React.FC = () => {
  const [numGrid, setGridView] = useState<boolean>(false);
  const { pokemonList, loading, error, searchQuery } = usePokemonList();
  console.log(searchQuery);
  if (error) return <div>Something is wrong :(</div>;
  return (
    <MobileWrapper>
      <Header withSearch />
      <FilterField setGridView={setGridView} numGrid={numGrid} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div
          className={`px-5 py-4 grid ${
            numGrid ? "grid-cols-1" : "grid-cols-2"
          } gap-5`}
        >
          {pokemonList.map((each, index) => (
            <Card key={index} name={each.name} />
          ))}
        </div>
      )}
      <Pagination />
    </MobileWrapper>
  );
};

export default ListPage;
