import { useEffect, useState } from "react";

import MySingleSurvey from "../components/MySurveysComponents/MySingleSurvey";
import { MySurveyContext } from "../services/MySurveyContex";

import { db } from "../firebase";
import {collection, getDocs, query, where} from "firebase/firestore";
import { useUserAuth } from "../context/AuthContext";

export default function MySurveysRoute() {

    const[surveyList, setSurveyList] = useState<{}>([]);
    const[surveyID, setSurveyID] = useState('');
    const[activeSurvey, setActiveSurvey] = useState({});
    const[page, setPage] = useState('list');
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [activeQuestion, setActiveQuestion] = useState <{}>({});

    const { user } = useUserAuth()

    useEffect(()=>{
        const mySurveyCollectionQuery = query(collection(db, "survey-list"), where("uid", "==", user?.uid));
        async function getSurveyList() {
            const surveyListData = await getDocs(mySurveyCollectionQuery);
            setSurveyList(surveyListData.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }
        getSurveyList();
    },[]
    )



    function renderSurveyList(){
        return(
            <div className="grid place-content-center grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {fillSurveyList()}
            </div>
        )
    }

    function fillSurveyList(){
        //transform object into an array to allow for map()
        let result = Object.keys(surveyList).map((key) =>{
            return ({[key]: surveyList[key as keyof typeof surveyList]
            })
        })
        //put data into the table
        return(
            result.map((item, i) => {
                return(
                    <div onClick={()=>{goToSurvey(i)}} key={i} className="pt-8 duration-150 hover:text-blue-600 cursor-pointer text-center text-gray-900 text-lg font-medium mb-2 flex flex-col rounded-lg shadow-lg bg-white max-w-sm h-full p-5" key={i} >
                        <h5>Ankieta:</h5>
                        <h5>{item[i].name}</h5>
                    </div>
                )
            })
        )
        
    }
    
    
    function goToSurvey(id: number){
        setActiveSurvey(surveyList[id]);
        setPage("single");
    }
    
    
    function renderPage(){
        switch(page){
            case "list":
                return(<>{renderSurveyList()}</>);
            case "single":
                return(<MySingleSurvey/>)
            case "details":
                return(<h1>Error</h1>)
            default:
                return(<h1>Error</h1>)
        }
    }
    
    
    return (
        <MySurveyContext.Provider value={{activeSurvey, setActiveSurvey, surveyID, setPage, activeQuestionIndex, setActiveQuestionIndex, activeQuestion, setActiveQuestion}}>
            <div>
                <p className='text-3xl w-full text-center mb-4'>Moje Ankiety</p>
            </div>
            <div>
                {renderPage()}
            </div>
        </MySurveyContext.Provider>
    )
  }
  