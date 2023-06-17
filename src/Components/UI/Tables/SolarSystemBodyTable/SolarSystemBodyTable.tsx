import React, { ReactNode } from "react";

export const SolarSystemBodyTable = ({ headers, rows }) => {
  return (
    <table className="solar-system-table-header">
      <thead className="">
        <tr>
          <th className="w-full"></th>
        </tr>
        {headers.map((header: ReactNode, index: number) => (
          <tr className="solar-system-table-header">
            <th className="">{header}</th>
          </tr>
        ))}
      </thead>
      <tbody>
        <tr className="">
          <td className="solar-system-table-header">Distance from Earth</td>
          <td className="solar-system-table-header">Position</td>
          <td className="solar-system-table-header">Elongation</td>
          <td className="solar-system-table-header">Magnitude</td>
        </tr>
        {rows.map(
          (row, index: number) => (
            console.log(row),
            (
              <tr>
                <td className="solar-system-table-header">
                  {row.distance.fromEarth.au} au / {row.distance.fromEarth.km} km
                </td>
                <td className="solar-system-table-header">
                  {row.position.equatorial.rightAscension.string} rh AND{" "}
                  {row.position.equatorial.declination.string}
                  dec
                </td>
                <td className="solar-system-table-header">
                  {row.extraInfo.elongation ? row.extraInfo.elongation : "null"}
                </td>
                <td className="solar-system-table-header">
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
