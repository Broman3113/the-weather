import React, {useCallback, useState} from 'react';
import {useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import {addUserAction} from "../../store/users/actions";
import useModal from "../../hooks/useModal";

import {Modal, TextField, useTheme} from "@mui/material";
import GlassyBox from "../../Containers/GlassyBox/GlassyBox";
import Button from "../../Containers/Button/Button";

import classes from "./auth.module.scss";
import {useInput} from "../../hooks/validationHooks/useInput";

const styles = {
    TextField: {
        '& .MuiInputBase-input': {
            fontSize: 20
        }
    }
}

const RegistrationComponent = (props) => {
    // Custom hooks for validation of input fields
    const email = useInput("", {isEmpty: true, minLength: 3, maxLength: 50, isEmail: true});
    const phone = useInput("", {isEmpty: true, minLength: 7, maxLength: 13, isPhone: true});
    const name = useInput("", {isEmpty: true, minLength: 3, maxLength: 50});
    const surname = useInput("", {isEmpty: true, minLength: 3, maxLength: 50});
    const password = useInput("", {isEmpty: true, minLength: 7, maxLength: 20});

    const theme = useTheme();

    const [code, setCode] = useState(""); // Code for verification

    // Elements of modal window to dynamically update information
    const [modalModalMessage, setModalModalMessage] = useState(<h2>All Good</h2>);
    const [codeModalMessage, setCodeModalModalMessage] = useState(null);

    const messageModal = useModal();
    const codeModal = useModal();

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const onAuthLinkClicked = (e) => useCallback(() => {
        e.preventDefault();
        props.setSearchParams({authType: 'login'});
    }, [props])

    const onSubmitClicked =() => {
        codeModal.toggle();
    }

    const onCodeConfirmed = useCallback((inputCode) => {
        if (inputCode === '1234') {
            dispatch(addUserAction({
                email: email.value,
                phone: phone.value,
                name: name.value,
                surname: surname.value,
                password: password.value
            }));
            codeModal.toggle();
            setCodeModalModalMessage(null);
            messageModal.toggle();
            setTimeout(() => {
                navigate("/");
            }, 1500)
        } else {
            setCodeModalModalMessage(<p>Wrong code, try again</p>)
        }
    } , [dispatch, navigate, codeModal, messageModal, setCodeModalModalMessage, setModalModalMessage])

    return (
        <>
            <GlassyBox className={`${classes.GlassyBox} ${classes[theme.palette.mode]}`}>
                <h1 className={classes.headerTitle}>Registration Page</h1>
                <p>Already have an account? <a href="#" onClick={onAuthLinkClicked}>log in</a></p>
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
                                   type="phone"
                                   label="Phone"
                                   variant="standard"
                                   value={phone.value}
                                   onChange={(e) => phone.onChange(e)}
                                   onBlur={(e) => phone.onBlur(e)}
                                   error={phone.isDirty && phone.valid.filter(Boolean).length !== 0}
                                   helperText={phone.isDirty && phone.valid.filter(Boolean).length !== 0 ? phone.valid.filter(Boolean)[0] : ""}
                        />
                    </div>
                    <div className={classes.inputWrapper}>
                        <TextField sx={styles.TextField}
                                   label="Name"
                                   variant="standard"
                                   value={name.value}
                                   onChange={(e) => name.onChange(e)}
                                   onBlur={(e) => name.onBlur(e)}
                                   error={name.isDirty && name.valid.filter(Boolean).length !== 0}
                                   helperText={name.isDirty && name.valid.filter(Boolean).length !== 0 ? name.valid.filter(Boolean)[0] : ""}
                        />
                    </div>
                    <div className={classes.inputWrapper}>
                        <TextField sx={styles.TextField}
                                   label="Surname"
                                   variant="standard"
                                   value={surname.value}
                                   onChange={(e) => surname.onChange(e)}
                                   onBlur={(e) => surname.onBlur(e)}
                                   error={surname.isDirty && surname.valid.filter(Boolean).length !== 0}
                                   helperText={surname.isDirty && surname.valid.filter(Boolean).length !== 0 ? surname.valid.filter(Boolean)[0] : ""}
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
                            name.valid.filter(Boolean).length ||
                            surname.valid.filter(Boolean).length ||
                            email.valid.filter(Boolean).length ||
                            password.valid.filter(Boolean).length
                        }
                >Submit</Button>
            </GlassyBox>
            <Modal
                open={messageModal.isShowing}
                onClose={messageModal.toggle}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div>
                    <GlassyBox className={[classes.GlassyBoxModal, classes[theme.palette.mode]].join(' ')}>
                        <h1>theWeather</h1>
                        {modalModalMessage}
                    </GlassyBox>
                </div>
            </Modal>

            <Modal
                open={codeModal.isShowing}
                onClose={codeModal.toggle}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div>
                    <GlassyBox className={[classes.GlassyBoxModal, classes[theme.palette.mode]].join(' ')}>
                        <h1>theWeather</h1>
                        <h2>Please enter your code 1234</h2>
                        <div className={classes.formWrapper}>
                            <div className={classes.inputWrapper}>
                                <TextField sx={styles.TextField}
                                           label="Code"
                                           variant="standard"
                                           value={code}
                                           onChange={(e) => setCode(e.target.value)}
                                />
                            </div>
                        </div>
                        <Button onClick={() => onCodeConfirmed(code)}>Submit</Button>
                        {codeModalMessage}
                    </GlassyBox>
                </div>
            </Modal>
        </>
    );
};

export default RegistrationComponent;
