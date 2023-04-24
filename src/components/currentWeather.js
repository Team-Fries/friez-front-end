import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import 'weather-react-icons/lib/css/weather-icons.css';
import 'weather-react-icons/lib/css/weather-icons-wind.css';
import { WeatherIcon } from 'weather-react-icons';
import Animal from './animals.js'


export default function CurrentWeather({ lat, long, hourlyTemps }) {
    const [data, setData] = useState([])
    const [weatherIcon, setWeatherIcon] = useState([])
    const [weatherID, setWeatherID] = useState([])

    useEffect(() => {
        if (lat && long) {
            const URL = (`https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`)
            axios.get(URL)
                .then(result => {
                    setData(result.data);
                    setWeatherIcon(result.data.weather[0].icon)
                    setWeatherID(result.data.weather[0].id)
                })
        }
    }, [lat, long, weatherID])

    console.log(weatherID)

    const high = Math.max(...hourlyTemps)
    console.log(high)
    const low = Math.min(...hourlyTemps)
    console.log(low)

    return (
        (typeof data.main != 'undefined') ? (

            <div className="weatherCard">
                <div className="header" data-drag-scroll-enabled="true">
                    {data.name}
                </div>
                <div className="cardBody">
                    <div className="tempIconBucket">
                        <div className='icon'>
                            <img src={`http://openweathermap.org/img/w/${weatherIcon}.png`} alt="icon"></img>
                        </div>
                        <div className="temp">
                            {Math.round(data.main.temp)}°F
                        </div>
                    </div>
                    <div className="description">
                        {data.weather[0].description}
                    </div>
                    <div className="highLowBox">
                        <div className="high">
                            ↑ {Math.ceil(high)}°F
                        </div>
                        <div className="low">
                            ↓ {Math.floor(low)}°F
                        </div>
                    </div>
                    <div className="humidity">
                        Humidity: {data.main.humidity}%
                    </div>
                    <Animal weatherID={weatherID} />
                </div>
            </div >
        ) : (
            <div> "Loading" </div>
        )
    );

}