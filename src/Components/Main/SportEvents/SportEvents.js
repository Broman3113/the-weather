import React, {useCallback, useEffect} from 'react';
import classes from './SportEvents.module.scss'
import GlassyBox from "../../../Containers/GlassyBox/GlassyBox";
import {IconButton, useTheme} from "@mui/material";
import XButton from "../../../Containers/XButton/XButton";
import DeleteIcon from '@mui/icons-material/Delete';
import {fetchSportEvents} from "../../../store/sport/thunks";
import {useDispatch, useSelector} from "react-redux";
import {selectSportEvents} from "../../../store/sport/selectors";
import {addFavoriteSportEvent, removeFavoriteSportEvent} from "../../../store/profile/actions";
import {selectFavoriteSportEvents} from "../../../store/profile/selectors";
import {useTranslation} from "react-i18next";


const SportEvents = ({setSearchParams, searchParams, location}) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const sportEvents = useSelector(selectSportEvents);
    const favoriteSportEvents = useSelector(selectFavoriteSportEvents);
    const {t} = useTranslation();
    const onButtonClosed = useCallback(() => {
        searchParams.delete('sportEvents'); // delete each query param
        setSearchParams(searchParams); //  update state after
    }, [searchParams, setSearchParams]);

    const onAddEventToFavorite = useCallback((e, sportEvent) => {
        e.preventDefault();
        dispatch(addFavoriteSportEvent(sportEvent));
    }, [addFavoriteSportEvent]);
    const onRemoveEventFromFavorite = useCallback((id) => {
        dispatch(removeFavoriteSportEvent(id));
    }, [removeFavoriteSportEvent]);

    useEffect(() => {
        console.log("Location: ", location)
        dispatch(fetchSportEvents(location));
    }, [location])
    console.log(sportEvents);
    return (
        <div className={[classes.SportEvents, classes[theme.palette.mode]].join(' ')}>
            <GlassyBox className={classes.GlassyBox}>
                <XButton onClick={onButtonClosed} className={classes.SportEventsCloseBtn}/>
                <h2 className={classes.SportEventsTitle}>{t("SportEvents.SportEvents")}</h2>
                <div className={classes.EventsWrapper}>
                    <h2 className={classes.EventType}>{t("SportEvents.Football")}</h2>
                    {sportEvents.football.length ? sportEvents.football.map((event, index) => <div key={Math.random()}
                                                                                                   className={classes.Event}>
                            <h3 className={classes.EventTitle}>{t("SportEvents.Country")}</h3>
                            <p className={classes.EventData}>{event.country}</p>
                            <h3 className={classes.EventTitle}>{t("SportEvents.Tournament")}</h3>
                            <p className={classes.EventData}>{event.tournament}</p>
                            <h3 className={classes.EventTitle}>{t("SportEvents.Match")}</h3>
                            <p className={classes.EventData}>{event.match}</p>
                            <h3 className={classes.EventTitle}>{t("SportEvents.Stadium")}</h3>
                            <p className={classes.EventData}>{event.stadium}</p>
                            <h3 className={classes.EventTitle}>{t("SportEvents.Start")}</h3>
                            <p className={classes.EventData}>{event.start}</p>
                            <div className={classes.EventButton}>
                                <a href="#"
                                   onClick={e => onAddEventToFavorite(e, event)}>{t("SportEvents.AddToFavorite")}</a>
                            </div>
                            <hr/>

                        </div>
                    ) : null}

                    <h2 className={classes.EventType}>Cricket</h2>
                    {sportEvents.cricket.length ? sportEvents.cricket.map((event, index) => <div key={Math.random()}
                                                                                                 className={classes.Event}>
                            <h3 className={classes.EventTitle}>{t("SportEvents.Country")}</h3>
                            <p className={classes.EventData}>{event.country}</p>
                            <h3 className={classes.EventTitle}>{t("SportEvents.Tournament")}</h3>
                            <p className={classes.EventData}>{event.tournament}</p>
                            <h3 className={classes.EventTitle}>{t("SportEvents.Match")}</h3>
                            <p className={classes.EventData}>{event.match}</p>
                            <h3 className={classes.EventTitle}>{t("SportEvents.Stadium")}</h3>
                            <p className={classes.EventData}>{event.stadium}</p>
                            <h3 className={classes.EventTitle}>{t("SportEvents.Start")}</h3>
                            <p className={classes.EventData}>{event.start}</p>
                            <div className={classes.EventButton}>
                                <a href="#"
                                   onClick={e => onAddEventToFavorite(e, event)}>{t("SportEvents.AddToFavorite")}</a>
                            </div>
                            <hr/>

                        </div>
                    ) : null}

                    <h2 className={classes.EventType}>Golf</h2>
                    {sportEvents.golf.length ? sportEvents.golf.map((event, index) => <div key={Math.random()}
                                                                                           className={classes.Event}>
                            <h3 className={classes.EventTitle}>{t("SportEvents.Country")}</h3>
                            <p className={classes.EventData}>{event.country}</p>
                            <h3 className={classes.EventTitle}>{t("SportEvents.Tournament")}</h3>
                            <p className={classes.EventData}>{event.tournament}</p>
                            <h3 className={classes.EventTitle}>{t("SportEvents.Match")}</h3>
                            <p className={classes.EventData}>{event.match}</p>
                            <h3 className={classes.EventTitle}>{t("SportEvents.Stadium")}</h3>
                            <p className={classes.EventData}>{event.stadium}</p>
                            <h3 className={classes.EventTitle}>{t("SportEvents.Start")}</h3>
                            <p className={classes.EventData}>{event.start}</p>
                            <div className={classes.EventButton}>
                                <a href="#"
                                   onClick={e => onAddEventToFavorite(e, event)}>{t("SportEvents.AddToFavorite")}</a>
                            </div>
                            <hr/>

                        </div>
                    ) : null}
                </div>
                <div className={classes.SavedEvents}>
                    <h2 className={classes.SavedEventsTitle}>{t("SportEvents.SavedEvents")}</h2>
                    {favoriteSportEvents?.length ? favoriteSportEvents.map((event, index) => <div key={event.id}>
                        <div className={classes.SavedEvent}>
                            <div>
                                <h4 className={classes.SavedEventTitle}>{event?.match || ""}</h4>
                                <p className={classes.SavedEventTitle}>{event?.start || ""}</p>
                            </div>
                            <IconButton onClick={() => onRemoveEventFromFavorite(event.id)} aria-label="delete">
                                <DeleteIcon/>
                            </IconButton>
                        </div>
                        <hr/>
                    </div>) || "" : null}

                </div>
            </GlassyBox>
        </div>
    );
};

export default SportEvents;
