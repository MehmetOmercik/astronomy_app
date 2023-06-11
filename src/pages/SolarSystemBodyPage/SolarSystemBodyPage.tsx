import { FC } from "react";
import { useAppSelector } from "../../App/hooks";

export const SolarSystemBodyPage: FC = () => {
  const title = useAppSelector((state) => state.solarSystem.title);
  const description = useAppSelector((state) => state.solarSystem.description);
  const data = useAppSelector((state) => state.solarSystem.data);
  // const rows = data.table.rows;
  // console.log(rows);
  return (
    <div>
      <h1 className="text-center">{title}</h1>
      <p className="container mx-4 my-2">{description}</p>
      <table className="">
        <thead className="">
          <tr className="">
            <th className="solar-system-table-header">hello</th>
            <th className="solar-system-table-header">my name</th>
            <th className="solar-system-table-header">is mehmet</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>hello</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
