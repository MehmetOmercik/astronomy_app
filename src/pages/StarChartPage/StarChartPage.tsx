import { FC, useState } from "react";
import { getStarChart, getMoonPhase } from "../../utils/http/http";
import { DropdownWithLabel } from "../../Components/UI/indexUI";

export const StarChartPage: FC = () => {
  const [style, setStyle] = useState("Default");
  const [type, setType] = useState("Constellation");
  const [constOrArea, setConstOrArea] = useState("Orion");
  const [image, setImage] = useState("");

  const handleStarChart = async (e) => {
    e.preventDefault();
    const starChartObject = {
      style: style.toLowerCase(),
      observer: {
        latitude: 51.51,
        longitude: 0.13,
        date: "2023-06-04",
      },
      view: {
        type: "constellation" as const,
        parameters: {
          constellation: "ori",
        },
      },
    };
    const starChart = await getStarChart(starChartObject);
    console.log(starChart.data.imageUrl);
    setImage(starChart.data.imageUrl);
  };
  return (
    <section>
      <form className="flex flex-col items-start" onSubmit={handleStarChart}>
        <fieldset>
          <label>Date</label>
          <input type="text" />
          <select>
            <option>Show all</option>
            <option>123</option>
            <option>456</option>
          </select>
        </fieldset>
        <label>Location</label>
        <input />
        <DropdownWithLabel
          label="Style"
          options={["Default", "Inverted", "Navy", "Red"]}
          onChange={setStyle}
        />
        <DropdownWithLabel label="Type" options={["Constellation", "Area"]} onChange={setType} />
        <DropdownWithLabel
          label={type}
          options={["Constellation", "Area"]}
          onChange={setConstOrArea}
        />
        <button
          type="submit"
          // onClick={handleStarChart}
          className="border border-gray-300 bg-slate-900"
        >
          click here for star chart
        </button>
      </form>
      <img src={image} />
    </section>
  );
};
