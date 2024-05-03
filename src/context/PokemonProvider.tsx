import { useEffect, useState } from "react";
import PokemonContext, { Pokemon, PokemonContextType } from "./PokemonContext";
import fetchPokemonDetails from "hooks/fetchPokemonDetail";

const LIST_LOCAL_STORAGE_NAME = "pokemonListStorage";

export const PokemonProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortByField, setSortByField] = useState<string>(
    localStorage.getItem("sortByField") || "default asc"
  );

  const MAX_FETCH_DATA = 10000;
  useEffect(() => {
    const fetchPokemonList = async () => {
      setLoading(true);
      try {
        setLoading(true);
        let filteredResults: Pokemon[];
        const storedDetail = localStorage.getItem(LIST_LOCAL_STORAGE_NAME);
        if (storedDetail && storedDetail.length > 0) {
          const parsedData: Pokemon[] = JSON.parse(storedDetail);
          filteredResults = parsedData;
        } else {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=${MAX_FETCH_DATA}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch Pokémon.");
          }
          const data = (await response.json()) as { results: Pokemon[] };
          filteredResults = data.results;
          // Do filtering based on the query string
          localStorage.setItem(
            LIST_LOCAL_STORAGE_NAME,
            JSON.stringify(filteredResults)
          );
        }

        if (searchQuery) {
          const regex = new RegExp(searchQuery, "i"); // Case-insensitive regex
          filteredResults = filteredResults.filter((pokemon) =>
            regex.test(pokemon.name)
          );
        }

        if (sortByField) {
          // split sortByField into field and direction
          const [field, direction] = sortByField.split(" ").filter(Boolean);
          const detailsMap = await Promise.all(
            filteredResults.map(async (each) => {
              const detail = await fetchPokemonDetails(each.name);
              return detail.data;
            })
          );
          let sorted = detailsMap.sort((a: any, b: any) => a.id - b.id);

          switch (field) {
            case "hp":
              sorted = detailsMap.sort((a: any, b: any) => a.health - b.health);
              break;
            case "atk":
              sorted = detailsMap.sort((a: any, b: any) => a.attack - b.attack);
              break;
            case "def":
              sorted = detailsMap.sort(
                (a: any, b: any) => a.defense - b.defense
              );
              break;
            case "name":
              sorted = detailsMap.sort((a: any, b: any) =>
                a.name.localeCompare(b.name)
              );
              break;
          }

          if (direction === "desc") sorted = sorted.reverse();

          localStorage.setItem(
            "totalPages",
            JSON.stringify(sorted.length / 20)
          );

          const finalList = sorted.map((each) => {
            const data: Pokemon = {
              name: each?.name || "",
              url: "",
            };
            return data;
          });
          filteredResults = finalList;
        }

        const cappedResults = filteredResults.slice(
          0 + 20 * (currentPage - 1),
          20 * currentPage
        ); // Cap the results to max 20 items
        setPokemonList(cappedResults);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, [searchQuery, sortByField, currentPage]);

  const value: PokemonContextType = {
    pokemonList,
    loading,
    error,
    setSearchQuery,
    setSortByField,
    setCurrentPage,
  };

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
};
