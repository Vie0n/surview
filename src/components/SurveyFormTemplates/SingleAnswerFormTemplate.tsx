import { useContext } from "react";
import SurveyButtonsManager from "../../services/SurveyButtonManager";
import { SurveyContext } from "../../services/SurveyContext";

export default function SingleAnswerTemplate( props: {
        questions: {
            [x: number]: {
                question: string;
                type: string;
                answers: {
                    0: string;
                    1: string;
                    2: string;
                    3: string;
                    4?: undefined;
                }
            };
        };
        currentQuestionID: number;
    })
    {

        const {questions, currentQuestionID} = useContext(SurveyContext);

        console.log(props);
        console.log(questions);
        //let availableAnswers = props.questions[props.currentQuestionID].answers;
        //console.log(availableAnswers);

        function fillFormWithAnswersSingle(availableAnswers: {}){
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
                            <input type="radio" name="SingleAnswer" id={index.toString()}/><br/>
                        </>
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
                <SurveyButtonsManager/>
            </form>
        )
    }