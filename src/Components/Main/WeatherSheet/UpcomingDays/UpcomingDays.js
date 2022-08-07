import React, {useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import classes from './UpcomingDays.module.scss'
import {useTheme} from "@mui/material";
import GlassyBox from "../../../../Containers/GlassyBox/GlassyBox";
import {
    selectIsWeatherHistoryInfoError,
    selectIsWeatherHistoryInfoLoading,
    selectIsWeatherInfoError,
    selectIsWeatherInfoLoading,
    selectWeatherDayToDisplay,
    selectWeatherHistoryInfo,
    selectWeatherInfo
} from "../../../../store/weather/selectors";
import {selectIsMetric} from "../../../../store/profile/selectors";
import {setWeatherDayToDisplay} from "../../../../store/weather/actions";

import dayjs from "dayjs";
import {useTranslation} from "react-i18next";


const UpcomingDays = () => {

    const weatherInfo = useSelector(selectWeatherInfo);
    const isWeatherInfoLoading = useSelector(selectIsWeatherInfoLoading);
    const isWeatherHistoryInfoLoading = useSelector(selectIsWeatherHistoryInfoLoading);
    const isMetric = useSelector(selectIsMetric);
    const weatherHistoryInfo = useSelector(selectWeatherHistoryInfo);
    const theme = useTheme();
    const weatherDayToDisplay = useSelector(selectWeatherDayToDisplay);
    const dispatch = useDispatch();
    const {date} = useParams();
    const weatherInfoError = useSelector(selectIsWeatherInfoError);
    const weatherHistoryInfoError = useSelector(selectIsWeatherHistoryInfoError);
    const weatherToDisplay = useMemo(() => date ? weatherHistoryInfo : weatherInfo, [date, weatherHistoryInfo, weatherInfo]); // Display needed weather
    const {t} = useTranslation();

    if  (weatherInfoError || weatherHistoryInfoError) {
        return (
            <div className={[classes.UpcomingDays, classes[theme.palette.mode]].join(' ')}>
                <GlassyBox className={classes.GlassyBox}>
                    <p>{`${weatherInfoError || weatherHistoryInfoError}`}</p>
                </GlassyBox>
            </div>
        )
    }
    const onDayClicked = useCallback((day, index) => {
        dispatch(setWeatherDayToDisplay(index));
    } , []);
    return (
        <div className={[classes.UpcomingDays, classes[theme.palette.mode]].join(' ')}>
            <GlassyBox className={classes.GlassyBox}>
                {!isWeatherInfoLoading || isWeatherHistoryInfoLoading ? weatherToDisplay.forecast?.forecastday?.map((day, index) => <div
                    key={index}
                    className={classes.WeatherDay}
                    onClick={() => onDayClicked(day, index)}
                    style={{backgroundColor: weatherDayToDisplay === index && "rgba(255,255,255,0.2)"}}
                >
                    <p className={classes.Date}>{dayjs(day.date).format('DD.MM')}</p>
                    <div className={classes.WeatherIcon}>
                        <img src={day.day.condition?.icon} alt={day.day.condition?.code}/>
                    </div>
                    <div className={classes.AverageTemperature}>
                        <div>
                            <span>{t("UpcomingDays.Min")}</span>
                            <p>{isMetric ? Math.trunc(day.day.mintemp_c) : Math.trunc(day.day.mintemp_f)}°</p>
                        </div>
                        <div>
                            <span>{t("UpcomingDays.Max")}</span>
                            <p>{isMetric ? Math.trunc(day.day.maxtemp_c) : Math.trunc(day.day.maxtemp_f)}°</p>
                        </div>
                    </div>
                </div>) || null : <p>loading</p>}

            </GlassyBox>
        </div>
    );
};

export default UpcomingDays;
