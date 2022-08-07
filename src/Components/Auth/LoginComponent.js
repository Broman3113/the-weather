import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import classes from './auth.module.scss'

import {Modal, TextField, useTheme} from "@mui/material";
import Button from "../../Containers/Button/Button";
import GlassyBox from "../../Containers/GlassyBox/GlassyBox";
import {selectUsers} from "../../store/users/selectors";
import {setIsAuth, setUserInfoAction} from "../../store/profile/actions";
import useModal from "../../hooks/useModal";
import {useInput} from "../../hooks/validationHooks/useInput";

const styles = {
    TextField: {
        '& .MuiInputBase-input': {
            fontSize: 20
        }
    }
}

const LoginComponent = (props) => {
    const email = useInput("", {isEmpty: true, minLength: 3, maxLength: 50, isEmail: true});
    const password = useInput("", {isEmpty: true, minLength: 7, maxLength: 20});


    const [modalModalMessage, setModalModalMessage] = useState("All good");

    const users = useSelector(selectUsers);

    const theme = useTheme();

    const {isShowing, toggle} = useModal();
    const dispatch = useDispatch();


    const onAuthLinkClicked = useCallback((e) => {
        e.preventDefault();
        props.setSearchParams({authType: 'register'});
    }, [])

    const onSubmitClicked = useCallback(() => {
        const userState = users.filter(user => user.email === email.value)[0] || "";
        if (userState !== "") {
            if (userState.password === password.value) {
                setModalModalMessage("All good!");
                toggle();
                dispatch(setUserInfoAction(userState));
                setTimeout(() => {
                    dispatch(setIsAuth(true));
                }, 1500)
            } else {
                setModalModalMessage("Wrong Password");
                toggle();
            }
        } else {
            setModalModalMessage("User with such email haven't found!");
            toggle();
        }
    } , [users, password, email, dispatch, toggle])
    return (
        <>
            <GlassyBox className={[classes.GlassyBox, classes[theme.palette.mode]].join(' ')}>
                <h1 className={classes.headerTitle}>Login Page</h1>
                <p>Don’t have an account? <a href="#" onClick={onAuthLinkClicked}>register</a></p>
                <div className={classes.formWrapper}>
                    <div className={classes.inputWrapper}>
                        <TextField sx={styles.TextField}
                                   type="email"
                                   label="Email"
                                   variant="standard"
                                   value={email.value}
                                   onChange={(e) => email.onChange(e)}
                                   onBlur={(e) => email.onBlur(e)}
                                   error={email.isDirty && email.valid.filter(Boolean).length !== 0}
                                   helperText={email.isDirty && email.valid.filter(Boolean).length !== 0 ? email.valid.filter(Boolean)[0] : ""}
                        />
                    </div>
                    <div className={classes.inputWrapper}>
                        <TextField sx={styles.TextField}
                                   type="password"
                                   label="Password"
                                   variant="standard"
                                   value={password.value}
                                   onChange={(e) => password.onChange(e)}
                                   onBlur={(e) => password.onBlur(e)}
                                   error={password.isDirty && password.valid.filter(Boolean).length !== 0}
                                   helperText={password.isDirty && password.valid.filter(Boolean).length !== 0 ? password.valid.filter(Boolean)[0] : ""}
                        />
                    </div>
                </div>
                <Button onClick={onSubmitClicked}
                        disabled={
                            email.valid.filter(Boolean).length ||
                            password.valid.filter(Boolean).length
                        }
                >Submit</Button>
                <br/>
                <br/>
                <Button onClick={() => console.log(users)}>Get users</Button>
            </GlassyBox>


            <Modal
                open={isShowing}
                onClose={toggle}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div>
                    <GlassyBox className={[classes.GlassyBoxModal, classes[theme.palette.mode]].join(' ')}>
                        <h1>theWeather</h1>
                        <hr/>
                        <h2>{modalModalMessage}</h2>
                    </GlassyBox>
                </div>
            </Modal>
        </>
    );
};

export default LoginComponent;
