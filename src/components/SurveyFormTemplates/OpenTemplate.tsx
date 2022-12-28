import { useContext } from "react";
import SurveyButtonsManager from "../../services/SurveyButtonManager";
import { SurveyContext } from "../../services/SurveyContext";

export default function OpenTemplate()
    {
        const {questions, currentQuestionID} = useContext(SurveyContext);
        return(
            <form>
                <h1>{questions[currentQuestionID].question}</h1><br/>
                <div>
                    <input type="text" id="open"></input>
                </div>
                <div>
                    <SurveyButtonsManager/>
                </div>
            </form>
        )
    }