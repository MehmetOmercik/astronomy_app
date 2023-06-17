import { FC } from "react";
import { useAppSelector } from "../../App/hooks";
import { SolarSystemBodyTable } from "../../Components/UI/indexUI";

export const SolarSystemBodyPage: FC = () => {
  const title = useAppSelector((state) => state.solarSystem.title);
  const description = useAppSelector((state) => state.solarSystem.description);
  const table = useAppSelector((state) => state.solarSystem.table);
  const headers = table.header;
  const rows = table.rows[0].cells;
  console.log(rows);
  return (
    <div>
      <h1 className="text-center">{title}</h1>
      <p className="container mx-4 my-2">{description}</p>
      <SolarSystemBodyTable headers={headers} rows={rows} />
    </div>
  );
};
