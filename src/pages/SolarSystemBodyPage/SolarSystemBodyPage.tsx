import { FC, ReactNode } from "react";
import { useAppSelector } from "../../App/hooks";

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
      <table className="">
        <thead className="">
          <tr className="">
            <th className="solar-system-table-header"></th>
            {headers.map((header: ReactNode, index: number) => (
              <th className="solar-system-table-header ">{header}</th>
            ))}
          </tr>
        </thead>
        {rows.map(
          (row, index: number) => (
            console.log(row),
            (
              <tbody>
                <tr>
                  <td className="solar-system-table-header">Distance from {row.name}</td>
                  <td className="solar-system-table-header">
                    {row.distance.fromEarth.au} au / {row.distance.fromEarth.km} km
                  </td>
                </tr>
                <tr>
                  <td className="solar-system-table-header">Position</td>
                  <td className="solar-system-table-header">
                    {row.position.equatorial.rightAscension.string} rh AND{" "}
                    {row.position.equatorial.declination.string}
                    dec
                  </td>
                </tr>
                <tr>
                  <td className="solar-system-table-header">Elongation</td>
                  <td className="solar-system-table-header">{row.extraInfo.elongation}</td>
                </tr>
                <tr>
                  <td className="solar-system-table-header">Magnitude</td>
                  <td className="solar-system-table-header">{row.extraInfo.magnitude}</td>
                </tr>
              </tbody>
            )
          )
        )}
      </table>
    </div>
  );
};
