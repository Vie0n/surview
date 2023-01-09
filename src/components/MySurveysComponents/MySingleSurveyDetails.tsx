import { useContext, useEffect, useState } from "react";
import { MySurveyContext } from "../../services/MySurveyContex";
import Button from "../Button";

import { db } from "../../firebase";
import {collection, getDocs, query, where} from "firebase/firestore";

export default function MySingleSurveyDetails(){

    const {setPage, activeQuestion, activeQuestionIndex, activeSurvey} = useContext(MySurveyContext);

    const [answerData, setAnswerData] = useState({})

    const activeQuestionAnswersQuery = query(collection(db, "survey-answers"), where("surveyID", "==", activeSurvey.id));


    useEffect(()=>{
        async function getSurveyList() {
            const answerData = await getDocs(activeQuestionAnswersQuery);
            console.log(answerData.docs.map((doc) => ({...doc.data(), id: doc.id})));
            setAnswerData(answerData.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }
        getSurveyList();
    },[]
    )

    function calcAnswersSingle(answerIndex:number){
        let totalSingleAnswers = 0;
        for(let i = 0; i < answerData.length; i++){
            if(answerIndex === answerData[i].answers[activeQuestionIndex].answer) totalSingleAnswers += 1;
        }
        return (`${(totalSingleAnswers/answerData.length) * 100}%`);
    }

    function calcAnswersMultiple(answerIndex:number){
        let totalMultipleAnswers = 0;
        for(let i = 0; i < answerData.length; i++){
            if (answerData[i].answers[activeQuestionIndex].answer[answerIndex]) totalMultipleAnswers += 1;
        }
        return (`${(totalMultipleAnswers/answerData.length) * 100}%`);
    }

    function calcAnswersSlider(){
        let totalSliderAnswers = 0;
        console.log(answerData.length);
        for(let i = 0; i < answerData.length; i++){
            console.log(answerData[i].answers[activeQuestionIndex].answer)
            totalSliderAnswers += parseInt(answerData[i].answers[activeQuestionIndex].answer);
        }
        return (`${(totalSliderAnswers/(answerData.length*10))*100}%`);
    }




    function renderAnswers(){
        console.log(answerData.length)
                switch(activeQuestion.type){
                    case 'Single': 
                    if(answerData.length > 0){ return(
                        activeQuestion.answers.map((answer:string, answerIndex:number)=>{
                            return(
                                <tr key={answerIndex}>
                                    <td>{`${answerIndex+1}: ${answer}`}</td>
                                    <td>{calcAnswersSingle(answerIndex)}</td>
                                </tr>
                            )
                        })
                    )}
                    case 'Multiple':
                        if(answerData.length > 0){
                            return(
                            activeQuestion.answers.map((answer:string, answerIndex:number)=>{
                            return(
                                <tr key={answerIndex}>
                                    <td>{`${answerIndex+1}: ${activeQuestion.answers[answerIndex]}`}</td>
                                    <td>{calcAnswersMultiple(answerIndex)}</td>
                                </tr>
                            )
                        })
                    )}
                    case 'Slider': console.log("hello");
                    return(
                                <tr>
                                    <td>{`Wynik: `}</td>
                                    <td>{calcAnswersSlider()}</td>
                                </tr>
                        )
                    case 'Open':
                        if(answerData.length > 0){ return(
                            answerData.map((answer:string, answerIndex:number)=>{
                                return(
                                    <tr key={answerIndex}>
                                        <td>{`${answerIndex+1}: ${answer.answers[activeQuestionIndex].answer}`}</td>
                                    </tr>
                                )
                            })
                        )}
                    default: return( <tr><td>Brak</td></tr> )
                }
    }

    function renderQuestions(){
        console.log(activeQuestion.type);
        if (activeQuestion === undefined || activeQuestion.length <= 0) {
            return(
            <div>
                <h1>Error</h1>
            </div>)
        }else{
            return(
                <table>
                    <thead>
                        <tr>
                            <th>{activeQuestion.question}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderAnswers()}
                    </tbody>
                </table>
            )
        }
    
    }






    return(
        <div>
            <Button text={"Wstecz"} color={"primary"} onClick={()=>{
                setPage("single")
            }}/>
            {renderQuestions()}
        </div>
    )
}