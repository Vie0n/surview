import { useContext, useState } from "react";
import SurveyButtonsManager from "../../services/SurveyButtonManager";
import { SurveyContext } from "../../services/SurveyContext";
import FromInput from "../FormInput";

export default function OpenTemplate()
    {
        const [answer, setAnswer] = useState <string>('');
        const [isValid, setValid] = useState <boolean>(false);
        const {questions, currentQuestionID} = useContext(SurveyContext);
        return(
            <form>
                <FromInput fieldName={questions[currentQuestionID].question} isvalid={false} errormsg={undefined} type="text" id="open"
                    onChange={(ev)=>{
                        setAnswer(ev.target.value);
                        if (ev.target.value !== '') setValid(true);
                        else setValid(false);
                    }}
                />
                <div>
                    <SurveyButtonsManager {...{answer, isValid}}/>
                </div>
            </form>
        )
    }