import { ChangeEvent, FC, useState } from "react";
import { getSearch } from "@utils/http/http";
import { LinkSimple } from "../indexUI";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setSearchQuery, setSearchList, setSearchState } from "@/features/Search/SearchSlice";

interface SearchItemObject {
  id: string;
  name: string;
  type: object;
  subtype: object;
}

export const SearchBar: FC = () => {
  const dispatch = useAppDispatch();
  const { searchQuery, searchList, searchState } = useAppSelector((state) => ({
    searchQuery: state.search.searchQuery,
    searchList: state.search.searchList,
    searchState: state.search.searchState,
  }));

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
        search.data.forEach((searchItem: SearchItemObject) => {
          console.log(searchItem);
          tempSearch.push(searchItem.name); // Add each value to the array
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

  return (
    <div>
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
                <LinkSimple
                  // TODO change this to value to a dynamic link
                  to="/"
                  value={search}
                  className="rounded-xl px-2 py-1 hover:bg-gray-500"
                  key={index}
                />
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
