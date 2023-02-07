// @ts-nocheck
import { ChangeEvent, useContext, useState } from "react";
import SurveyButtonsManager from "../../services/SurveyButtonManager";
import { SurveyContext } from "../../services/SurveyContext";
import FormInputValidate from "../FormInputValidate";

export default function OpenTemplate()
    {
        const [answer, setAnswer] = useState <string>('');
        const [isValid, setValid] = useState <boolean>(false);
        const {questions, currentQuestionID} = useContext(SurveyContext);
        return(
            <form className="max-w-[600px] m-auto">
                <FormInputValidate fieldName={questions[currentQuestionID].question} setState={function (ev: ChangeEvent<HTMLInputElement>): void {
                    setAnswer(ev.target.value);
                    setValid(ev.target.value.length > 0)
                } } defaultValue={""} id="open"/>
                <div>
                    <SurveyButtonsManager {...{answer, isValid}}/>
                </div>
            </form>
        )
    }