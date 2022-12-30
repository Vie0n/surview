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

    let { id } = useParams();

    useEffect(function(){
        dataCall();
      },[])
    console.log(questions);

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
        console.log (mockData);
    }
 
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