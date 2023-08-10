import { ChangeEvent, useState } from "react";

const App: React.FC = (): JSX.Element => {
  const [term, setTerm] = useState<string>("");

  const getSearchOptions = (value: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${
        process.env.REACT_APP_API_KEY
      }`,
    );
  };

  // the expected event type is a change event on an HTML input element.
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTerm(value);

    if (value === "") return;
    getSearchOptions(value);
  };

  return (
    <main className="flex h-[100vh] w-full items-center justify-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400">
      <section className="flex h-full w-full flex-col items-center justify-center rounded bg-white bg-opacity-20 p-4 text-center text-zinc-700 drop-shadow-lg backdrop-blur-lg md:max-w-[500px] md:px-10 lg:h-[500px] lg:p-24">
        <h1 className="text-4xl font-thin">
          Weather <span className="font-black">Forecast</span>
        </h1>
        <p className="mt-2 text-sm">
          Enter below a place you want to know the weather of, and select an
          option from dropdown
        </p>
        <div className="mt-10 flex md:mt-4 ">
          <input
            type="text"
            value={term}
            className="rounded-l-md border-2 border-white px-2 py-1"
            onChange={onInputChange}
          />
          <button className="cursor-pointer rounded-r-md border-2 border-zinc-100 px-2 py-1 text-zinc-100 hover:border-zinc-500 hover:text-zinc-500 ">
            Search
          </button>
        </div>
      </section>
    </main>
  );
};

export default App;
