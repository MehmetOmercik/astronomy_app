import { FC, ChangeEvent, useState } from "react";
import { getMoonPhase } from "@utils/http/http";
import { DropdownWithLabel } from "@components/UI/indexUI";
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

  const handleMoonPhase = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setLoaded(false);
    setError(false);
    const moonPhaseObject = {
      format: "png" as const,
      style: {
        moonStyle: ["default", "sketch", "shaded"].includes(moonStyle.toLowerCase())
          ? (moonStyle.toLowerCase() as "default" | "sketch" | "shaded")
          : "default",

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
    <section className="flex gap-x-10 p-5">
      <form
        onSubmit={handleMoonPhase}
        className="flex flex-col gap-y-3 self-start rounded-lg bg-gray-600 p-4"
      >
        <fieldset className="fieldset-class">
          <label>Latitude</label>
          <input
            value={latitude}
            className="input-class"
            onChange={(e) => {
              setLatitude(e.target.value);
            }}
          />
        </fieldset>
        <fieldset className="fieldset-class">
          <label>Longitude</label>
          <input
            value={longitude}
            className="input-class"
            onChange={(e) => {
              setLongitude(e.target.value);
            }}
          />
        </fieldset>
        <fieldset className="fieldset-class">
          <label>Date</label>
          <DatePicker
            className="input-class"
            dateFormat="dd/MM/yyyy"
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
          />
        </fieldset>
        <DropdownWithLabel
          label="Moon Style"
          options={["Default", "Sketch", "Shaded"]}
          onChange={setMoonStyle}
          selectClassName="input-class"
        />
        <button type="submit" className="rounded-xl bg-green-600 p-2 hover:bg-green-400">
          Generate
        </button>
        {moonPhaseImage && (
          <a
            className="flex justify-center rounded-xl bg-yellow-700 p-2 hover:bg-yellow-600"
            href={moonPhaseImage}
            download="starChartImage.png"
            target="_blank"
          >
            Download image
          </a>
        )}
      </form>
      <div>
        {loading && <h1>Loading, please wait...</h1>}
        {loaded && <img className="relative z-10" src={moonPhaseImage} />}
        {error && <p>ERROR: NOT LOADING</p>}
      </div>
    </section>
  );
};
