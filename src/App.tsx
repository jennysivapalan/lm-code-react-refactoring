import { useEffect, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import { useHero } from "./hooks/useHero";
import { v4 as uuid } from "uuid";
import "./App.css";
import Header from "./components/header";
import pureHeroism from "./hooks/useHero";
import Heroics from "./components/heroics";

function App() {
  const [trips, setTrips] = useState(0);

  const [boughtIt, setBoughtIt] = useState(false);
  const { data, isLoading, error } = useFetch();
  const heroics = pureHeroism;

  useEffect(() => {
    if (heroics) if (data) setTrips(data.length);
  }, [data, heroics]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setBoughtIt(true);
    if (e.currentTarget.value) {
      const stuff = e.currentTarget.value.split("/");
      const experience = stuff[0];
      const cost = parseInt(stuff[1]);
      alert(
        `Okie dokie, so you've bought the '${experience}' excursion, at a cost of ${
          cost &&
          cost.toLocaleString("en-GB", { style: "currency", currency: "GBP" })
        }\rNice one 🚀`
      );
    }
  };

  return (
    <>
      <Header />
      <Heroics />

      {isLoading && <h2>Loading...</h2>}
      {data && (
        <div className="trips">
          <h3>We found {trips} trips for you!</h3>{" "}
          <ul className="trip-list">
            {data.map(
              ({
                id,
                tripName,
                description,
                imageUrl,
                cost,
                lengthInDays,
                isBookable,
              }) => {
                return (
                  <li key={id} className="trip-card">
                    <h3 className="trip-name grid-col-span-2">{tripName}</h3>
                    <p className="trip-description grid-col-span-2">
                      {description}
                    </p>
                    <img
                      className="trip-thumbnail"
                      src={imageUrl}
                      alt={`representation of ${tripName}`}
                    />
                    <p className="trip-duration">
                      Duration: {lengthInDays} day
                      {lengthInDays > 1 && "s"}
                    </p>
                    <p className="trip-price">
                      Price:{" "}
                      {cost.toLocaleString("en-GB", {
                        style: "currency",
                        currency: "GBP",
                      })}
                    </p>
                    <button
                      className="grid-col-span-2 trip-book-button"
                      disabled={!isBookable}
                      onClick={handleClick}
                      value={`${tripName}/${cost}`}
                    >
                      {isBookable ? "book now" : "fully booked"}
                    </button>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      )}
    </>
  );
}

export default App;
