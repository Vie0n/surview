import { useEffect, useState, useContext, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import ReciptInput from "../components/ReciptInput";
import MultipleAnswerTemplate from "../components/SurveyFormTemplates/MultipleAnswerFormTemplate";
import OpenTemplate from "../components/SurveyFormTemplates/OpenTemplate";
import SingleAnswerTemplate from "../components/SurveyFormTemplates/SingleAnswerFormTemplate";
import SliderTemplate from "../components/SurveyFormTemplates/SliderTemplate";


import { SurveyContext } from "../services/SurveyContext";

export default function SingleSurveyRoute() {
    const [recipt, setRecipt] = useState('');
    const [validRecipt, setValidRecipt] = useState(false);
    const [questions, setQuestions] = useState<Array<{}>>([])
    const [currentQuestionID, setCurrentQuestionID] = useState(0)
    const [stateAnswers, setStateAnswers] = useState<Array<{}>>([])

    let { id } = useParams();

    const RCT_REGEX = /^[a-z0-9]+$/i;
    const RCT_REGEX_FULL = /^[a-z0-9]{8}$/i;

    useEffect(function(){
        dataCall();
      },[])
    //console.log(questions);

    function dataCall(){
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
        setQuestions(mockData);
        //console.log (mockData);
    }
 
    function surveyManager(){
        if (!validRecipt){
            return(
                <div>
                    <ReciptInput fieldName={"Numer Rachunku"} setState={function (ev: ChangeEvent<HTMLInputElement>): void {
                        const newValue = ev.target.value
                        console.log(newValue)
                        if(!RCT_REGEX.test(newValue)){
                            console.log(RCT_REGEX.test(newValue))
                            ev.target.value = newValue.slice(0, newValue.length>0 ? newValue.length-1 : 0);
                        } else setRecipt(newValue);
                    }} defaultValue={""}/>
                    <Button text={"Dalej"} color={"primary"} onClick={()=>{
                        setValidRecipt(true);
                    }} disabled={!RCT_REGEX_FULL.test(recipt)}/>
                </div>
            )
        }else{
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
    }
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