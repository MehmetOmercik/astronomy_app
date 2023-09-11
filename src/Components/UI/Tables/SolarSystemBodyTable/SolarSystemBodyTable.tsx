import React, { FC, ReactNode, HTMLAttributes } from "react";

interface SolarSystemBodyTableProps extends HTMLAttributes<HTMLTableElement> {
  headers: [];
  rows: [];
}

export const SolarSystemBodyTable: FC<SolarSystemBodyTableProps> = ({
  headers,
  rows,
  ...props
}) => {
  return (
    <table {...props}>
      <thead className="">
        <tr className="solar-system-table-header">
          <th className=""></th>
        </tr>
        {headers.map((header: Date, index: number) => {
          const date = new Date(header).toLocaleDateString();
          return (
            <tr key={index} className="solar-system-table-header flex  justify-center">
              <th className="text-center">{date}</th>
            </tr>
          );
        })}
      </thead>
      <tbody className="">
        <tr className="">
          <td className="solar-system-table-data">Distance from Earth</td>
          <td className="solar-system-table-data">Position</td>
          <td className="solar-system-table-data">Elongation</td>
          <td className="solar-system-table-data">Magnitude</td>
        </tr>
        {rows.map(
          (row: object, index: number) => (
            console.log(row),
            (
              <tr key={index}>
                <td className="solar-system-table-data">
                  {row.distance.fromEarth.au} au / {row.distance.fromEarth.km} km
                </td>
                <td className="solar-system-table-data">
                  {row.position.equatorial.rightAscension.string} rh AND{" "}
                  {row.position.equatorial.declination.string}
                  dec
                </td>
                <td className="solar-system-table-data">
                  {row.extraInfo.elongation ? row.extraInfo.elongation : "null"}
                </td>
                <td className="solar-system-table-data">
                  {row.extraInfo.magnitude ? row.extraInfo.magnitude : "null"}
                </td>
              </tr>
            )
          )
        )}
      </tbody>
    </table>
  );
};
