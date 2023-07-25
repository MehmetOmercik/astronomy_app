import { ChangeEvent, FC, useRef, useEffect, MouseEvent } from "react";
import { getSearch } from "@utils/http/http";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  setSearchQuery,
  setSearchList,
  setSearchCurrent,
  setSearchState,
} from "@features/Search/SearchSlice";
import { useNavigate } from "react-router-dom";

interface SearchItemObject {
  id: string;
  name: string;
  type: object;
  subtype: object;
}

export const SearchBar: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { searchQuery, searchList, searchState } = useAppSelector((state) => state.search);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // This and the useEvent is used to remove the dropDown box
  const handleClickOutside: EventListener = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      dispatch(setSearchQuery(""));
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    dispatch(setSearchQuery(e.target.value));
    if (e.target.value !== "") {
      try {
        dispatch(setSearchState("loading"));
        // throw new Error("My Error hahaa");
        const search = await getSearch(e.target.value);
        const tempSearch: string[] = [];

        //Temp search necessary to create entire list of array
        search.data.forEach((searchItem: string) => {
          tempSearch.push(searchItem);
        });
        dispatch(setSearchList(tempSearch));
        dispatch(setSearchState("loaded"));
      } catch (error) {
        console.error("Something went wrong with searchBar: ", error);
        dispatch(setSearchState("error"));
      }
    } else {
      dispatch(setSearchList([""]));
    }
  };

  const handleLink = (index: number) => {
    const result = searchList[index];
    dispatch(setSearchCurrent(result));
    navigate("/search");
  };

  return (
    <div ref={dropdownRef}>
      <input
        className="w-[220px] rounded-xl px-2 py-1"
        onChange={handleSearch}
        placeholder="Search"
        value={searchQuery}
      />
      {searchQuery && (
        <fieldset className="fixed top-[58px] z-20 flex w-[220px] flex-col rounded-xl bg-gray-600">
          {searchState === "loading" && (
            <option className="rounded-xl px-2 py-1">Loading, Please Wait...</option>
          )}
          {searchState === "loaded" && searchList?.length
            ? searchList.map((search, index) => (
                <button
                  onClick={() => handleLink(index)}
                  className="rounded-xl px-2 py-1 text-left hover:bg-gray-500"
                  key={search.id}
                >
                  {search.name}
                </button>
              ))
            : searchState === "loaded" && (
                <option className="rounded-xl px-2 py-1">No results found</option>
              )}

          {searchState === "error" && (
            <option className="rounded-xl px-2 py-1">Error, something went wrong</option>
          )}
        </fieldset>
      )}
    </div>
  );
};
