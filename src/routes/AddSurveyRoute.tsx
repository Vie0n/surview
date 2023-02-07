import { useEffect, useState } from "react";
import AddQuestionForm from "../components/AddSurveyComponents/AddQuestionForm";
import AddSurveyNameForm from "../components/AddSurveyComponents/AddSurveyNameForm";
import EditQuestionForm from "../components/AddSurveyComponents/EditQuestionForm";
import SurveyOverview from "../components/AddSurveyComponents/SurveyOverview";
import { useUserAuth } from "../context/AuthContext";
import { AddSurveyContext } from "../services/AddSurveyContext";

import { db } from "../firebase";
import {collection, getDocs} from "firebase/firestore";

export default function AddSurveyRoute() {
    const [surveyName, setSurveyName] = useState <string>('')
    const [surveyDesc, setSurveyDesc] = useState <string>('')
    const [questionIndex, setQuestionIndex] = useState <number>(0);
    const [pageState, setPageState] = useState <string>("addName");
    const [stateNewSurvey, setStateNewSurvey] = useState({})
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [activeQuestion, setActiveQuestion] = useState({});

    const { user } = useUserAuth()
    
    useEffect(()=>{
        let newSurvey = {
            "uid":user !== null ? user.uid : "?",
            "name":"",
            "description":"",
            "questions":[]
        };
        setStateNewSurvey(newSurvey);
    },[])


    function newSurveyManager(){
        switch(pageState){
            case "addName":
                return(<AddSurveyNameForm/>)
            case "addQuestion":
                return(<AddQuestionForm/>)
            case "overview":
                return(<SurveyOverview/>)
            case "edit":
                return(<EditQuestionForm/>)
            default:
                return(<h1>Error</h1>)
        }
    }
    
    
    return (
        <>
            <AddSurveyContext.Provider value={{
                surveyName,
                setSurveyName,
                surveyDesc,
                setSurveyDesc,
                setPageState,
                stateNewSurvey,
                setStateNewSurvey,
                questionIndex,
                setQuestionIndex,
                activeQuestionIndex,
                setActiveQuestionIndex,
                activeQuestion,
                setActiveQuestion}}>
                {newSurveyManager()}
            </AddSurveyContext.Provider>
        </>
    )
  }
  