import { FC, useState } from "react";
import { getMoonPhase } from "../../utils/http/http";
import { DropdownWithLabel } from "../../Components/UI/indexUI";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const MoonPhasePage: FC = () => {
  const [latitude, setLatitude] = useState("51.51");
  const [longitude, setLongitude] = useState("0.13");
  const [startDate, setStartDate] = useState(new Date());
  const [moonStyle, setMoonStyle] = useState("Default");
  const [moonPhaseImage, setMoonPhaseImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleMoonPhase = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoaded(false);
    setError(false);
    // use as const to fix String/Literal type error issue
    const moonPhaseObject = {
      format: "png" as const,
      style: {
        moonStyle: moonStyle.toLowerCase() as "default" | "sketch" | "shaded",
        // backgroundStyle: "stars",
        // backgroundColor: "red",
        headingColor: "white",
        textColor: "white",
      },
      observer: {
        latitude: +latitude,
        longitude: +longitude,
        date: startDate.toISOString(),
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
      <section className="flex max-w-[80vw] justify-between">
        <form onSubmit={handleMoonPhase} className="flex flex-col items-start">
          <label>Latitude</label>
          <input
            value={latitude}
            onChange={(e) => {
              setLatitude(e.target.value);
            }}
          />
          <label>Longitude</label>
          <input
            value={longitude}
            onChange={(e) => {
              setLongitude(e.target.value);
            }}
          />
          <label>Date</label>
          <DatePicker
            // dateFormat="Pp"
            // showTimeSelect
            dateFormat="dd/MM/yyyy"
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
          />
          <DropdownWithLabel
            label="Moon Style"
            options={["Default", "Sketch", "Shaded"]}
            onChange={setMoonStyle}
          />
          <button type="submit" className="rounded-xl bg-green-600 p-2">
            Submit
          </button>
        </form>
        <div>
          {loading && <h1>Loading, please wait...</h1>}
          {loaded && <img className="absolute z-10" src={moonPhaseImage} />}
          {error && <p>ERROR: NOT LOADING</p>}
        </div>
      </section>
    </>
  );
};
