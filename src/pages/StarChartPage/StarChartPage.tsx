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
  imageURL: string;
  state: string;
}

type StarChartAction = {
  type: string;
  property: string;
  newValue: string | boolean | Date;
};

enum StarChartStatus {
  PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
}

const starChartInitialstate = {
  latitude: "51.51",
  longitude: "0.13",
  startDate: new Date(),
  style: "Default",
  type: "Constellation",
  constellation: "Andromeda",
  constellationID: "and",
  imageURL: "",
  state: "",
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
    starChartDispatch({ type: "UPDATE", property: "state", newValue: StarChartStatus.PENDING });
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
      starChartDispatch({
        type: "UPDATE",
        property: "imageURL",
        newValue: starChart.data.imageUrl,
      });
      starChartDispatch({ type: "UPDATE", property: "state", newValue: StarChartStatus.FULFILLED });
    } catch (error) {
      console.log("Something went wrong with star chart call: ", error);
      starChartDispatch({ type: "UPDATE", property: "state", newValue: StarChartStatus.REJECTED });
    }
  };
  return (
    <section className="container flex min-w-[calc(100%-150px)] gap-x-10 p-5">
      <form
        className="flex flex-col gap-y-3 self-start rounded-lg bg-gray-600 p-4"
        onSubmit={handleStarChart}
      >
        <fieldset className="fieldset-class">
          <label>Latitude</label>
          <input
            value={starChartData.latitude}
            className="input-class"
            onChange={(e) => {
              starChartDispatch({ type: "UPDATE", property: "latitude", newValue: e.target.value });
            }}
          />
        </fieldset>
        <fieldset className="fieldset-class">
          <label>Longitude</label>
          <input
            value={starChartData.longitude}
            className="input-class"
            onChange={(e) => {
              starChartDispatch({
                type: "UPDATE",
                property: "longitude",
                newValue: e.target.value,
              });
            }}
          />
        </fieldset>
        <fieldset className="fieldset-class">
          <label>Date</label>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            className="input-class"
            selected={starChartData.startDate}
            onChange={(date: Date) =>
              starChartDispatch({ type: "UPDATE", property: "startDate", newValue: date })
            }
          />
        </fieldset>
        <DropdownWithLabel
          label="Style"
          options={["Default", "Inverted", "Navy", "Red"]}
          onChange={handleDropDownChange}
          property="style"
          selectClassName="input-class"
        />
        <DropdownWithLabel
          label="Type"
          options={["Constellation", "Area"]}
          onChange={handleDropDownChange}
          property="type"
          selectClassName="input-class"
        />

        <DropdownWithLabel
          label={starChartData.type}
          options={starChartInfo.map((info) => info.name)}
          onChange={handleDropDownChange}
          property="constellation"
          selectClassName="input-class"
        />
        <button
          type="submit"
          className="max-w-[200px] rounded-xl bg-slate-900 p-2 hover:bg-slate-800"
        >
          Click here to generate the Star Chart
        </button>
        {starChartData.imageURL && (
          <a
            className="flex max-w-[200px] justify-center rounded-xl bg-yellow-700 p-2 hover:bg-yellow-600"
            href={starChartData.imageURL}
            download="starChartImage.png"
            target="_blank"
          >
            Download image
          </a>
        )}
      </form>
      <section className="mr-20">
        {starChartData.state === StarChartStatus.PENDING && <h1>Loading, please wait...</h1>}
        {starChartData.state === StarChartStatus.FULFILLED && (
          <img className="relative z-10 max-w-[700px]" src={starChartData.imageURL} />
        )}
        {starChartData.state === StarChartStatus.REJECTED && <p>ERROR: NOT LOADING</p>}
      </section>
    </section>
  );
};
