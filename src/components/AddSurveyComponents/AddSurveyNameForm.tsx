import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AddSurveyContext } from "../../services/AddSurveyContext";
import Button from "../Button";
import FormInputValidate from "../FormInputValidate";

export default function AddSurveyNameForm()
    {
        const {surveyName, setSurveyName, surveyDesc, setSurveyDesc, setPageState} = useContext(AddSurveyContext);

        return(
            <form className="max-w-[600px] m-auto">
                    <FormInputValidate fieldName={"Nazwa Ankiety*"} setState={(ev: ChangeEvent<HTMLInputElement>) => {
                    setSurveyName(ev.target.value);
                } } defaultValue={""}/>
                <FormInputValidate fieldName={"Opis Ankiety*"} setState={(ev: ChangeEvent<HTMLInputElement>) => {
                    setSurveyDesc(ev.target.value);
                } } defaultValue={""}/>
                <Button onClick={(ev) => {
                    ev.preventDefault();
                    if (surveyName != '' && surveyDesc != '')
                        setPageState("overview");
                    else alert("Proszę wypełnić oba pola.")
                } } text={"Akceptuj"} color={"primary"}                />
            </form>
        )
    }