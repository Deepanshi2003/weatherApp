import React, { useEffect, useState } from "react";
import "./index.css";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const Home = () => {
    const KEY="4cf7737c96e2599dad2dd16dc46d91d8";
    console.log(KEY)

    const [weatherData,setWeatherData]=useState(false)
    const [placeName,setPlaceName]=useState('London')
// console.log(weatherData)

   const handleName=(e)=>{
       setPlaceName(e.target.value)
   }
    const search=async (city)=>{
        axios.get(
             `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${KEY}`
        ).then(res=>{
            
           
                console.log("cityname", city)
                setWeatherData({
                    humidity:res.data.main.humidity,
                    windSpeed:res.data.wind.speed,
                    temperature:Math.floor(res.data.main.temp),
                    location:res.data.name,
                    icon: res.data.weather[0].icon
                })
            
         
    }).catch(Error=>setWeatherData({
        humidity:0,
        windSpeed:0,
        temperature:0,
        location:"No data found",
        // icon: res.data.weather[0].icon
    }))
    }

    useEffect(()=>{
        search(placeName)
    },[])
  return (
    <div className="weather">
      <div className="searchBar">
        <input type="text" placeholder="search" onChange={handleName} onKeyDown={()=>search(placeName)}/>
        <FaSearch className="searchIcon" onClick={()=>search(placeName)}/>
      </div>
    
     {
        weatherData?
        <>
          <div className="weatherImage">
        <img src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt="" />
      </div>
      <div className="weatherData">
        <p className="temperature"> {weatherData.temperature}°c</p>
        <p className="placeName"> {weatherData.location}</p>
      </div>
         <div className="temperatureArea">
        <div className="temperatureData">
          <div className="tempImage">
            <img src="\Images\dewpoint.png" alt="" />
          </div>
          <div className="temp">
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="temperatureData">
          <div className="tempImage">
            <img src="\Images\wind.png" alt="" />
          </div>
          <div className="temp">
            <p>{weatherData.windSpeed} km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
        </>:
        <></>
     }
    </div>
  );
};

export default Home;
