import React, {useCallback} from 'react';
import {useSelector} from "react-redux";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import classes from "./WeatherDetails.module.scss"

import GlassyBox from "../../../Containers/GlassyBox/GlassyBox";
import SearchLocation from "./SearchLocation/SearchLocation";
import {useTheme} from "@mui/material";
import SportEvents from "../SportEvents/SportEvents";
import {
    selectWeatherHistoryDayDetails,
    selectWeatherInfo
} from "../../../store/weather/selectors";
import {selectFavoriteCities, selectIsMetric} from "../../../store/profile/selectors";

import {useTranslation} from "react-i18next";


const WeatherDetails = () => {
    const theme = useTheme();
    const weatherInfo = useSelector(selectWeatherInfo);
    const weatherHistoryDayDetails = useSelector(selectWeatherHistoryDayDetails);
    const isMetric = useSelector(selectIsMetric);
    const favoriteCities = useSelector(selectFavoriteCities);

    const [searchParams, setSearchParams] = useSearchParams();
    const sportEvents = searchParams.get('sportEvents');

    const {location, date} = useParams();
    const navigate = useNavigate();

    const {t} = useTranslation();

    const onAnotherLocationClicked = useCallback((city) => {
        navigate(`../${city}`, {replace: true});
    } , [navigate]);
    const onSportEventOpen = useCallback((e) => {
        e.preventDefault();
        setSearchParams({sportEvents: "show"});
    }, [location, date])

    if (date) {
        return (
            <>
                <div className={[classes.WeatherDetails, classes[theme.palette.mode]].join(' ')}>
                    <GlassyBox className={classes.GlassyBox}/>
                    <div className={classes.WeatherDetailsWrapper}>
                        <SearchLocation/>
                        <h3 className={classes.SavedLocationTitle}>{t("WeatherDetails.SavedLocations")}</h3>
                        <ul className={classes.SavedLocationsList}>
                            {favoriteCities.length ?
                                favoriteCities.map(city => <li key={city}><span onClick={() => onAnotherLocationClicked(city)}>{city}</span></li>) :
                                <li>{t("WeatherDetails.NoFavoriteCitiesYet")}</li>}
                        </ul>
                        <hr className={classes.Divider}/>
                        <h3 className={classes.WeatherDetailsTitle}>{t("WeatherDetails.WeatherDetails")}</h3>
                        <div className={classes.WeatherData}>
                            <div>
                                <h5>{t("WeatherDetails.MaxWind")}</h5>
                                <p>{isMetric ? weatherHistoryDayDetails?.maxwind_kph+" km/h" : weatherHistoryDayDetails?.maxwind_mph+" mp/h"}</p>
                            </div>
                            <div>
                                <h5>{t("WeatherDetails.TotalPrecipitation")}</h5>
                                <p>{isMetric ? weatherHistoryDayDetails?.totalprecip_mm+" mm" : weatherHistoryDayDetails?.totalprecip_in+" in"}</p>
                            </div>
                            <div>
                                <h5>{t("WeatherDetails.AverageHumidity")}</h5>
                                <p>{weatherHistoryDayDetails?.avghumidity}%</p>
                            </div>
                            <div>
                                <h5>{t("WeatherDetails.AverageVisibility")}</h5>
                                <p>{isMetric ? weatherHistoryDayDetails?.avgvis_km+" km" : weatherHistoryDayDetails?.avgvis_miles+" miles"}</p>
                            </div>
                            <div>
                                <h5>{t("WeatherDetails.MinTemperature")}</h5>
                                <p>{isMetric ? weatherHistoryDayDetails?.mintemp_c+" °C" : weatherHistoryDayDetails?.mintemp_f+" °F"}</p>
                            </div>
                            <div>
                                <h5>{t("WeatherDetails.MaxTemperature")}</h5>
                                <p>{isMetric ? weatherHistoryDayDetails?.maxtemp_c+" °C" : weatherHistoryDayDetails?.maxtemp_f+" °F"}</p>
                            </div>
                        </div>
                        <a href="#" onClick={onSportEventOpen} className={classes.SportEvents}>{t("WeatherDetails.SportEvents")}</a>
                    </div>
                </div>
                {sportEvents === "show" ? <SportEvents location={location} searchParams={searchParams} setSearchParams={setSearchParams}/> : null}
            </>
        )
    }
    return (
        <>
            <div className={[classes.WeatherDetails, classes[theme.palette.mode]].join(' ')}>
                <GlassyBox className={classes.GlassyBox}/>
                <div className={classes.WeatherDetailsWrapper}>
                    <SearchLocation/>
                    <h3 className={classes.SavedLocationTitle}>{t("WeatherDetails.SavedLocations")}</h3>
                    <ul className={classes.SavedLocationsList}>
                        {favoriteCities.length ?
                            favoriteCities.map(city => <li key={city}><span onClick={() => onAnotherLocationClicked(city)}>{city}</span></li>) :
                            <li>{t("WeatherDetails.NoFavoriteCitiesYet")}</li>}
                    </ul>
                    <hr className={classes.Divider}/>
                    <h3 className={classes.WeatherDetailsTitle}>{t("WeatherDetails.WeatherDetails")}</h3>
                    <div className={classes.WeatherData}>
                        <div>
                            <h5>{t("WeatherDetails.Wind")}</h5>
                            <p>{isMetric ? weatherInfo.current?.wind_kph+" km/h" : weatherInfo.current?.wind_mph+" mp/h"}</p>
                        </div>
                        <div>
                            <h5>{t("WeatherDetails.Precipitation")}</h5>
                            <p>{isMetric ? weatherInfo.current?.precip_mm+" mm" : weatherInfo.current?.precip_in+" in"}</p>
                        </div>
                        <div>
                            <h5>{t("WeatherDetails.Humidity")}</h5>
                            <p>{weatherInfo.current?.humidity}%</p>
                        </div>
                        <div>
                            <h5>{t("WeatherDetails.Visibility")}</h5>
                            <p>{isMetric ? weatherInfo.current?.vis_km+" km" : weatherInfo.current?.vis_miles+" miles"}</p>
                        </div>
                        <div>
                            <h5>{t("WeatherDetails.WindDirection")}</h5>
                            <p>{weatherInfo.current?.wind_dir}</p>
                        </div>
                        <div>
                            <h5>{t("WeatherDetails.Pressure")}</h5>
                            <p>{isMetric ? weatherInfo.current?.pressure_mb+" mb" : weatherInfo.current?.pressure_in+" in"}</p>
                        </div>
                        <div>
                            <h5>{t("WeatherDetails.Ultraviolet")}</h5>
                            <p>{weatherInfo.current?.uv}</p>
                        </div>
                        <div>
                            <h5>{t("WeatherDetails.FeelsLike")}</h5>
                            <p>{isMetric ? weatherInfo.current?.feelslike_c : weatherInfo.current?.feelslike_f}°</p>
                        </div>
                    </div>
                    <a href="#" onClick={onSportEventOpen} className={classes.SportEvents}>{t("WeatherDetails.SportEvents")}</a>
                </div>
            </div>
            {sportEvents === "show" ? <SportEvents searchParams={searchParams} setSearchParams={setSearchParams} location={location}/> : null}
        </>
    );
};

export default WeatherDetails;
