import { createContext } from "react";

export interface Pokemon {
  name: string;
  url: string;
  types?: { slot: number; type: { name: string } }[];
}

export interface PokemonContextType {
  pokemonList: Pokemon[];
  loading: boolean;
  error: unknown;
  setSearchQuery: (query: string) => void;
  setTypeFilter?: (types: string) => void;
  setSortByField: (query: string) => void;
  setCurrentPage: (query: number) => void;
  searchQuery?: string;
  typeFilter?: string;
}

const PokemonContext = createContext<PokemonContextType>(
  {} as PokemonContextType
);

export default PokemonContext;
