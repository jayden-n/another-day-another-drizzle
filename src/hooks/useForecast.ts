import { ChangeEvent, useEffect, useState } from "react";
import { OptionType, ForecastType } from "../components/types";

export const useForecast = () => {
  const [term, setTerm] = useState<string>("");
  const [city, setCity] = useState<OptionType | null>(null);
  const [options, setOptions] = useState<[]>([]);
  const [forecast, setForecast] = useState<ForecastType | null>(null);

  const getSearchOptions = (value: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${
        process.env.REACT_APP_API_KEY
      }`,
    )
      .then((res) => res.json())
      .then((data) => setOptions(data));
  };

  // the expected event type is a change event on an HTML input element.
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTerm(value);

    if (value === "") return;
    getSearchOptions(value);
  };

  const getForecast = (city: OptionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`,
    )
      .then((res) => res.json())
      .then((data) => {
        const forecastData = {
          ...data.city,
          list: data.list.slice(0, 16),
        };

        setForecast(forecastData);
      });
  };

  const onSubmit = () => {
    if (!city) return;
    getForecast(city);
  };

  const onOptionSelect = (option: OptionType) => {
    setCity(option);
  };

  // value only change...
  useEffect(() => {
    if (city) {
      setTerm(city.name);
      // Reset UI if users chose a city
      setOptions([]);
    }
  }, [city]);

  return {
    forecast,
    term,
    options,
    onInputChange,
    onOptionSelect,
    onSubmit,
  };
};
