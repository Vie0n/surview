import { useContext, useEffect, useState } from "react";
import { MySurveyContext } from "../../services/MySurveyContex";
import Button from "../Button";

export default function MySingleSurvey(){
    
    const [surveyInfo, setSurveyInfo] = useState<Array<{}>>([]);
    //const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    const {activeSurvey, setPage, setActiveQuestionIndex, setActiveQuestion} = useContext(MySurveyContext);

    useEffect(() => {
        fetchSurveyInfo()
    },[])


    function fetchSurveyInfo(){
        console.log(activeSurvey.id);
        //TODO Add actual fetching from Firebase based on survey ID
        const mockData = [{
            id: 0,
            question: "Single Question Test",
            type: "Single",
            answers: ["a","b","c","d"]
        },{
            id: 1,
            question: "Multiple Question Test",
            type: "Multiple",
            answers: ["a","b","c","d","e"]
        },{
            id: 2,
            question: "Slider Question Test",
            type: "Slider"
        },{
            id: 3,
            question: "Open Question Test",
            type: "Open"
        }];
        setSurveyInfo(mockData);
        console.log(mockData);

    }




    function renderQuestions(){
        if (surveyInfo.length <= 0){
            //console.log("empty");
            return(<div>
                <h1>Brak pytań</h1>
            </div>)
        } else{
            //console.log("not empty");
            return(
                surveyInfo.map((question:Array<{id:number, question:string, type:string, answers:Array<[]>}>, questionIndex:number)=>{
                    //console.log(question.id);
                    return(
                        <li key={questionIndex}>
                            <h2>{`Pytanie #${questionIndex+1}: ${question.question}`}</h2>
                            <Button text={"Szczegóły"} color={"primary"} onClick={()=>{
                                setActiveQuestionIndex(questionIndex);
                                setActiveQuestion(surveyInfo[questionIndex]);
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