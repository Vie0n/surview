import { useContext, useEffect, useState } from "react";
import { AddSurveyContext } from "../../services/AddSurveyContext";
import Button from "../Button";

export default function SurveyOverview(){

    const [isVisible, setIsVisible] = useState<Array<boolean>>([]);

    useEffect(()=>{
        let newIsVisible:Array<boolean> = [];
        stateNewSurvey.questions.forEach(() => {
            newIsVisible.push(false)
        });
        setIsVisible(newIsVisible);

    },[])

    const {surveyName, stateNewSurvey, setStateNewSurvey, questionIndex, setQuestionIndex, setPageState, setActiveQuestion, setActiveQuestionIndex} = useContext(AddSurveyContext);

    function renderAnswers(questionIndex:number){
        if(isVisible[questionIndex]){
            if(stateNewSurvey.questions[questionIndex].answers.length > 0){
                return(
                    stateNewSurvey.questions[questionIndex].answers.map((answer:string, answerIndex:number)=>{
                        return(
                            <tr key={answerIndex}>
                                <td>{`Odpowiedź #${answerIndex+1}: ${answer}`}</td>
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
            return(<div>
                <h1>Brak pytań</h1>
            </div>)
        }
        if (stateNewSurvey.questions.length <= 0){
            return(<div>
                <h1>Brak pytań</h1>
            </div>)
        } else{
            return(
                stateNewSurvey.questions.map((question:Array<{id:number, question:string, type:string, answers:Array<[]>}>, questionID:number)=>{
                    return(
                        <table key={questionID}>
                            <thead>
                                <tr>
                                    <th>{`Pytanie #${questionID+1}: ${question.question}`}</th>
                                    <th>
                                        <Button text={"Odpowiedzi"} color={"primary"} onClick={() =>{
                                            let newIsVisible = isVisible;
                                            newIsVisible[questionID] = !newIsVisible[questionID]
                                            setIsVisible([...newIsVisible]);

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
                                            console.log(newSurvey);
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
                <Button text={"Publikuj Ankiete"} color={"primary"} onClick={() =>{
                    let newStateNewSurvey = stateNewSurvey;
                    newStateNewSurvey.name = surveyName;
                }}/> :
                <></>
            }
        </div>
    )
}