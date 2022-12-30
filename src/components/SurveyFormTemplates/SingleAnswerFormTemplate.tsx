import { useContext, useState } from "react";
import SurveyButtonsManager from "../../services/SurveyButtonManager";
import { SurveyContext } from "../../services/SurveyContext";

export default function SingleAnswerTemplate()
    {
        const [answer, setAnswer] = useState <number>();
        const [isValid, setIsValid] = useState <boolean>(false);

        const {questions, currentQuestionID} = useContext(SurveyContext);

        console.log(questions);

        function checkValidity(availableAnswers: []){
            for(let i=0; i<availableAnswers.length; i++){
                if((document.getElementById(i.toString()) as HTMLInputElement).checked) setIsValid(true);
            }
        }


        function fillFormWithAnswersSingle(availableAnswers: []){
            return(
                availableAnswers.map((item, index)=>{
                    return(
                        <li key={index}>
                            <label>{availableAnswers[index]}</label>
                            <input type="radio" name="SingleAnswer" id={index.toString()}
                                onChange={(ev)=>{
                                    checkValidity(availableAnswers);
                                    setAnswer(index);
                                }}
                            /><br/>
                        </li>
                    )
                })
            )
        }








        return(
            <form>
                <h1>{questions[currentQuestionID].question}</h1><br/>
                <div>
                    {fillFormWithAnswersSingle(questions[currentQuestionID].answers)}
                </div>
                <SurveyButtonsManager {...{answer, isValid}}/>
            </form>
        )
    }