import { ChangeEvent, FC, useState } from "react";
import { getSearch } from "@utils/http/http";
import { LinkSimple } from "../indexUI";

interface SearchItemObject {
  id: string;
  name: string;
  type: object;
  subtype: object;
}

export const SearchBar: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchList, setSearchList] = useState([""]);

  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setSearchValue(e.target.value);
    if (e.target.value !== "") {
      try {
        setLoading(true);
        setLoaded(false);
        setError(false);
        // throw new Error("My Error hahaa");
        const search = await getSearch(e.target.value);
        const tempSearch: string[] = [];

        //Temp search necessary to create entire list of array
        search.data.forEach((searchItem: SearchItemObject) => {
          console.log(searchItem);
          tempSearch.push(searchItem.name); // Add each value to the array
        });
        setSearchList(tempSearch);
        setLoading(false);
        setLoaded(true);
      } catch (error) {
        console.error("Something went wrong with searchBar: ", error);
        setLoading(false);
        setError(true);
      }
    } else {
      setSearchList([""]);
    }
  };

  return (
    <div>
      <input
        className="w-[220px] rounded-xl px-2 py-1"
        onChange={handleSearch}
        placeholder="Search"
        value={searchValue}
      />
      {searchValue && (
        <fieldset className="fixed top-[58px] z-20 flex w-[220px] flex-col rounded-xl bg-gray-600">
          {loading && <option className="rounded-xl px-2 py-1">Loading, Please Wait...</option>}
          {loaded && searchList?.length
            ? searchList.map((search, index) => (
                <LinkSimple
                  // TODO change this to value to a dynamic link
                  to="/"
                  value={search}
                  className="rounded-xl px-2 py-1 hover:bg-gray-500"
                  key={index}
                />
              ))
            : loaded && <option className="rounded-xl px-2 py-1">No results found</option>}

          {error && <option className="rounded-xl px-2 py-1">Error, something went wrong</option>}
        </fieldset>
      )}
    </div>
  );
};
