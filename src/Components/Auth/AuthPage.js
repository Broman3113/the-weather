import React from 'react';
import classes from './auth.module.scss'

import GlassyBox from "../../Containers/GlassyBox/GlassyBox";
import LoginComponent from "./LoginComponent";
import RegistrationComponent from "./RegistrationComponent";
import {useSearchParams} from "react-router-dom";


const AuthPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const authType = searchParams.get('authType') || 'login';


    if (authType === 'register') {
        return (
            <div className={classes.AuthPage}>
                <RegistrationComponent setSearchParams={setSearchParams}/>
            </div>
        );
    }
    if (authType === 'login') {
        return (
            <div className={classes.AuthPage}>
                <LoginComponent setSearchParams={setSearchParams}/>
            </div>
        );
    } else {
        return (
            <div className={classes.AuthPage}>
                <p>Page not found</p>
            </div>
        );
    }

};

export default AuthPage;
