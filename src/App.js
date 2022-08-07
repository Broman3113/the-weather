import React, {createContext, useEffect, Suspense} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Routes, Route} from "react-router-dom";
import './App.scss';

import {authRoutes, notAuthRoutes} from "./routes";

import cloudyDark from './images/weatherBackgrounds/cloudyDark.jpg'
import cloudyWhite from './images/weatherBackgrounds/cloudyWhite.jpg'

import {ThemeProvider, createTheme} from '@mui/material/styles';

import {setProfileAction} from "./store/profile/actions";
import {setUsersAction} from "./store/users/actions";

import {selectIsAuth, selectProfileState} from "./store/profile/selectors";
import {selectUsersState} from "./store/users/selectors";



export const ColorModeContext = createContext({toggleColorMode: () => {}}); // Creating context with toggle mode function

function App() {
    // Checking if profile localstorage exists we set it to profile state
    // If not we set localstorage profile to initial profile state
    // The same we do for users


    useEffect(() => {
        if (localStorage.darkMode === null) {
            localStorage.darkMode = "true";
        }
        if (localStorage.profile) {
            dispatch(setProfileAction(JSON.parse(localStorage.profile))); // Check if localStorage.profile isn't empty, we set profile settings from localStorage.profile
        } else {
            localStorage.profile = JSON.stringify(profile); // if localStorage empty we set default settings to localStorage.profile
        }
        if (localStorage.users) {
            dispatch(setUsersAction(JSON.parse(localStorage.users))); // Check if localStorage.users isn't empty, we set users settings from localStorage.users
        } else {
            localStorage.users = JSON.stringify(users); // if localStorage empty we set default settings to localStorage.users
        }
    }, []);

    console.log(localStorage.darkMode);
    const profile = useSelector(selectProfileState);
    const users = useSelector(selectUsersState);
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);

    //Toggle theme mode
    const [mode, setMode] = React.useState(localStorage.darkMode === "true" ? 'dark' : 'light');
    const [color, setColor] = React.useState(localStorage.darkMode === "true" ? '#fff' : '#1f1f1f');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                localStorage.darkMode = localStorage.darkMode !== "true";
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
                setColor((prevMode) => (prevMode === '#fff' ? '#1f1f1f' : '#fff'));
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    primary: {
                        light: "transparent",
                        main: '#00C8F3',
                        dark: '#1f1f1f',
                        contrastText: 'rgba(0, 0, 0, 0.87)',
                    },
                    text: {
                        primary: color,
                    },
                    mode, //mode: mode
                },
            }),
        [mode, color],
    );


    return (
        // Suspense is react component for lazy loading
        <Suspense fallback="...Loading">
            <div className="App" style={{background: `url(${theme.palette.mode === "dark" ? cloudyDark : cloudyWhite}) fixed no-repeat`, transition: "background .5s ease"}}>

                <ColorModeContext.Provider value={colorMode}>
                    <ThemeProvider theme={theme}>
                        <Routes>
                            {isAuth ? // Setting routes for authorized and non-authorized users
                                authRoutes.map(({path, Component}) =>
                                    <Route key={path} path={path} element={<Component/>}/>)
                                :
                                notAuthRoutes.map(({path, Component}) =>
                                    <Route key={path} path={path} element={<Component/>}/>)}
                        </Routes>
                    </ThemeProvider>
                </ColorModeContext.Provider>

                {/*<img src={useGetWeatherIcon(code)} alt="Some" />*/}
                {/*<button onClick={() => dispatch(setIsAuth(true))}>Set to true</button>*/}
                {/*<button onClick={() => dispatch(setIsAuth(false))}>Set to false</button>*/}
            </div>
        </Suspense>
    );
}

export default App;

