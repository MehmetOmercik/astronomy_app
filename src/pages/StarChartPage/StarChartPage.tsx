import { FC, ChangeEvent, useEffect, useReducer } from "react";
import { Reducer } from "react";
import { getStarChart } from "@utils/http/http";
import { DropdownWithLabel } from "@components/UI/indexUI";
import starChartInfo from "./StarChartInfo.json";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface StarChartDataType {
  latitude: string;
  longitude: string;
  startDate: Date;
  style: string;
  type: string;
  constellation: string;
  constellationID: string;
  image: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

type StarChartAction = {
  type: string;
  property: string;
  newValue: string | boolean | Date;
};
const starChartInitialstate = {
  latitude: "51.51",
  longitude: "0.13",
  startDate: new Date(),
  style: "Default",
  type: "Constellation",
  constellation: "Andromeda",
  constellationID: "and",
  image: "",
  loading: false,
  loaded: false,
  error: false,
};

const starChartReducer: Reducer<StarChartDataType, StarChartAction> = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        [action.property]: action.newValue,
      };
    default:
      return state;
  }
};
export const StarChartPage: FC = () => {
  const [starChartData, starChartDispatch] = useReducer(starChartReducer, starChartInitialstate);
  console.log(starChartData);

  useEffect(() => {
    starChartInfo.map((info) => {
      if (starChartData.constellation === info.name) {
        starChartDispatch({ type: "UPDATE", property: "constellationID", newValue: info.id });
      }
    });
  }, [starChartData.constellation, starChartDispatch, starChartInfo]);

  const handleDropDownChange = (value: string, property: string) => {
    starChartDispatch({ type: "UPDATE", property: property, newValue: value });
  };

  const handleStarChart = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    starChartDispatch({ type: "UPDATE", property: "loading", newValue: true });
    starChartDispatch({ type: "UPDATE", property: "loaded", newValue: false });
    starChartDispatch({ type: "UPDATE", property: "error", newValue: false });
    const starChartObject = {
      style: starChartData.style.toLowerCase(),
      observer: {
        latitude: +starChartData.latitude,
        longitude: +starChartData.longitude,
        date: starChartData.startDate.toISOString(),
      },
      view: {
        type: "constellation" as const,
        parameters: {
          constellation: starChartData.constellationID,
        },
      },
    };
    try {
      const starChart = await getStarChart(starChartObject);
      console.log(starChart.data.imageUrl);
      starChartDispatch({ type: "UPDATE", property: "image", newValue: starChart.data.imageUrl });
      starChartDispatch({ type: "UPDATE", property: "loading", newValue: false });
      starChartDispatch({ type: "UPDATE", property: "loaded", newValue: true });
    } catch (error) {
      console.log("Something went wrong with star chart call: ", error);
      starChartDispatch({ type: "UPDATE", property: "loading", newValue: false });
      starChartDispatch({ type: "UPDATE", property: "error", newValue: true });
    }
  };
  return (
    <section className="flex max-w-[80vw]">
      <form className="mr-[200px] flex flex-col items-start" onSubmit={handleStarChart}>
        <label>Latitude</label>
        <input
          value={starChartData.latitude}
          onChange={(e) => {
            starChartDispatch({ type: "UPDATE", property: "latitude", newValue: e.target.value });
          }}
        />
        <label>Longitude</label>
        <input
          value={starChartData.longitude}
          onChange={(e) => {
            starChartDispatch({ type: "UPDATE", property: "longitude", newValue: e.target.value });
          }}
        />
        <label>Date</label>
        <DatePicker
          // dateFormat="Pp"
          // showTimeSelect
          // showIcon
          dateFormat="dd/MM/yyyy"
          selected={starChartData.startDate}
          onChange={(date: Date) =>
            starChartDispatch({ type: "UPDATE", property: "date", newValue: date })
          }
        />
        <DropdownWithLabel
          label="Style"
          options={["Default", "Inverted", "Navy", "Red"]}
          onChange={handleDropDownChange}
          property="style"
        />
        <DropdownWithLabel
          label="Type"
          options={["Constellation", "Area"]}
          onChange={handleDropDownChange}
          property="type"
        />

        <DropdownWithLabel
          label={starChartData.type}
          options={starChartInfo.map((info) => info.name)}
          onChange={handleDropDownChange}
          property="constellation"
        />
        <button type="submit" className="border border-gray-300 bg-slate-900">
          click here for star chart
        </button>
      </form>
      <div>
        {starChartData.loading && <h1>Loading, please wait...</h1>}
        {starChartData.loaded && <img className="absolute z-10" src={starChartData.image} />}
        {starChartData.error && <p>ERROR: NOT LOADING</p>}
      </div>
    </section>
  );
};
