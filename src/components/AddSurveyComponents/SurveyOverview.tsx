import { useContext, useState } from "react";
import { AddSurveyContext } from "../../services/AddSurveyContext";
import Button from "../Button";

export default function SurveyOverview(){


    const {surveyName, stateNewSurvey, setStateNewSurvey, questionIndex, setQuestionIndex, setPageState, setActiveQuestion, setActiveQuestionIndex} = useContext(AddSurveyContext);

    function renderAnswers(questionIndex:number){
        console.log(stateNewSurvey[questionIndex].answers);
        return(
            stateNewSurvey[questionIndex].answers.map((answer:string, answerIndex:number)=>{
                console.log(answer);
                return(
                    <tr key={answerIndex}>
                        <td>{answer}</td>
                    </tr>
                )
            })
        )
    }


    function renderQuestions(){
        //console.log(stateNewSurvey);
        if (stateNewSurvey === undefined) {
            return(<div>
                <h1>Brak pytań</h1>
            </div>)
        }
        if (stateNewSurvey.length <= 0){
            //console.log("empty");
            return(<div>
                <h1>Brak pytań</h1>
            </div>)
        } else{
            //console.log("not empty");
            return(
                stateNewSurvey.map((question:Array<{id:number, question:string, type:string, answers:Array<[]>}>, questionID:number)=>{
                    //console.log(question.id);
                    return(
                        <table key={questionID}>
                            <thead>
                                <tr>
                                    <th>{`Pytanie #${questionID+1}: ${question.question}`}</th>
                                    <th>
                                        <Button text={"Szczegóły"} color={"primary"} onClick={() =>{
                                            setActiveQuestionIndex(questionID);
                                            setActiveQuestion(question);
                                        }}/>
                                    </th>
                                    <th>
                                        <Button text={"Edytuj"} color={"info"}onClick={() =>{
                                            setActiveQuestionIndex(questionID);
                                            setActiveQuestion(question);
                                            setPageState('edit')
                                        }}/>
                                    </th>
                                    <th>
                                        <Button text={"Usuń"} color={"danger"}onClick={() =>{
                                            let newSurvey = stateNewSurvey;
                                            newSurvey.splice(questionID, 1);
                                            console.log(questionID);
                                            console.log(newSurvey);
                                            setQuestionIndex(questionIndex-1);
                                            setStateNewSurvey(...[newSurvey]);
                                        }}/>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderAnswers(questionID)}
                            </tbody>
                        </table>
                    )
                })
            )
        }
        
    }
    
    
    return(
        <div>
            <div>
                <p className='text-xl'>{surveyName}</p>
            </div>
            <div>
                {renderQuestions()}
            </div>
            <Button text={"Dodaj Pytanie"} color={"primary"} onClick={() =>{
                setPageState("addQuestion");
            }}/>
            { questionIndex>0 ? 
                <Button text={"Publikuj Ankiete"} color={"primary"}/> :
                <></>
            }
        </div>
    )
}