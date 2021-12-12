import React from 'react'
import moment from 'moment';
import { Icon } from '../Icon/icon';

const Weather = ({weatherData}) => {
    return (
        <>
        {weatherData && 
            <>
                <div>
                    <h1>{weatherData.name}</h1>
                    <Icon overview={weatherData.weather[0].main}/>
                </div>
                <div>
                    <h4>{moment().format('dddd')} {moment().format('LL')}</h4>
                    <p>{weatherData.weather[0].main}</p>
                    <p id="temp">{Math.round(weatherData.main.temp)} &deg;C</p>
                    <p>Humidity: {weatherData.main.humidity} %</p>
                </div> 
                </>
            }
        </>
    
    )
}
export default Weather;
