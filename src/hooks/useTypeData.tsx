import { useEffect, useState } from "react";

const useTypeData = () => {
  const [typeOptions, setTypeOptions] = useState([]);

  useEffect(() => {
    const fetchTypeData = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/type");
        const data = await response.json();
        const sortedTypes = data.results
          .map(({ name }: TypeData) => ({
            name: name.charAt(0).toUpperCase() + name.slice(1),
          }))
          .sort((a: TypeData, b: TypeData) => a.name.localeCompare(b.name));
        const options = sortedTypes.map(({ name }: TypeData) => (
          <option key={name} value={name}>
            {name}
          </option>
        ));
        setTypeOptions(options);
      } catch (error) {
        console.error("Error fetching type data:", error);
      }
    };
    fetchTypeData();
  }, []);

  return { typeOptions };
};

interface TypeData {
  name: string;
}

export default useTypeData;
