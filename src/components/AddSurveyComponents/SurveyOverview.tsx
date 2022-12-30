import { useContext } from "react";
import { AddSurveyContext } from "../../services/AddSurveyContext";
import Button from "../Button";

export default function SurveyOverview(){
    
    const {surveyName, stateNewSurvey, questionIndex, setPageState} = useContext(AddSurveyContext);

    function renderAnswers(questionIndex:number){
        console.log(stateNewSurvey[questionIndex].answers);
        return(
            stateNewSurvey[questionIndex].answers.map((answer, answerIndex)=>{
                return(
                    <li>{answer}</li>
                )
            })
        )
    }


    function renderQuestions(){
        console.log(stateNewSurvey);
        if (stateNewSurvey.length <= 0){
            console.log("empty");
            return(<></>)
        } else{
            console.log("not empty");
            return(
                stateNewSurvey.map((question, questionIndex)=>{
                    console.log(question);
                    return(
                        <>
                            <h4>{question.question}</h4>
                            <ul>{renderAnswers(questionIndex)}</ul>
                        </>
                    )
                })
            )
        }
        
    }
    
    
    return(
        <div>
            <div>
                {renderQuestions()}
            </div>
            <Button text={"New Question"} color={"primary"} onClick={() =>{
                setPageState("addQuestion");
            }}/>
            { questionIndex>0 ? 
                <Button text={"Upload Survey"} color={"primary"}/> :
                <></>
            }
        </div>
    )
}