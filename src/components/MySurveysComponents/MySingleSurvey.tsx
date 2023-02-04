import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import { MySurveyContext } from "../../services/MySurveyContex";
import Button from "../Button";

export default function MySingleSurvey(){

    const {activeSurvey, setPage} = useContext(MySurveyContext);

    const [answerData, setAnswerData] = useState({})

    const activeQuestionAnswersQuery = query(collection(db, "survey-answers"), where("surveyID", "==", activeSurvey.id));


    useEffect(()=>{
        async function getSurveyList() {
            const answerData = await getDocs(activeQuestionAnswersQuery);
            setAnswerData(answerData.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }
        getSurveyList();
    },[]
    )

    function calcAnswersSingle(answerIndex:number, questionIndex:number){
        let totalSingleAnswers = 0;
        for(let i = 0; i < answerData.length; i++){
            if(answerIndex === answerData[i].answers[questionIndex].answer) totalSingleAnswers += 1;
        }
        let result = ((totalSingleAnswers/answerData.length) * 100);
        return (`${Math.round( result * 10 + Number.EPSILON ) / 10}%`);
    }

    function calcAnswersMultiple(answerIndex:number, questionIndex:number){
        let totalMultipleAnswers = 0;
        for(let i = 0; i < answerData.length; i++){
            if (answerData[i].answers[questionIndex].answer[answerIndex]) totalMultipleAnswers += 1;
        }
        let result = ((totalMultipleAnswers/answerData.length) * 100);
        return (`${Math.round( result * 10 + Number.EPSILON ) / 10}%`);
    }

    function calcAnswersSlider(questionIndex:number){
        let totalSliderAnswers = 0;
        for(let i = 0; i < answerData.length; i++){
            totalSliderAnswers += parseInt(answerData[i].answers[questionIndex].answer);
        }
        let result = ((totalSliderAnswers/(answerData.length*10))*100);
        if (totalSliderAnswers > 0){
            return(
                    <p>{`Wynik: ${Math.round( result * 10 + Number.EPSILON ) / 10}%`}</p>
        )
        }
        else return(<h1>{"Brak Odpowiedzi"}</h1>)
    }


    function renderAnswers(question, questionIndex){
                switch(question.type){
                    case 'Single': 
                    if(answerData.length > 0){ return(
                        question.answers.map((answer:string, answerIndex:number)=>{
                            return(
                                    <p key={answerIndex}>{`${answer}: ${calcAnswersSingle(answerIndex, questionIndex)}`}</p>
                            )
                        })
                    )}
                    else return <p>{"Brak Odpowiedzi"}</p>
                    case 'Multiple':
                        if(answerData.length > 0){
                            return(
                                question.answers.map((answer:string, answerIndex:number)=>{
                            return(
                                    <p key={answerIndex}>{`${question.answers[answerIndex]}: ${calcAnswersMultiple(answerIndex, questionIndex)}`}</p>
                            )
                        })
                    )}
                    else return <p>{"Brak Odpowiedzi"}</p>
                    case 'Slider':
                        return (calcAnswersSlider(questionIndex));
                    case 'Open':
                        if(answerData.length > 0){ return(
                            answerData.map((answer:string, answerIndex:number)=>{
                                return(
                                        <p key={answerIndex}>{`${answerIndex+1}: ${answer.answers[questionIndex].answer}`}</p>
                                )
                            })
                        )}
                        else return <p>{"Brak Odpowiedzi"}</p>
                    default: return( <div><h1>Brak</h1></div> )
                }
    }


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
                            {renderAnswers(activeSurvey.questions[questionIndex], questionIndex)}
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