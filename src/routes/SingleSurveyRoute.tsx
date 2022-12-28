import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import MultipleAnswerTemplate from "../components/SurveyFormTemplates/MultipleAnswerFormTemplate";
import OpenTemplate from "../components/SurveyFormTemplates/OpenTemplate";
import SingleAnswerTemplate from "../components/SurveyFormTemplates/SingleAnswerFormTemplate";
import SliderTemplate from "../components/SurveyFormTemplates/SliderTemplate";


import { SurveyContext } from "../services/SurveyContext";

export default function SingleSurveyRoute() {
    const [questions, setQuestions] = useState<Array<{}>>([])
    const [currentQuestionID, setCurrentQuestionID] = useState(0)
    const [stateAnswers, setStateAnswers] = useState<Array<{}>>([])
    const [answer, setAnswer] = useState<string>("0")

    let { id } = useParams();
    //let currentQuestionID: number = 0;
    const lastQuestionID: number = 3;
    let tempString:string;
    let answers = []

    useEffect(function(){
        dataCall();
      },[])
    console.log(questions);

    function dataCall(){
        const mockData = [{
            id: 0,
            question: "Single Question Test",
            type: "Single",
            answers: {
                0: "a",
                1: "b",
                2: "c",
                3: "d"
            }
        },{
            id: 1,
            question: "Multiple Question Test",
            type: "Multiple",
            answers: {
                0: "a",
                1: "b",
                2: "c",
                3: "d",
                4: "e"
            }
        },{
            id: 2,
            question: "Slider Question Test",
            type: "Slider"
        },{
            id: 3,
            question: "Open Question Test",
            type: "Open"
        }];
        setQuestions(mockData);
        console.log (mockData);
    }


/*
    function fillFormWithAnswersSingle(availableAnswers: {}){
        let result = Object.keys(availableAnswers).map((key) =>{
            return ({[key]: availableAnswers[key as keyof typeof availableAnswers]
            })
        })
        return(
            result.map((item, index)=>{
                console.log(item[index]);
                return(
                    <>
                        <label>{item[index]}</label>
                        <input type="radio" name="SingleAnswer" id={index.toString()}/><br/>
                    </>
                )
            })
        )
    }



    function singleAnswerTemplate(){
        let availableAnswers = mockData[currentQuestionID].answers;
        console.log(availableAnswers);
        return(
            <form>
                <h1>{mockData[currentQuestionID].question}</h1><br/>
                <div>
                    {fillFormWithAnswersSingle(availableAnswers)}
                </div>
                <div>
                    {surveyButtonsManager()}
                </div>
            </form>
        )
    }

    function fillFormWithAnswersMultiple(availableAnswers: {}){
        let result = Object.keys(availableAnswers).map((key) =>{
            return ({[key]: availableAnswers[key as keyof typeof availableAnswers]
            })
        })
        return(
            result.map((item, index)=>{
                console.log(item[index]);
                return(
                    <>
                        <label>{item[index]}</label>
                        <input type="checkbox" name="MultipleAnswer" id={index.toString()}/><br/>
                    </>
                )
            })
        )
    }



    function multipleAnswerTemplate(){
        let currentQuestion = questions[currentQuestionID];
        let availableAnswers = questions[currentQuestionID].answers;
        console.log(availableAnswers);
        return(
            <form>
                <h1>{questions[currentQuestionID].question}</h1><br/>
                <div>
                    {fillFormWithAnswersMultiple(availableAnswers)}
                </div>
                <div>
                    {surveyButtonsManager()}
                </div>
            </form>
        )
    }

    function sliderTemplate(){
        return(
            <form>
                <h1>{questions[currentQuestionID].question}</h1><br/>
                <div>
                    <input type="range" name="rangeTemplate" id="slider" min="1" max="10" defaultValue="0" onChange={()=>{
                        setAnswer((document.getElementById("slider") as HTMLInputElement).value)
                    }} />
                    <label>{answer}</label>
                </div>
                <div>
                    {surveyButtonsManager()}
                </div>
            </form>
        )
    }

    function openTemplate(){
        return(
            <form>
                <h1>{questions[currentQuestionID].question}</h1><br/>
                <div>
                    <input type="text" id="open"></input>
                </div>
                <div>
                    {surveyButtonsManager()}
                </div>
            </form>
        )
    }
    
  */  
    
    
    function surveyManager(){
        if (typeof (questions[currentQuestionID]) !== "undefined"){
            switch(questions[currentQuestionID].type){
                case "Single": return(<><SingleAnswerTemplate/></>)
                    break;
                case "Multiple": return(<><MultipleAnswerTemplate/></>)
                    break;
                case "Slider": return(<><SliderTemplate/></>)
                    break;
                case "Open": return(<><OpenTemplate/></>)
                    break;
                default:
                    <div>
                        <p></p>
                    </div>
            }
        }
    }
/*
    function surveySubmitManager(){
        console.log(questions[currentQuestionID].type);
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
                console.log(`Slider: ${(document.getElementById("slider") as HTMLInputElement).value}`);
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
    
    function surveyButtonsManager(){
        console.log(`Button Manager: ${currentQuestionID}`)
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
    }
    
    */
    
    
    
    return (
        <SurveyContext.Provider value = {{questions, currentQuestionID, setCurrentQuestionID, stateAnswers, setStateAnswers}}>
            <div>
                <p className='text-xl'>Survey ID: {id}</p>
                <div>
                    {surveyManager()}
                </div>
            </div>
        </SurveyContext.Provider>
    )
  }