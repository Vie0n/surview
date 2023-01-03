import type { IFormInputProps } from "../@types/formInput";
import React, { useState } from "react";
import FromInput from "./FormInput";
import { IFormInputValidate } from "../@types/formInputValidate";


export default function FormInputValidate(props: IFormInputValidate) {
    const {fieldName, setState} = props;
    const [value, setValue] = useState <string>('');


    return (
            <FromInput
                fieldName={fieldName}
                isvalid={value.length > 0}
                errormsg={"Pole nie może być puste."}
                onChange={(ev)=>{
                    const newValue = ev.target.value
                    //let newAnswer = answer;
                    //newAnswer[i] = ev.target.value
                    setValue(newValue)
                    setState(ev)
                }}
            />
    )
}