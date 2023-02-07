// @ts-nocheck
import { useContext, useState } from "react";
import SurveyButtonsManager from "../../services/SurveyButtonManager";
import { SurveyContext } from "../../services/SurveyContext";

export default function SingleAnswerTemplate()
    {
        const [answer, setAnswer] = useState <number>();
        const [isValid, setIsValid] = useState <boolean>(false);

        const {questions, currentQuestionID} = useContext(SurveyContext);

        function checkValidity(availableAnswers: []){
            for(let i=0; i<availableAnswers.length; i++){
                if((document.getElementById(i.toString()) as HTMLInputElement).checked) setIsValid(true);
            }
        }


        function fillFormWithAnswersSingle(availableAnswers: []){
            return(
                availableAnswers.map((item, index)=>{
                    return(
                        <tr key={index}>
                            <td>{availableAnswers[index]}</td>
                            <td>
                                <input type="radio" name="SingleAnswer" id={index.toString()}
                                    onChange={(ev)=>{
                                        checkValidity(availableAnswers);
                                        setAnswer(index);
                                    }}
                                />
                            </td>
                        </tr>
                    )
                })
            )
        }








        return(
            <form className="max-w-[600px] m-auto">
                <table>
                    <thead>
                        <tr><th>{questions[currentQuestionID].question}</th></tr>
                    </thead>
                    <tbody>
                        {fillFormWithAnswersSingle(questions[currentQuestionID].answers)}
                    </tbody>
                </table>
                <SurveyButtonsManager {...{answer, isValid}}/>
            </form>
        )
    }