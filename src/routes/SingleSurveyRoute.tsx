import { useEffect, useState, useContext, ChangeEvent } from "react";
import { useParams } from "react-router-dom";

import { db } from "../firebase";
import {collection, getDocs} from "firebase/firestore";

import { useNavigate } from "react-router-dom"

import Button from "../components/Button";
import ReciptInput from "../components/ReciptInput";
import MultipleAnswerTemplate from "../components/SurveyFormTemplates/MultipleAnswerFormTemplate";
import OpenTemplate from "../components/SurveyFormTemplates/OpenTemplate";
import SingleAnswerTemplate from "../components/SurveyFormTemplates/SingleAnswerFormTemplate";
import SliderTemplate from "../components/SurveyFormTemplates/SliderTemplate";


import { SurveyContext } from "../services/SurveyContext";

export default function SingleSurveyRoute() {
    const [surveyID, setSurveyID] = useState('');
    const [recipt, setRecipt] = useState('');
    const [validRecipt, setValidRecipt] = useState(false);
    const [questions, setQuestions] = useState<Array<{}>>([])
    const [surveyDesc, setSurveyDesc] = useState<string>('');
    const [currentQuestionID, setCurrentQuestionID] = useState(0)
    const [stateAnswers, setStateAnswers] = useState<Array<{}>>([])

    const surveyCollectionRef = collection(db, "survey-list");
    let { id } = useParams();

    const navigate = useNavigate()

    const RCT_REGEX = /^[a-z0-9]+$/i;
    const RCT_REGEX_FULL = /^[a-z0-9]{8}$/i;

    useEffect(function(){

        async function getSurveyList() {
            const surveyListData = await getDocs(surveyCollectionRef);
            const activeSurvey = surveyListData.docs.map((doc) => ({...doc.data(), id: doc.id})).filter((ob:object)=> {return ob.id === id});
            setQuestions(activeSurvey[0].questions)
            setSurveyDesc(activeSurvey[0].description)
        }
        getSurveyList();
        setSurveyID(id)

      },[])
 
    function surveyManager(){
        if (!validRecipt){
            return(
                <div>
                    <ReciptInput fieldName={"Numer Rachunku"} setState={function (ev: ChangeEvent<HTMLInputElement>): void {
                        const newValue = ev.target.value
                        if(!RCT_REGEX.test(newValue)){
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
        <SurveyContext.Provider value = {{questions, currentQuestionID, setCurrentQuestionID, stateAnswers, setStateAnswers, surveyID, recipt, navigate}}>
            <div>
                <p className='text-xl'>{surveyDesc}</p>
                <div>
                    {surveyManager()}
                </div>
            </div>
        </SurveyContext.Provider>
    )
  }