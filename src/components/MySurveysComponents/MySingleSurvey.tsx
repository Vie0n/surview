import { useContext, useEffect, useState } from "react";
import { MySurveyContext } from "../../services/MySurveyContex";
import Button from "../Button";

export default function MySingleSurvey(){

    const {activeSurvey, setPage, setActiveQuestionIndex, setActiveQuestion} = useContext(MySurveyContext);

    function renderQuestions(){
        if (activeSurvey.questions.length <= 0){
            return(<div>
                <h1>Brak pytań</h1>
            </div>)
        } else{
            return(
                activeSurvey.questions.map((question:Array<{id:number, question:string, type:string, answers:Array<[]>}>, questionIndex:number)=>{
                    return(
                        <li key={questionIndex}>
                            <h2>{`Pytanie #${questionIndex+1}: ${question.question}`}</h2>
                            <Button text={"Szczegóły"} color={"primary"} onClick={()=>{
                                setActiveQuestionIndex(questionIndex);
                                setActiveQuestion(activeSurvey.questions[questionIndex]);
                                setPage("details");
                            }}/>
                        </li>
                    )
                })
            )
        }
        
    }
    
    
    return(
        <div>
            <div>
                <p className='text-xl'>{activeSurvey.name}</p>
            </div>
            <Button text={"Wstecz"} color={"primary"} onClick={()=>{
                setPage("list")
            }}/>
            <div>
                <ol>
                    {renderQuestions()}
                </ol>
            </div>
        </div>
    )
}