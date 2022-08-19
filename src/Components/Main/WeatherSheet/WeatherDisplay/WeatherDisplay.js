import React, {useMemo} from 'react';
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";

import classes from './WeatherDisplay.module.scss'

import GlassyBox from "../../../../Containers/GlassyBox/GlassyBox";
import {useTheme} from "@mui/material";

import "swiper/css";
import "swiper/css/pagination";
import {Swiper, SwiperSlide} from "swiper/react";
import {Mousewheel} from "swiper";

import dayjs from "dayjs";
import {
    selectIsWeatherInfoLoading,
    selectWeatherDayToDisplay,
    selectWeatherHistoryDayDetails,
    selectWeatherHistoryHourDetails,
    selectWeatherHistoryInfo,
    selectWeatherInfo
} from "../../../../store/weather/selectors";
import {selectIsMetric} from "../../../../store/profile/selectors";

const WeatherDisplay = () => {
    const weatherInfo = useSelector(selectWeatherInfo);
    const weatherHistoryInfo = useSelector(selectWeatherHistoryInfo);
    const weatherHistoryDayDetails = useSelector(selectWeatherHistoryDayDetails);
    const weatherHistoryHourDetails = useSelector(selectWeatherHistoryHourDetails);
    const weatherDayToDisplay = useSelector(selectWeatherDayToDisplay);
    const isWeatherInfoLoading = useSelector(selectIsWeatherInfoLoading);
    const isMetric = useSelector(selectIsMetric);
    const {date, location} = useParams();
    const theme = useTheme();
    const navigate = useNavigate();

    const weatherToDisplay = useMemo(() => weatherDayToDisplay ? weatherInfo.forecast?.forecastday[weatherDayToDisplay].hour || [] :
        [
            ...weatherInfo.forecast?.forecastday[0].hour.slice(Number(dayjs(weatherInfo.location.localtime).format('H'))) || "",
            ...weatherInfo.forecast?.forecastday[1].hour.slice(0, Number(dayjs(weatherInfo.location.localtime).format('H')) + 1) || ""
        ], [weatherDayToDisplay, weatherInfo]);


    if (isWeatherInfoLoading) {
        return <div className={classes.WeatherDisplay}>Loading...</div>
    }
    if(date === dayjs().format('YYYY-MM-DD')) {
        navigate('../' + location); // Check if date is today, we display default current weather
    }
    if (date) {
        return (
            <div className={[classes.WeatherDisplay, classes[theme.palette.mode]].join(' ')}>
                <div className={classes.WeatherDisplayUpperInfo}>
                    <div className={classes.WeatherWrapper}>
                        <div className={classes.WeatherCityInfo}>
                            <div className={classes.WeatherCityInfoCity}>
                                <p>{weatherHistoryInfo.location?.name || "City"}</p>
                            </div>
                            <div className={classes.WeatherCityInfoDate}>
                                <span>{dayjs(date).format('dddd, DD MMM \' YY')}</span>
                            </div>
                        </div>
                        <div className={classes.WeatherType}>
                            <div className={classes.WeatherTypeImage}><img
                                src={weatherHistoryDayDetails.condition?.icon || ""}
                                alt={weatherHistoryDayDetails.condition?.text || ""}/>
                            </div>
                            <div
                                className={classes.WeatherTypeTitle}>{weatherHistoryDayDetails.condition?.text || ""}</div>
                        </div>
                    </div>
                </div>
                <div className={classes.WeatherDisplayHourly}>
                    <GlassyBox className={classes.GlassyBox}>
                        <Swiper
                            slidesPerView={6.4}
                            spaceBetween={0}
                            grabCursor={true}
                            mousewheel={true}
                            className="mySwiper"
                            modules={[Mousewheel]}
                            breakpoints={{
                                0: {
                                    slidesPerView: 3.4,
                                },
                                1400: {
                                    slidesPerView: 5.4,
                                },
                                1600: {
                                    slidesPerView: 6.4,
                                },
                            }}
                        >
                            {
                                weatherHistoryHourDetails?.map((hourlyInfo, index) => <SwiperSlide key={index}>
                                    <div className={classes.HourlyItem}>
                                        <div className={classes.WeatherTime}>
                                            <span>{dayjs(hourlyInfo.time).format('HH:mm')}</span></div>
                                        <div className={classes.HourlyWeatherIcon}>
                                            <img src={hourlyInfo.condition.icon} alt={hourlyInfo.condition.text}/>
                                        </div>
                                        <div className={classes.HourlyWeatherTemperature}>
                                            <span>{isMetric ? Math.trunc(hourlyInfo.temp_c) : Math.trunc(hourlyInfo.temp_f)}°</span>
                                        </div>
                                    </div>
                                </SwiperSlide>) || null
                            }

                        </Swiper>

                    </GlassyBox>
                </div>
            </div>
        );
    }

    return (
        <div className={[classes.WeatherDisplay, classes[theme.palette.mode]].join(' ')}>
            <div className={classes.WeatherDisplayUpperInfo}>
                <div className={classes.WeatherTemperature}>
                    <span>{isMetric ? Math.trunc(weatherInfo.current?.temp_c) || "" : Math.trunc(weatherInfo.current?.temp_f) || ""}°</span>
                </div>
                <div className={classes.WeatherWrapper}>
                    <div className={classes.WeatherCityInfo}>
                        <div className={classes.WeatherCityInfoCity}>
                            <p>{weatherInfo.location?.name || "City"}</p>
                        </div>
                        <div className={classes.WeatherCityInfoDate}>
                            <span>{dayjs(weatherInfo.location?.localtime).format('HH:mm - dddd, DD MMM \' YY')}</span>
                        </div>
                    </div>
                    <div className={classes.WeatherType}>
                        <div className={classes.WeatherTypeImage}><img src={weatherInfo.current?.condition.icon || ""}
                                                                       alt={weatherInfo.current?.condition.text || ""}/>
                        </div>
                        <div className={classes.WeatherTypeTitle}>{weatherInfo.current?.condition.text || ""}</div>
                    </div>
                </div>
            </div>
            <div className={classes.WeatherDisplayHourly}>
                <GlassyBox className={classes.GlassyBox}>
                    <Swiper
                        slidesPerView={6.4}
                        spaceBetween={0}
                        grabCursor={true}
                        mousewheel={true}
                        className="mySwiper"
                        modules={[Mousewheel]}
                        breakpoints={{
                            0: {
                                slidesPerView: 3.4,
                            },
                            1400: {
                                slidesPerView: 5.4,
                            },
                            1600: {
                                slidesPerView: 6.4,
                            },
                        }}
                    >
                        {
                            weatherToDisplay.map((hourlyInfo, index) => <SwiperSlide key={index}>
                                <div className={classes.HourlyItem}>
                                    <div className={classes.WeatherTime}>
                                        <span>{dayjs(hourlyInfo.time).format('HH:mm')}</span></div>
                                    <div className={classes.HourlyWeatherIcon}>
                                        <img src={hourlyInfo.condition.icon} alt={hourlyInfo.condition.text}/>
                                    </div>
                                    <div className={classes.HourlyWeatherTemperature}>
                                        <span>{isMetric ? Math.trunc(hourlyInfo.temp_c) : Math.trunc(hourlyInfo.temp_f)}°</span>
                                    </div>
                                </div>
                            </SwiperSlide>)
                        }

                    </Swiper>

                </GlassyBox>
            </div>
        </div>
    );
};

export default WeatherDisplay;
