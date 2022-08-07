import React, {useCallback} from 'react';
import classes from './WeatherSheet.module.scss'
import star from '../../../images/star.svg'
import {useTheme} from "@mui/material";
import ProfileMenu from "./ProfileMenu/ProfileMenu";
import UpcomingDays from "./UpcomingDays/UpcomingDays";
import WeatherDisplay from "./WeatherDisplay/WeatherDisplay";
import {selectFavoriteCities} from "../../../store/profile/selectors";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {removeFromFavorites} from "../../../store/profile/actions";

const WeatherSheet = () => {
    const theme = useTheme();
    const favoriteCities = useSelector(selectFavoriteCities);
    const {location} = useParams();
    const dispatch = useDispatch();

    const onRemoveFromFavorites = useCallback((e) => {
        e.preventDefault();
        dispatch(removeFromFavorites(location));
    } , [location]);

    return (
        <div className={[classes.WeatherSheet, classes[theme.palette.mode]].join(' ')}>
            <ProfileMenu/>
            <UpcomingDays/>
            {favoriteCities.find(city => city === location) ?
                <div className={classes.star}>
                    <a href="#" onClick={onRemoveFromFavorites}>
                        <img src={star} alt="star"/>
                    </a>
                </div> : null}
            <WeatherDisplay/>
        </div>
    );
};

export default WeatherSheet;
