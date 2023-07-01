import { FC, useState } from "react";
import { getMoonPhase } from "../../utils/http/http";

export const MoonPhasePage: FC = () => {
  const [moonPhaseImage, setMoonPhaseImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleMoonPhaseButton = async () => {
    setLoading(true);
    setLoaded(false);
    setError(false);
    // use as const to fix String/Literal type error issue
    const moonPhaseObject = {
      format: "png" as const,
      style: {
        moonStyle: "sketch" as const,
        // "backgroundStyle": "stars",
        // "backgroundColor": "red",
        // "headingColor": "white",
        // "textColor": "red"
      },
      observer: {
        latitude: 6.56774,
        longitude: 79.88956,
        date: "2020-11-01",
      },
      view: {
        type: "portrait-simple" as const,
        orientation: "south-up" as const,
      },
    };
    try {
      const moonPhase = await getMoonPhase(moonPhaseObject);
      console.log(moonPhase.data.imageUrl);
      setMoonPhaseImage(moonPhase.data.imageUrl);
      setLoading(false);
      setLoaded(true);
    } catch (error) {
      console.log("Something went wrong with star chart call: ", error);
      setLoading(false);
      setError(true);
    }
  };
  return (
    <>
      <p>Moon Phase Page</p>
      <button className="rounded-xl bg-green-600 p-2" onClick={() => handleMoonPhaseButton()}>
        Button
      </button>
      {loading && <h1>Loading, please wait...</h1>}
      {loaded && <img className="absolute z-10" src={moonPhaseImage} />}
      {error && <p>ERROR: NOT LOADING</p>}
    </>
  );
};
