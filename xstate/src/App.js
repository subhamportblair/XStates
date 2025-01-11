import { useEffect, useState } from "react";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState();
  const [states, setStates] = useState([]);
  const [state, setState] = useState();
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState();
  const countriesApi = "https://crio-location-selector.onrender.com/countries";
  const StateApi = `https://crio-location-selector.onrender.com/country=${country}/states`;
  const CityApi = `https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`;

  const fetchCountries = async () => {
    try {
      const response = await fetch(countriesApi);
      const json = await response.json();
      //console.log(json);
      setCountries(json);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchState = async () => {
    try {
      const response = await fetch(StateApi);
      const json = await response.json();
      //console.log(json);
      setStates(json);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCity = async () => {
    try {
      const response = await fetch(CityApi);
      const json = await response.json();
      //console.log(json);
      setCities(json);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (country) fetchState();
  }, [country]);

  useEffect(() => {
    if (state) fetchCity();
  }, [state]);

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        Select Location
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <select
          name="Select_Country"
          id="Select_Country"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        >
          <option value="default" selected disabled>
            Select Country
          </option>
          {countries.map((ele, idx) => {
            return (
              <option value={ele} key={idx}>
                {ele}
              </option>
            );
          })}
        </select>
        <select
          name="Select_State"
          id="Select_State"
          disabled={country == null}
          onChange={(event) => {
            setState(event.target.value);
          }}
        >
          <option value="default" selected disabled>
            Select State
          </option>
          {states.map((ele, idx) => {
            return (
              <option value={ele} key={idx}>
                {ele}
              </option>
            );
          })}
        </select>
        <select
          disabled={country == null || state == null}
          name="Select_City"
          id="Select_City"
          onChange={(event) => {
            setCity(event.target.value);
          }}
        >
          <option value="default" selected disabled>
            Select City
          </option>
          {cities.map((ele, idx) => {
            return (
              <option value={ele} key={idx}>
                {ele}
              </option>
            );
          })}
        </select>
      </div>
      <br />
      {city && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          You selected:{" "}
          {city}, {state},{country}
        </div>
      )}
    </div>
  );
}
