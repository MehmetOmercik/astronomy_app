import { ChangeEvent, FC, useState } from "react";
import { getSearch } from "../../../utils/http/http";

export const SearchBar: FC = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setSearchValue(e.target.value);
    if (e.target.value !== "") {
      const search = await getSearch(e.target.value);
      console.log(search);
    }
  };

  return <input onChange={handleSearch} placeholder="Search" value={searchValue} />;
};
