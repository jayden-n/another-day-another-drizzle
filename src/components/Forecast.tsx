import {
  getHumidityValue,
  getPop,
  getSunTime,
  getVisibilityValue,
  getWindDirection,
} from "../helpers";
import Sunrise from "./Icons/Sunrise";
import Sunset from "./Icons/Sunset";
import Tile from "./Tile";
import { ForecastType } from "./types";

type Props = {
  dataForecast: ForecastType;
};

const Degree = ({ temp }: { temp: number }): JSX.Element => {
  return (
    <span>
      {temp}
      <sup>o</sup>
    </span>
  );
};

const Forecast = ({ dataForecast }: Props): JSX.Element => {
  const today = dataForecast.list[0];
  return (
    <main className="h-full w-full rounded bg-white bg-opacity-20 py-4 drop-shadow-lg backdrop-blur-lg md:max-w-[500px] md:px-10 md:py-4 lg:h-auto lg:px-24">
      <div className="mx-auto w-[300px]">
        {/* Place info */}
        <section className="text-center">
          <h2 className="text-2xl font-black">
            {dataForecast.name}
            <span className="font-thin"> {dataForecast.country}</span>
          </h2>
          <h1 className="text-4xl font-extrabold">
            <Degree temp={Math.round(today.main.temp)} />
          </h1>
          <p className="text-sm">
            {today.weather[0].main} ({today.weather[0].description})
          </p>
          <p className="text-sm">
            H: <Degree temp={Math.ceil(today.main.temp_max)} /> L:{" "}
            <Degree temp={Math.floor(today.main.temp_min)} />
          </p>
        </section>

        {/* Forecast Info */}
        <section className="mb-5 mt-4 flex overflow-x-scroll pb-2">
          {dataForecast.list.map((item, i) => (
            <div
              className="inline-block w-[50px] flex-shrink-0 text-center"
              key={i}
            >
              <p className="text-sm">
                {i === 0 ? "Now" : new Date(item.dt * 1000).getHours()}
              </p>
              <img
                alt={`weather-icon-${item.weather[0].description}`}
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              />
              <p className="text-sm font-bold">
                <Degree temp={Math.round(item.main.temp)} />
              </p>
            </div>
          ))}
        </section>

        {/* Sunrise & Sunset info */}
        <section className="flex flex-wrap justify-between text-zinc-700">
          <div className="mb-5 flex w-[140px] flex-col items-center rounded bg-white/20 py-4 text-xs font-bold drop-shadow-lg backdrop-blur-lg">
            <Sunrise />{" "}
            <span className="mt-2">{getSunTime(dataForecast.sunrise)}</span>
          </div>
          <div className="mb-5 flex w-[140px] flex-col items-center rounded bg-white/20 py-4 text-xs font-bold drop-shadow-lg backdrop-blur-lg">
            <Sunset />{" "}
            <span className="mt-2">{getSunTime(dataForecast.sunset)}</span>
          </div>

          {/* wind */}
          <Tile
            icon="wind"
            title="Wind"
            info={`${Math.round(today.wind.speed)} km/h`}
            description={`${getWindDirection(
              Math.round(today.wind.speed),
            )}, gusts ${today.wind.gust.toFixed(1)} km/h`}
          />
          {/* feels like */}
          <Tile
            icon="feels"
            title="Feels like"
            info={<Degree temp={Math.round(today.main.feels_like)} />}
            description={`Feels 
            ${
              Math.round(today.main.feels_like) < Math.round(today.main.temp)
                ? "colder"
                : "warmer"
            }
            `}
          />
          {/* humidity */}
          <Tile
            icon="humidity"
            title="Humidity"
            info={`${today.main.humidity} %`}
            description={getHumidityValue(today.main.humidity)}
          />
          {/* pop */}
          <Tile
            icon="pop"
            title="Precipitation"
            info={`${Math.round(today.pop)} %`}
            description={`${getPop(today.pop)}, clouds at ${
              today.clouds.all
            } %`}
          />
          {/* pressure */}
          <Tile
            icon="pressure"
            title="Pressure"
            info={`${today.main.pressure} hPa `}
            description={`
              ${
                // Source from Google
                Math.round(today.main.pressure) < 1013 ? "Lower" : "Higher"
              } than standard
            `}
          />
          {/* visibility */}
          <Tile
            icon="visibility"
            title="Visibility"
            info={`${(today.visibility / 1000).toFixed()} km `}
            description={getVisibilityValue(today.visibility)}
          />
        </section>
      </div>
    </main>
  );
};

export default Forecast;
