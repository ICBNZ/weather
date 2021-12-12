import './App.scss';
import React, { useEffect, useState } from "react";
import Weather from './components/Weather/weather';
import VideoBg from './components/Video/video';

export default function App() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("Wellington");
  const [userLocation, setUserLocation] = useState("Current Location");
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchbyLocation = async () => {
      await fetch(`${process.env.REACT_APP_API_URL}/weather/?q=${location}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(res => handleResponse(res))
      .then(result => {
        setData(result);
        setLoading(false);
        setError(null);
      })
      .catch(err => {
        console.log(err);
        setError(`Unable to find weather for ${location}`);
      });
    }
    fetchbyLocation();

  }, [location, ])


  const getLocation = (fetchData) => {
    navigator.geolocation.getCurrentPosition(function(position) {
      fetchData(position.coords.latitude, position.coords.longitude);
    });
  }

  const fetchData = async (lat, lon) => {
    await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${lon}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
    .then(res => handleResponse(res))
    .then(result => {
      setData(result);
      setLoading(false);
      setUserLocation(result.name);
      setError(null);
    })
    .catch(err => {
      console.log(err);
      setError(`Unable to retrieve weather`);
    });
  }

  const handleCurrentLocation = () => {
    setLoading(true);
    userLocation === 'Current Location' ? getLocation(fetchData) : setLocation(userLocation);
  }

  const handleResponse = (res) => {
    if (res.status !== 200) {
      setError(`Unable to find weather for ${location}`);
      throw new Error(`Error ${res.status} ${res.statusText}`);
    } else {
      return res.json();
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocation(query);
    setQuery("");
  }

  return (
    <div className="main">
      <VideoBg weather={data.main ? data.weather[0].main : ""} />
      <div className="nav">
        <span className="title">
          <h2>Weather noW</h2>
          <h4> 
          <button className="submit" type="submit" onClick={handleCurrentLocation}><i className="fa">&#xf041;</i>{userLocation}</button></h4>
        </span>
        <form id="search" onSubmit={handleSubmit}>
          <input type="text" value={query} onChange={e => setQuery(e.target.value)}/>
          <button type="submit"><i className="fa fa-search"></i></button>
        </form>
      </div>
    
      <div className="weather">
      {error ? error :
        <>
        {loading ? <div><p>Loading weather</p><span className="spin"></span></div>:
            data && <Weather weatherData={data}/>}
        </>
      }
      </div>
    </div>
  );
}