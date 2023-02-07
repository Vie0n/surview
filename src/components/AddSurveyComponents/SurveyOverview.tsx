// @ts-nocheck
import { useContext, useEffect, useState } from "react";
import { AddSurveyContext } from "../../services/AddSurveyContext";
import Button from "../Button";

import { db } from "../../firebase";
import {collection, addDoc} from "firebase/firestore";

import { useNavigate } from "react-router-dom"

export default function SurveyOverview(){

    const [isVisible, setIsVisible] = useState<Array<boolean>>([]);

    const surveyCollectionRef = collection(db, "survey-list");

    const navigate = useNavigate()

    useEffect(()=>{
        let newIsVisible:Array<boolean> = [];
        stateNewSurvey.questions.forEach(() => {
            newIsVisible.push(false)
        });
        setIsVisible(newIsVisible);

    },[])

    const {surveyName, surveyDesc, stateNewSurvey, setStateNewSurvey, questionIndex, setQuestionIndex, setPageState, setActiveQuestion, setActiveQuestionIndex} = useContext(AddSurveyContext);

    async function addToDatabase(payload:object){
        await addDoc(surveyCollectionRef, payload);
    }


    function renderAnswers(questionIndex:number){
        if(isVisible[questionIndex]){
            if(stateNewSurvey.questions[questionIndex].answers.length > 0){
                return(
                    stateNewSurvey.questions[questionIndex].answers.map((answer:string, answerIndex:number)=>{
                        return(
                            <tr key={answerIndex}>
                                <td>{`#${answerIndex+1}: ${answer}`}</td>
                            </tr>
                        )
                    })
                )
            }
            else return(
                <tr><td>Brak</td></tr>
            )
        }
    }


    function renderQuestions(){
        if (stateNewSurvey.questions === undefined) {
            return(<div className="max-w-[600px] m-auto">
                <h1>Brak pytań</h1>
            </div>)
        }
        if (stateNewSurvey.questions.length <= 0){
            return(<div className="max-w-[600px] m-auto">
                <h1>Brak pytań</h1>
            </div>)
        } else{
            return(
                stateNewSurvey.questions.map((question:Array<{id:number, question:string, type:string, answers:Array<[]>}>, questionID:number)=>{
                    return(
                        <table  className="mb-6 max-w-[600px] m-auto" key={questionID}>
                            <thead> 
                                <tr>
                                    <th className="pr-4">{`Pytanie #${questionID+1}: ${question.question}`}</th>
                                    <th className="pr-4">
                                        <Button text={"Odpowiedzi"} color={"primary"} onClick={() =>{
                                            let newIsVisible = isVisible;
                                            newIsVisible[questionID] = !newIsVisible[questionID]
                                            setIsVisible([...newIsVisible]);

                                        }}/>
                                    </th>
                                    <th className="pr-4">
                                        <Button text={"Edytuj"} color={"info"}onClick={() =>{
                                            setActiveQuestionIndex(questionID);
                                            setActiveQuestion(question);
                                            setPageState('edit')
                                        }}/>
                                    </th>
                                    <th>
                                        <Button text={"Usuń"} color={"danger"}onClick={() =>{
                                            let newSurvey = stateNewSurvey;
                                            newSurvey.questions.splice(questionID, 1);
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
            <div className="grid grid-cols-3 gap-4 place-items-start">
            <Button text={"Wstecz"} color={"primary"} onClick={()=>{
                setPageState("addName");
            }}/>
            </div>
            <div className="max-w-[600px] m-auto">
                <p className='text-xl font-bold'>{surveyName}</p>
            </div>
            <div className="max-w-[600px] m-auto">
                <p className='text-l font-bold'>{surveyDesc}</p>
            </div>
            <div>
                {renderQuestions()}
            </div>
            <div className="flex max-w-[600px] m-auto justify-evenly">
                <Button text={"Dodaj Pytanie"} color={"primary"} onClick={() =>{
                    setPageState("addQuestion");
                }}/>
                { questionIndex>0 ? 
                    <Button text={"Publikuj Ankiete"} color={"primary"} onClick={() =>{
                        let newStateNewSurvey = stateNewSurvey;
                        newStateNewSurvey.name = surveyName;
                        newStateNewSurvey.description = surveyDesc;
                        addToDatabase(newStateNewSurvey);
                        alert("Dodano Ankiete.")
                        navigate("/mysurvey")
                    }}/> :
                    <></>
                }
            </div>
        </div>
    )
}