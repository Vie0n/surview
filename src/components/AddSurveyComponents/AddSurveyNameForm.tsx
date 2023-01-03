import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AddSurveyContext } from "../../services/AddSurveyContext";
import Button from "../Button";
import FormInputValidate from "../FormInputValidate";

export default function AddSurveyNameForm()
    {
        const {surveyName, setSurveyName, setPageState} = useContext(AddSurveyContext);

        return(
            <form>
                    <FormInputValidate fieldName={"Nazwa Ankiety"} setState={(ev: ChangeEvent<HTMLInputElement>) => {
                    setSurveyName(ev.target.value);
                } } defaultValue={""}/>
                <Button onClick={(ev) => {
                    ev.preventDefault();
                    console.log("Click");
                    if (surveyName != '')
                        setPageState("overview");
                } } text={"Akceptuj"} color={"primary"}                />
            </form>
        )
    }