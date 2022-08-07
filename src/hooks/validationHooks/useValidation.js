import {useEffect, useState} from "react";

export const useValidation = (value, validations) => {
    const [isEmpty, setEmpty] = useState(true);
    const [minLengthError, setMinLengthError] = useState(false);
    const [maxLengthError, setMaxLengthError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    value.length < validations[validation] ? setMinLengthError(`Min length must be greater than ${validations[validation]}`) : setMinLengthError(false);
                    break;
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty("Value mustn't be empty");
                    break;
                case 'maxLength':
                    value.length > validations[validation] ? setMaxLengthError(`Max length must less than ${validations[validation]}`) : setMaxLengthError(false);
                    break;
                case 'isEmail':
                    const regExpEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                    regExpEmail.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(`Email doesn't match, ex. user@gmail.com`);
                    break;
                case 'isPhone':
                    const regExpPhone = /^(\+)?\d{7,12}$/i;
                    regExpPhone.test(String(value).toLowerCase()) ? setPhoneError(false) : setPhoneError(`Phone doesn't match, ex. +1234567`);
                    break;
            }
        }
    }, [value])

    return [
        isEmpty,
        minLengthError,
        maxLengthError,
        emailError,
        phoneError
    ]
}
