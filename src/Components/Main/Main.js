import React, {useCallback, useEffect, useMemo} from 'react';
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {fetchWeather, fetchWeatherHistory} from "../../store/weather/thunks";
import classes from './Main.module.scss'
import WeatherDetails from "./WeatherDetails/WeatherDetails";
import WeatherSheet from "./WeatherSheet/WeatherSheet";
import dayjs from "dayjs";

const Main = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {location, date} = useParams();
    const locationLocalStorage = useMemo(() => JSON.parse(localStorage.profile).profileSettings.location, [localStorage.profile]);

    useEffect(() => {
        if (location) {
            dispatch(fetchWeather(location));
        } else if(locationLocalStorage) {
            navigate(locationLocalStorage);
        } else {
            navigate(`Kiev`);
        }
    }, [location])

    const getDaysAgoDate = useCallback((days) => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate() - days); // Getting Date some (days) ago
    }, [])

    useEffect(() => {
        if (dayjs(date) < dayjs(getDaysAgoDate(7))) {
            alert(`You can't see weather for dates before ${dayjs(getDaysAgoDate(7)).format('YYYY-MM-DD')}`);
            navigate(`/${location}/${dayjs(getDaysAgoDate(7)).format('YYYY-MM-DD')}`);
        }else if (dayjs(date) < dayjs(getDaysAgoDate(0))) {
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
