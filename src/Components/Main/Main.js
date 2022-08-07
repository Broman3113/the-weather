import React, {useCallback, useEffect, useMemo} from 'react';
import classes from './Main.module.scss'
import WeatherDetails from "./WeatherDetails/WeatherDetails";
import WeatherSheet from "./WeatherSheet/WeatherSheet";
import {useDispatch} from "react-redux";
import {fetchWeather, fetchWeatherHistory} from "../../store/weather/thunks";
import {useNavigate, useParams} from "react-router-dom";
import dayjs from "dayjs";

const Main = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {location} = useParams();
    const {date} = useParams();
    const locationLocalStorage = useMemo(() => JSON.parse(localStorage.profile).profileSettings.location, [localStorage.profile]);

    useEffect(() => {
        if (location) {
            dispatch(fetchWeather(location));
        } else if(locationLocalStorage) {
            navigate(locationLocalStorage)
        } else {
            navigate(`Kiev`)
        }
    }, [location])

    const getDaysAgoDate = useCallback((days) => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate() - days); // Getting Date some (days) ago
    }, [])

    useEffect(() => {
        if (dayjs(date) < dayjs(getDaysAgoDate(0))) {
            dispatch(fetchWeatherHistory(location, dayjs(date).format('YYYY-MM-DD')));
        }
    }, [date])
    return (
        <div className={classes.Main}>
            <WeatherSheet/>
            <WeatherDetails/>
        </div>
    );
};

export default Main;
