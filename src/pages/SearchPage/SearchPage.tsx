import React, { FC } from "react";
import { useAppSelector } from "@/app/hooks";

export const SearchPage: FC = () => {
  const { name, type, subType, crossIdentification } = useAppSelector(
    (state) => state.search.searchCurrent
  );

  return (
    <div>
      <h1>{name}</h1>
      <h1>{type.name}</h1>
      <h1>{subType.name}</h1>
    </div>
  );
};
