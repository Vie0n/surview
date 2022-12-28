import { useContext, useState } from "react";
import SurveyButtonsManager from "../../services/SurveyButtonManager";
import { SurveyContext } from "../../services/SurveyContext";

export default function SliderTemplate()
    {
        const {questions, currentQuestionID} = useContext(SurveyContext);
        const [sliderValue, setSliderValue] = useState<string>("0")
        return(
            <form>
                <h1>{questions[currentQuestionID].question}</h1><br/>
                <div>
                    <input type="range" name="rangeTemplate" id="slider" min="1" max="10" defaultValue="0" onChange={()=>{
                        setSliderValue((document.getElementById("slider") as HTMLInputElement).value)
                    }} />
                    <label>{sliderValue}</label>
                </div>
                <div>
                    <SurveyButtonsManager/>
                </div>
            </form>
        )
    }