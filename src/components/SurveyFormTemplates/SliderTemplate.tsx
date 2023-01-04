import { useContext, useState } from "react";
import SurveyButtonsManager from "../../services/SurveyButtonManager";
import { SurveyContext } from "../../services/SurveyContext";

export default function SliderTemplate()
    {
        const {questions, currentQuestionID} = useContext(SurveyContext);
        const [isValid, setValid] = useState<boolean>(true);
        const [answer, setAnswer] = useState<string>("1")
        return(
            <form>
                <h1>{questions[currentQuestionID].question}</h1><br/>
                <div>
                    <input type="range" name="rangeTemplate" id="slider" min="1" max="10" defaultValue="0" onChange={()=>{
                        setAnswer((document.getElementById("slider") as HTMLInputElement).value)
                    }} />
                    <label>{answer}</label>
                </div>
                <div>
                    <SurveyButtonsManager {...{answer, isValid}}/>
                </div>
            </form>
        )
    }