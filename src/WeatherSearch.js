import React, { useState } from "react";
import axios from "axios";
import './App.css';

export default function WeatherSearch() {
    let [city, setCity] = useState("")
    let [load, setLoad] = useState(false)
    let [temperature, setTemprature] = useState(null);
    let [description, setDescription] = useState(null);
    let [humidity, setHumidity] = useState(null);
    let [wind, setWind] = useState(null);
    let [icon, setIcon] = useState(null);
    let [imgDescrip, setImgDescribe] = useState(null);




    function forcast(response) {
        console.log(response.data)
        setLoad(true)
        setTemprature(response.data.main.temp);
    setDescription(response.data.weather[0].description);
    setHumidity(response.data.main.humidity);
    setWind(response.data.wind.speed);
    setIcon(
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    setImgDescribe(response.data.weather[0].main);
    }

    function showCity(event) {
        setCity(event.target.value)
    }
     function handleSubmit(event) {
        event.preventDefault()
        let key = `61b1ac8421d64c213cde1e9b5856144a`
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
axios.get(url).then(forcast)
     }

     let form = (<form onSubmit={handleSubmit}>
     <div class="container">
         <div class="row">
             <div class="col-9">
         <input type="search" placeholder="Enter a city" class="form-control" onChange={showCity}/></div>
         <div class="col-3">
         <input type="submit" value="Search" class="btn btn-primary" /></div>
         </div>            
         </div>
     </form>)

     if(load) {        
    return (
   <div className="WeatherSearch">
    <div class="main">
        <div class="app">
            
          {form}
            <ul class="city-name">
                <li>{city}</li>
                
                <li class="day">{description}</li>

            </ul>

            <div class="container">
                <div class="row">
                    <div class="col"><span class="current-img"><img src={icon} alt={imgDescrip} /></span><span class="current-weather">{Math.round(temperature)}</span></div>
                    <div class="col"><ul><li class="nothing">lll</li><li>Humidity: {humidity} %</li>
                    <li>Wind: {Math.round(wind)} km/h</li></ul></div>
                </div>
            </div>
        </div>

    </div>
   </div>
        ) } else {
            return form
        }
}