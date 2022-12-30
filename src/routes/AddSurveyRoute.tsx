import { useState } from "react";
import AddQuestionForm from "../components/AddSurveyComponents/AddQuestionForm";
import AddSurveyNameForm from "../components/AddSurveyComponents/AddSurveyNameForm";
import SurveyOverview from "../components/AddSurveyComponents/SurveyOverview";
import { AddSurveyContext } from "../services/AddSurveyContext";

export default function AddSurveyRoute() {
    const [surveyName, setSurveyName] = useState <string>('')
    const [questionIndex, setQuestionIndex] = useState <number>(0);
    const [pageState, setPageState] = useState <string>("addName");

    const [stateNewSurvey, setStateNewSurvey] = useState<Array<{}>>([])
    
    function newSurveyManager(){
        switch(pageState){
            case "addName":
                return(<AddSurveyNameForm/>)
            case "addQuestion":
                return(<AddQuestionForm/>)
            case "overview":
                return(<SurveyOverview/>)
            default:
                return(<h1>Error</h1>)
        }
    }
    
    
    return (
        <>
            <div>
                <p className='text-xl'>New Survey</p>
            </div>
            <AddSurveyContext.Provider value={{surveyName, setSurveyName, setPageState, stateNewSurvey, setStateNewSurvey, questionIndex, setQuestionIndex}}>
                {newSurveyManager()}
            </AddSurveyContext.Provider>
        </>
    )
  }
  