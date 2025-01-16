import { Tooltip } from "@components/UI/indexUI";
import { FC, Fragment, HTMLAttributes } from "react";

interface SolarSystemBodyTableProps extends HTMLAttributes<HTMLTableElement> {
  headers: [];
  rows: [{}];
}

// Interfaces for row object
// interface Distance {
//   fromEarth: {
//     au: string;
//     km: string;
//   };
// }

// interface Position {
//   equatorial: {
//     rightAscension: {
//       hours: string;
//       string: string;
//     };
//     declination: {
//       degrees: string;
//       string: string;
//     };
//   };
// }

// interface ExtraInfo {
//   elongation: number | null;
//   magnitude: number | null;
// }

// interface RowProps {
//   distance: Distance;
//   position: Position;
//   extraInfo: ExtraInfo;
// }

export const SolarSystemBodyTable: FC<SolarSystemBodyTableProps> = ({
  headers,
  rows,
  // ...props
}) => {
  return (
    // <table {...props}>
    //   <thead className="">
    //     <tr className="solar-system-table-header">
    //       <th className=""></th>
    //     </tr>
    //     {headers.map((header: Date, index: number) => {
    //       const date = new Date(header).toLocaleDateString();
    //       return (
    //         <tr key={index} className="solar-system-table-header flex justify-center">
    //           <th className="text-center">{date}</th>
    //         </tr>
    //       );
    //     })}
    //   </thead>
    //   <tbody className="">
    //     <tr className="">
    //       <td className="solar-system-table-column">Distance from Earth</td>
    //       <td className="solar-system-table-column">Position</td>
    //       <td className="solar-system-table-column">Elongation</td>
    //       <td className="solar-system-table-column">Magnitude</td>
    //     </tr>
    //     {/*//TODO make rowProps work with type row */}
    //     {rows.map((row: any, index: number) => (
    //       <tr key={index}>
    //         <td className="solar-system-table-data">
    //           {row.distance.fromEarth.au} au / {row.distance.fromEarth.km} km
    //         </td>
    //         <td className="solar-system-table-data">
    //           {row.position.equatorial.rightAscension.string} rh AND{" "}
    //           {row.position.equatorial.declination.string}
    //           dec
    //         </td>
    //         <td className="solar-system-table-data">
    //           {row.extraInfo.elongation ? row.extraInfo.elongation : "null"}
    //         </td>
    //         <td className="solar-system-table-data">
    //           {row.extraInfo.magnitude ? row.extraInfo.magnitude : "null"}
    //         </td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
    // TODO New responsive table (possibly temporary), check if you can increase columns...
    <section className="grid grid-cols-2 p-4">
      {headers.map((header: Date, index: number) => {
        const date = new Date(header).toLocaleDateString();
        return (
          <Fragment key={`solar-system-header-row-${index}`}>
            <div className="solar-system-table-header rounded-tl-xl"></div>
            <div className="solar-system-table-header rounded-tr-xl">{date}</div>
          </Fragment>
          
        );
      })}
      {rows.map((row: any, index: number) => (
        <Fragment key={`solar-system-row-${index}`}>
          <div className="solar-system-table-column-header">
            <p>Distance from Earth</p>
            <Tooltip 
              message='Measured in AU (Astronomical Units) where 1 AU equals the average distance between the Sun and the Earth which is 150 million km (93 million miles)'
              id={0}
            />
          </div>
          <div className="solar-system-table-data">{row.distance.fromEarth.au} AU / {row.distance.fromEarth.km} km</div>
          <div className="solar-system-table-column-header">
            Position
            <Tooltip 
              message={
                <Fragment>
                  <p>RA is Right Ascension which is the celestial equivalent of longitude. It is measured in hours minutes and seconds where 0 hours is the vernal equinox.</p>
                  <br />
                  <p>Dec is declination and is the celestial equivalent of latitude. It is measured in degrees, arcminutes and arcseconds where 0° is the equator, 90° is the north celestial pole and -90° is the south celestial pole.</p>
                </Fragment>
              } 
              id={1}
            />
          </div>
          <div className="solar-system-table-data">
            <span className="whitespace-nowrap">{row.position.equatorial.rightAscension.string} RA</span>
            <br />
            <span className="whitespace-nowrap">{row.position.equatorial.declination.string} DEC</span>
          </div>
          <div className="solar-system-table-column-header">
            <p>Elongation</p>
            <Tooltip 
              message={
                <Fragment>
                  <p>
                    Elongation refers to the maximum angular separation between a celestial body and the Sun, with the Earth used as a reference point.
                  </p>
                  <br />
                  <p>
                    I.e. if a planet had a 90° elongation then it means that it makes a right angled triangle with the Earth. This position is known as a Quadrature.
                  </p>
                </Fragment>
              } 
              id={2}
            />
          </div>
          <div className="solar-system-table-data">{row.extraInfo.elongation ? `${row.extraInfo.elongation}°` : "null"}</div>
          <div className="solar-system-table-column-header rounded-bl-xl">
            <p>Magnitude</p>
            <Tooltip 
              message={
                <Fragment>
                  <p>
                    Magnitude relates to how bright a celestial object is where the more negative the number, the brighter the object.
                  </p>
                  <br />
                  <p>
                    I.e. The Sun has a magnitude of -26.7, a full moon is -11 and the brightest star in the sky, Sirius, is about -1.5. 
                  </p>
                </Fragment>
              } 
              id={3}
            />
          </div>
          <div className="solar-system-table-data rounded-br-xl">{row.extraInfo.magnitude ? row.extraInfo.magnitude : "null"}</div>
        </Fragment>
      ))}
    </section>
  );
};
