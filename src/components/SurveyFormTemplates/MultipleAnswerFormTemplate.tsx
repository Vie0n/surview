import { useContext, useEffect, useState } from "react";
import SurveyButtonsManager from "../../services/SurveyButtonManager";
import { SurveyContext } from "../../services/SurveyContext";

export default function MultipleAnswerTemplate()
    {
        const [answer, setAnswer] = useState <Array<boolean>>([]);
        const [isValid, setIsValid] = useState <boolean>(false);

        const {questions, currentQuestionID} = useContext(SurveyContext);

        useEffect(()=>{
            setAnswerArray();
        },[])


        function setAnswerArray(){
            let tempArray:boolean[] = [];
            for(let i=0; i<questions[currentQuestionID].answers.length; i++){
                tempArray[i] = false;
            }
            setAnswer(tempArray);
        }


        function checkValidity(availableAnswers: []){
            let validCheck = false
            for(let i=0; i<availableAnswers.length; i++){
                if((document.getElementById(i.toString()) as HTMLInputElement).checked) validCheck = true;
            }
            setIsValid(validCheck);
        }
        
        function fillFormWithAnswersMultiple(availableAnswers: []){
            return(
                availableAnswers.map((item, index)=>{
                    return(
                        <li key={index}>
                            <label>{availableAnswers[index]}</label>
                            <input type="checkbox" name="MultipleAnswer" id={index.toString()}
                            onChange={(ev)=>{
                                    checkValidity(availableAnswers);
                                    let newAnswer = answer;
                                    newAnswer[index] = ev.target.checked;
                                    setAnswer(newAnswer);
                                }}/><br/>
                        </li>
                    )
                })
            )
        }




        return(
            <form>
                <h1>{questions[currentQuestionID].question}</h1><br/>
                <div>
                    {fillFormWithAnswersMultiple(questions[currentQuestionID].answers)}
                </div>
                <SurveyButtonsManager {...{answer, isValid}}/>
            </form>
        )
    }