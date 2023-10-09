import { useAppSelector } from "@app/hooks";

// interface SearchPageProps {
//   name: string;
//   type: {
//     id: string;
//     name: string;
//   };
//   subType: {
//     id: string;
//     name: string;
//   };
//   crossIdentification: object[];
//   position: {
//     constellation: {
//       id: string;
//       short: string;
//       name: string;
//     };
//     equatorial: {
//       declination: {
//         degress: string;
//         string: string;
//       };
//       rightAscension: {
//         degress: string;
//         string: string;
//       };
//     };
//   };
// }
export const SearchPage: React.FC = () => {
  //TODO get searchPageProps working as a type
  const searchCurrent: any = useAppSelector((state) => state.search.searchCurrent);
  const {
    name,
    type,
    subType,
    // crossIdentification,
    position,
  } = searchCurrent;

  return (
    <div className="flex min-w-[calc(100%-150px)] flex-col">
      <h1 className="my-4 text-center text-4xl text-yellow-500">{name}</h1>
      <table className="self-center">
        <tbody>
          <tr>
            <td className="solar-system-table-data">Name</td>
            <td className="solar-system-table-data">Type</td>
            <td className="solar-system-table-data">Subtype</td>
            <td className="solar-system-table-data">Constellation</td>
            <td className="solar-system-table-data">Position</td>
          </tr>
          <tr>
            <td className="solar-system-table-data">{name ?? "null"}</td>
            <td className="solar-system-table-data">{type?.name ?? "null"}</td>
            <td className="solar-system-table-data">{subType?.name ?? "null"}</td>
            <td className="solar-system-table-data">{position?.constellation.name ?? "null"}</td>
            <td className="solar-system-table-data">
              {`${position?.equatorial.rightAscension.string} RA and
              ${position?.equatorial.declination.string} DEC`}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
