import { useContext } from "react";
import SurveyButtonsManager from "../../services/SurveyButtonManager";
import { SurveyContext } from "../../services/SurveyContext";

export default function MultipleAnswerTemplate()
    {
        const {questions, currentQuestionID} = useContext(SurveyContext);

        console.log(questions);
        //let availableAnswers = props.questions[props.currentQuestionID].answers;
        //console.log(availableAnswers);

        function fillFormWithAnswersMultiple(availableAnswers: {}){
            let result = Object.keys(availableAnswers).map((key) =>{
                return ({[key]: availableAnswers[key as keyof typeof availableAnswers]
                })
            })
            return(
                result.map((item, index)=>{
                    console.log(item[index]);
                    return(
                        <>
                            <label>{item[index]}</label>
                            <input type="checkbox" name="MultipleAnswer" id={index.toString()}/><br/>
                        </>
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
                <SurveyButtonsManager/>
            </form>
        )
    }