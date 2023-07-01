import { FC, ChangeEvent, useState, useEffect } from "react";
import { getStarChart, getMoonPhase } from "../../utils/http/http";
import { DropdownWithLabel } from "../../Components/UI/indexUI";
import starChartInfo from "./StarChartInfo.json";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const StarChartPage: FC = () => {
  const [latitude, setLatitude] = useState("51.51");
  const [longitude, setLongitude] = useState("0.13");
  const [startDate, setStartDate] = useState(new Date());
  const [style, setStyle] = useState("Default");
  const [type, setType] = useState("Constellation");
  const [conste, setConste] = useState("Andromeda");
  const [consteID, setConsteID] = useState("and");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    starChartInfo.map(
      (info, index) => {
        if (conste === info.name) {
          setConsteID(info.id);
        }
      },
      [conste]
    );
  });

  const handleStarChart = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoading(true);
    setLoaded(false);
    setError(false);
    const starChartObject = {
      style: style.toLowerCase(),
      observer: {
        latitude: +latitude,
        longitude: +longitude,
        date: startDate.toISOString(),
      },
      view: {
        type: "constellation" as const,
        parameters: {
          constellation: consteID,
        },
      },
    };
    try {
      const starChart = await getStarChart(starChartObject);
      console.log(starChart.data.imageUrl);
      setImage(starChart.data.imageUrl);
      setLoading(false);
      setLoaded(true);
    } catch (error) {
      console.log("Something went wrong with star chart call: ", error);
      setLoading(false);
      setError(true);
    }
  };
  return (
    <section className="flex max-w-[80vw]">
      <form className="mr-[200px] flex flex-col items-start" onSubmit={handleStarChart}>
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
          // showIcon
          dateFormat="dd/MM/yyyy"
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
        />
        <DropdownWithLabel
          label="Style"
          options={["Default", "Inverted", "Navy", "Red"]}
          onChange={setStyle}
        />
        <DropdownWithLabel label="Type" options={["Constellation", "Area"]} onChange={setType} />

        <DropdownWithLabel
          label={type}
          options={starChartInfo.map((info, index) => info.name)}
          onChange={setConste}
        />
        <button
          type="submit"
          // onClick={handleStarChart}
          className="border border-gray-300 bg-slate-900"
        >
          click here for star chart
        </button>
      </form>
      <div>
        {loading && <h1>Loading, please wait...</h1>}
        {loaded && <img className="absolute z-10" src={image} />}
        {error && <p>ERROR: NOT LOADING</p>}
      </div>
    </section>
  );
};
