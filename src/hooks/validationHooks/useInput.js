import {useCallback, useState} from "react";
import {useValidation} from "./useValidation";

export const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setDirty] = useState(false);
    const valid = useValidation(value, validations);
    // console.log(valid);

    const onChange = (e) => {
        setValue(e.target.value);
    }
    const onBlur = () => {
        setDirty(true);
    }
    return {
        value,
        onChange,
        onBlur,
        isDirty,
        valid
    }
}
