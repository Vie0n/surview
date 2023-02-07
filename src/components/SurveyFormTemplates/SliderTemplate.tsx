import { useContext, useState } from "react";
import SurveyButtonsManager from "../../services/SurveyButtonManager";
import { SurveyContext } from "../../services/SurveyContext";

export default function SliderTemplate()
    {
        const {questions, currentQuestionID} = useContext(SurveyContext);
        const [isValid, setValid] = useState<boolean>(true);
        const [answer, setAnswer] = useState<string>("1")
        return(
            <form className="max-w-[600px] m-auto justify-center">
                <h1>{questions[currentQuestionID].question}</h1><br/>
                <div>
                    <input className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" type="range" name="rangeTemplate" id="slider" min="1" max="10" defaultValue="0" onChange={()=>{
                        setAnswer((document.getElementById("slider") as HTMLInputElement).value)
                    }} />
                    <div className="flex justify-center">
                        <label className="text-lg font-bold">{answer}</label>
                    </div>
                </div>
                <br/>
                <div>
                    <SurveyButtonsManager {...{answer, isValid}}/>
                </div>
            </form>
        )
    }