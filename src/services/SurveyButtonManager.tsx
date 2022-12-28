import { useContext, useEffect, useState } from "react";
import { SurveyContext } from "./SurveyContext";

export default function SurveyButtonsManager(){
    const [lastQuestionID, setLastQuestionID] = useState<number>();
    const {questions, currentQuestionID, setCurrentQuestionID, stateAnswers, setStateAnswers} = useContext(SurveyContext);

    let tempString:string;
    
    useEffect(()=>{
        getLastQuestionID();
    },[])

    function getLastQuestionID(){
        if (questions !== "undefined"){
            console.log(questions);
            console.log(questions.length);
            let last:number = questions.length - 1;
            setLastQuestionID(last);
        }
    }

    function surveySubmitManager(){
        let result:{ [x: string]: never; }[];
        let availableAnswers:{ 0: string; 1: string; 2: string; 3: string; 4?: undefined; } | { 0: string; 1: string; 2: string; 3: string; 4: string; } | undefined
        tempString = "";
        switch(questions[currentQuestionID].type){
            case "Single":
                tempString = `{"id": ${currentQuestionID}`;
                availableAnswers = questions[currentQuestionID].answers;
                console.log(availableAnswers);
                result = Object.keys(availableAnswers).map((key) =>{
                    return ({[key]: availableAnswers[key as keyof typeof availableAnswers]
                    })
                })
                console.log(result);
                return(
                    result.map((item, index)=>{
                        console.log(`${index}: ${(document.getElementById(`${index}`) as HTMLInputElement).checked}`);
                        tempString += `, "${index}": ${(document.getElementById(`${index}`) as HTMLInputElement).checked}`
                    })
                )
                break;
            case "Multiple":
                tempString = `{"id": ${currentQuestionID}`;
                availableAnswers = questions[currentQuestionID].answers;
                console.log(availableAnswers);
                result = Object.keys(availableAnswers).map((key) =>{
                    return ({[key]: availableAnswers[key as keyof typeof availableAnswers]
                    })
                })
                console.log(result);
                return(
                    result.map((item, index)=>{
                        console.log(`${index}: ${(document.getElementById(`${index}`) as HTMLInputElement).checked}`);
                        tempString += `, "${index}": ${(document.getElementById(`${index}`) as HTMLInputElement).checked}`
                    })
                )
                break;
            case "Slider":
                tempString = `{"id": ${currentQuestionID}`;
                //console.log(`Slider: ${(document.getElementById("slider") as HTMLInputElement).value}`);
                tempString += `, "score": ${(document.getElementById("slider") as HTMLInputElement).value}`
                break;
            case "Open":
                tempString = `{"id": ${currentQuestionID}`;
                console.log(`Open: ${(document.getElementById("open") as HTMLInputElement).value}`);
                tempString += `, "answer": "${(document.getElementById("open") as HTMLInputElement).value}"`
                break;
            default:
                <div>
                    <p>Error</p>
                </div>
        }
    }



    //console.log(`Button Manager: ${currentQuestionID}`)
    if (lastQuestionID !== undefined){
        //console.log(lastQuestionID);
        //console.log(currentQuestionID)
        switch(currentQuestionID){
            case 0:
                return(
                    <div>
                        <button onClick={(ev)=>{
                            ev.preventDefault();
                            setCurrentQuestionID(currentQuestionID+1);
                            console.log(currentQuestionID);
                            surveySubmitManager();
                            let oldAnswers = stateAnswers;
                            tempString+="}";
                            console.log("State of tempString: "+tempString)
                            oldAnswers.push(JSON.parse(tempString));
                            console.log(oldAnswers);
                            setStateAnswers(oldAnswers);
                        }}
                        >
                             Next
                        </button>
                    </div>
                )
            case lastQuestionID:
                return(
                    <div>
                        <button onClick={(ev)=>{
                            ev.preventDefault();
                            let oldAnswers = stateAnswers;
                            oldAnswers.splice(currentQuestionID-1, 1);
                            setCurrentQuestionID(currentQuestionID-1);
                            console.log(currentQuestionID)
                            console.log(oldAnswers)
                            setStateAnswers(oldAnswers);
                        }}>Previous</button>
                        <button onClick={(ev)=>{
                            //TODO: Create a function for putting answers into the database
                            ev.preventDefault();
                            console.log(currentQuestionID);
                            surveySubmitManager();
                            let oldAnswers = stateAnswers;
                            tempString+="}";
                            console.log("State of tempString: "+tempString)
                            oldAnswers.push(JSON.parse(tempString));
                            console.log(oldAnswers);
                            setStateAnswers(oldAnswers);
                        }}
                            >Finish</button>
                    </div>
                )
            default:
                return(
                    <div>
                        <button onClick={(ev)=>{
                            ev.preventDefault();
                            let oldAnswers = stateAnswers;
                            oldAnswers.splice(currentQuestionID-1, 1);
                            setCurrentQuestionID(currentQuestionID-1);
                            console.log(currentQuestionID)
                            console.log(oldAnswers)
                            setStateAnswers(oldAnswers);
                        }}>
                                Previous
                            </button>
                        <button onClick={(ev)=>{
                            ev.preventDefault();
                            setCurrentQuestionID(currentQuestionID+1);
                            console.log(currentQuestionID);
                            surveySubmitManager();
                            let oldAnswers = stateAnswers;
                            tempString+="}";
                            console.log("State of tempString: "+tempString)
                            oldAnswers.push(JSON.parse(tempString));
                            console.log(oldAnswers);
                            setStateAnswers(oldAnswers);
                        }}
                            >
                                Next
                        </button>
                    </div>
                )
        }
    } else return <></>
}