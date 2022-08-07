import React, {useCallback, useContext, useEffect, useState} from 'react';
import classes from './ProfileMenu.module.scss';
import {IconButton, TextField, useTheme} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GlassyBox from "../../../../Containers/GlassyBox/GlassyBox";
import Switcher from "../../../../Containers/Switcher/Switcher";
import {ColorModeContext} from "../../../../App";
import {useDispatch, useSelector} from "react-redux";
import {addToFavorites, removeFromFavorites, setIsAuth, toggleMeasureType} from "../../../../store/profile/actions";
import {selectFavoriteCities, selectIsMetric} from "../../../../store/profile/selectors";
import {useNavigate, useParams} from "react-router-dom";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import dayjs from "dayjs";

import "../../../../utils/i18next";
import {useTranslation} from "react-i18next";

const styles = {
    TextField: {
        width: "100%",
    },
    Paper: {
        background: "rgba( 132, 132, 132, 0.1 )",
        backdropFilter: "blur( 15px )",
        outline: "1px solid rgba(231, 206, 74, 0.05)",
    }
}

const ProfileMenu = () => {
    const theme = useTheme();
    const {date} = useParams();
    const colorMode = useContext(ColorModeContext);
    const [isShowing, setShowing] = useState(false);
    const dispatch = useDispatch();
    const [valueDate, setValueDate] = React.useState(date || null);
    const isMetric = useSelector(selectIsMetric);
    const favoriteCities = useSelector(selectFavoriteCities);
    const {location} = useParams();
    const navigate = useNavigate();

    const {t, i18n} = useTranslation();

    const toggleProfileMenu = () => {
        setShowing(!isShowing);
    }
    const onToggleMeasureSystem = () => {
        dispatch(toggleMeasureType());
    }
    const onAddToFavorites = () => {
        dispatch(addToFavorites(location));
    }
    const onRemoveFromFavorites = () => {
        dispatch(removeFromFavorites(location));
    }
    const onChangeLang = (lang) => {
        i18n.changeLanguage(lang);
    }
    const onValueDateChange = (newValue) => {
        setValueDate(newValue);
        navigate(`../${location}/${dayjs(newValue).format('YYYY-MM-DD')}`, { replace: true });
    }
    const onLogout = () => {
        localStorage.profile.clear;
        dispatch(setIsAuth(false));
        navigate('../', {replace: true});
    }
    const getDaysAgoDate = useCallback((days) => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate() - days); // Getting Date some (days) ago
    }, [])
    return (
        <div className={[classes.ProfileMenu, classes[theme.palette.mode]].join(' ')}>
            <IconButton sx={{fontSize: '40px', top: '-13px'}} aria-label="delete" size="large" onClick={toggleProfileMenu}>
                <AccountCircleIcon fontSize="inherit"/>
            </IconButton>
            {isShowing ? <GlassyBox className={classes.GlassyBox}>
                <div className={classes.ProfileInfo}>
                    <div className={classes.FullName}>
                        <span>Andrey</span>
                        <span>Borbot</span>
                    </div>
                    <Switcher onChange={colorMode.toggleColorMode} checked={theme.palette.mode === "dark"}/>
                </div>
                <hr/>
                {
                    favoriteCities.find(city => city === location) ?
                        <button className={classes.FavoriteButton} onClick={onRemoveFromFavorites}>{t("ProfileMenu.RemoveFromFavorites")}</button> :
                        <button className={classes.FavoriteButton} onClick={onAddToFavorites}>{t("ProfileMenu.AddToFavorites")}</button>
                }
                <div className={classes.ProfileSettingSwitcher}>
                    <p>{t("ProfileMenu.System")}: </p>
                    <p><button onClick={onToggleMeasureSystem} disabled={isMetric}>{t("ProfileMenu.Metric")}</button> / <button
                        onClick={onToggleMeasureSystem} disabled={!isMetric}>{t("ProfileMenu.Imperial")}</button></p>
                </div>
                <div className={classes.ProfileSettingSwitcher}>
                    <p>{t("ProfileMenu.Language")}:
                        <button onClick={() => onChangeLang("eng")} disabled={i18n.language === "eng"}>eng</button> /
                        <button onClick={() => onChangeLang("ukr")} disabled={i18n.language === "ukr"}>укр</button></p>
                </div>
                <div className={classes.DatePicker}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            sx={styles.Paper}
                            label={t("ProfileMenu.PickADate")}
                            value={valueDate}
                            minDate={dayjs(getDaysAgoDate(7))}
                            maxDate={dayjs(getDaysAgoDate(1))}
                            onChange={onValueDateChange}
                            renderInput={(params) => <TextField sx={styles.TextField} {...params} autoComplete="off"/>}
                        />
                    </LocalizationProvider>
                </div>
                <button className={classes.Logout} onClick={onLogout}>{t("ProfileMenu.Logout")}</button>
            </GlassyBox> : null}
        </div>
    );
};

export default ProfileMenu;
