import React, { useState } from "react";
import FromInput from "./FormInput";
import { IReciptInput } from "../@types/reciptInput";


export default function ReciptInput(props: IReciptInput) {
    const {fieldName, setState, defaultValue} = props;
    const [value, setValue] = useState <string>(defaultValue);

    const RCT_REGEX = /^[a-z0-9]{8}$/i;

    return (
            <FromInput
            fieldName={fieldName}
            isvalid={RCT_REGEX.test(value)}
            errormsg={"Podaj poprawny numer paragonu."}
            onChange={(ev) => {
                if(ev.target.value.length > 8) {
                    ev.target.value = ev.target.value.slice(0, 8);
                }
                const newValue = ev.target.value;
                setValue(newValue);
                setState(ev);
            } } defaultValue={defaultValue}/>
    )
}