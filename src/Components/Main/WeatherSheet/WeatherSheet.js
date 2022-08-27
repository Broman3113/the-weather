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
import {addToFavoritesThunk, removeFromFavoritesThunk} from "../../../store/profile/thunks";

const WeatherSheet = () => {
    const theme = useTheme();
    const favoriteCities = useSelector(selectFavoriteCities);
    const {location} = useParams();
    const dispatch = useDispatch();

    const onRemoveFromFavorites = useCallback(() => {
        dispatch(removeFromFavoritesThunk(location));
    }, [location]);
    const onAddToFavorites = useCallback(() => {
        dispatch(addToFavoritesThunk(location));
    }, [location]);

    return (
        <div className={[classes.WeatherSheet, classes[theme.palette.mode]].join(' ')}>
            <ProfileMenu/>
            <UpcomingDays/>
            {favoriteCities.find(city => city === location) ?
                <div className={classes.star}>
                    <img src={star} alt="star" onClick={onRemoveFromFavorites}/>
                </div> :
                <div className={[classes.star, classes.starInactive].join(" ")}>
                    <img src={star} alt="star inactive" onClick={onAddToFavorites}/>
                </div>
            }
            <WeatherDisplay/>
        </div>
    );
};

export default WeatherSheet;
