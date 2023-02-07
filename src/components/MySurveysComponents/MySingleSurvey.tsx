import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import { MySurveyContext } from "../../services/MySurveyContex";
import Button from "../Button";
import { Bar } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Colors
} from 'chart.js'
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Colors,
    Title,
    Tooltip,
    Legend
);

export default function MySingleSurvey(){

    const {activeSurvey, setPage} = useContext(MySurveyContext);

    const [answerData, setAnswerData] = useState<any>({})

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


    function renderAnswers(question: any, questionIndex: any){
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

    function getLabels(question: any, questionIdx: number) {
        switch (question.type) {
            case 'Single': return [...new Set(question.answers)]
            case 'Multiple': return [...new Set(question.answers)]
            case 'Slider': return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        }
    }

    function getData(question: any, questionIdx: any) {
        switch (question.type) {
            case 'Single': 
                if(answerData.length > 0){
                    const answerCount = new Array(answerData.length).fill(0)
                    question.answers.forEach((answer:string, answerIndex:number)=>{
                        for(let i = 0; i < answerData.length; i++){ 
                            answerCount[answerData[i].answers[questionIdx].answer]++
                        }
                    })
                    return answerCount
                }
                break

            case 'Multiple': 
                if(answerData.length > 0) {
                    const answerCount = new Array(answerData.length + 1).fill(0)
                    question.answers.forEach((answer:string, answerIndex:number) => {
                        for (let i = 0; i < answerData.length; i++) {
                            if(answerData[i].answers[questionIdx].answer[answerIndex]) {
                                answerCount[answerIndex]++
                            }
                        }
                    })
                    return answerCount
                }
                break
            
            case 'Slider': 
                const answerCount = new Array(10).fill(0)
                for (let i = 0; i < answerData.length; i++){
                    answerCount[parseInt((answerData[i].answers[questionIdx].answer - 1).toString(), 10)]++
                }
                return answerCount
                break
        }
    }

    function renderChart(question:Array<{id:number, question:string, type:string, answers:Array<[]>}>, questionIndex:number) {
        if(question.type === 'Open') return <></>
        
        return (
            <Bar
                datasetIdKey='id'
                data={{
                labels: getLabels(question, questionIndex),
                datasets: [
                    {
                        label: '',
                        data: getData(question, questionIndex),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.3)',
                            'rgba(255, 159, 64, 0.3)',
                            'rgba(255, 205, 86, 0.3)',
                            'rgba(75, 192, 192, 0.3)',
                            'rgba(54, 162, 235, 0.3)',
                            'rgba(153, 102, 255, 0.3)',
                            'rgba(201, 203, 207, 0.3)'
                        ]
                    }
                ]
                }}
                options={{
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
                }}
            />
        )
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
                        <li className="pt-6" key={questionIndex}>
                            <h2 className="text-2xl">{`Pytanie #${questionIndex+1}: ${question.question}`}</h2>
                            {renderAnswers(activeSurvey.questions[questionIndex], questionIndex)}
                            {renderChart(question, questionIndex)}
                        </li>
                    )
                })
            )
        }
        
    }
    
    
    return(
        <div>
            <Button text={"Wstecz"} color={"primary"} onClick={()=>{setPage("list")}} />
            <div>
                <ol className="max-w-[600px] m-auto">
                <div>
                    <p className='py-4 text-2xl'>Ankieta: <span className="font-bold">{activeSurvey.name}</span></p>
                    <p className='py-4 text-2xl'><span>{activeSurvey.description}</span></p>
                </div>
                    {renderQuestions()}
                </ol>
            </div>
        </div>
    )
}