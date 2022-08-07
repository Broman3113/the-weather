import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import classes from './SearchLocation.module.scss';
import {Fade, InputAdornment, Paper, Popper, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import {fetchSearch} from "../../../../store/search/thunks";
import {setSearchInfoSuccess} from "../../../../store/search/action";
import {selectSearchResults} from "../../../../store/search/selectors";
import {selectFavoriteCities} from "../../../../store/profile/selectors";
import useDebounce from "../../../../hooks/useDebounce";

import {useTranslation} from "react-i18next";


const styles = {
    TextField: {
        '& .MuiInput-input': {fontSize: 24},
        '& .MuiInputLabel-root': {fontSize: 24},
        width: "100%",
    },
    Paper: {
        background: "rgba( 132, 132, 132, 0.1 )",
        backdropFilter: "blur( 15px )",
        outline: "1px solid rgba(231, 206, 74, 0.05)",
    }
}

const SearchLocation = () => {
    const [anchorEl, setAnchorEl] = useState(null); //DropDown states
    const [open, setOpen] = useState(false); //DropDown states

    const [inputValue, setInputValue] = useState("");

    const searchResult = useSelector(selectSearchResults);
    const favoriteCities = useSelector(selectFavoriteCities); // Will render if the searchResult is empty

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const debouncedSearchTerm = useDebounce(inputValue, 500); // Hook to debounce inputValue

    useEffect(() => {
            if(inputValue.length >= 3) {
                dispatch(fetchSearch(inputValue));
            }
        }, [debouncedSearchTerm]); // Only call effect if debounced search term changes

    const onInputFocused = useCallback((event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
        dispatch(setSearchInfoSuccess([]));
    } , []);
    const onInputBlurred = useCallback(() => {
        setOpen(false);
        setInputValue("");
    }, [])
    const onAnotherLocationClicked = useCallback((value) => {
        navigate(`../${value}`, { replace: true });
    } , [])

    return (
        <div className={classes.SearchLocation}>
            <Popper sx={{minWidth: "100%"}} disablePortal={true} open={open} anchorEl={anchorEl} placement="bottom"
                    transition>
                {({TransitionProps}) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper sx={styles.Paper}>
                            <ul className={classes.SearchList}>
                                {
                                    searchResult.length ?
                                        searchResult.map(item => <li key={item.id} onClick={() => onAnotherLocationClicked(item.name)}>
                                            {item.name}, {item.country}</li>) :
                                        favoriteCities.length ? favoriteCities.map(item => <li key={item} onClick={() => onAnotherLocationClicked(item)}>
                                            {item} - {t("SearchLocation.SavedLocation")}</li>) :
                                            <li style={{cursor: 'default', textAlign: 'center'}}>{t("SearchLocation.NoResults")}</li>
                                }
                            </ul>
                        </Paper>
                    </Fade>
                )}
            </Popper>
            <TextField sx={styles.TextField}
                       value={inputValue}
                       onFocus={onInputFocused}
                       onBlur={onInputBlurred}
                       onChange={e => setInputValue(e.target.value)}
                       label={t('SearchLocation.AnotherLocation')}
                       variant="standard"
                       autoComplete="off"
                       InputProps={{
                           endAdornment: (
                               <InputAdornment sx={{position: 'absolute', right: '0'}} position="end">
                                   <SearchIcon/>
                               </InputAdornment>
                           ),
                       }}
            />
        </div>
    );
}

export default SearchLocation;
