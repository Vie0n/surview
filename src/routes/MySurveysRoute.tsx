import { useEffect, useState } from "react";

import MySingleSurvey from "../components/MySurveysComponents/MySingleSurvey";
import MySingleSurveyDetails from "../components/MySurveysComponents/MySingleSurveyDetails";
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

    const mySurveyCollectionQuery = query(collection(db, "survey-list"), where("uid", "==", user.uid));

    useEffect(()=>{
        async function getSurveyList() {
            const surveyListData = await getDocs(mySurveyCollectionQuery);
            setSurveyList(surveyListData.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }
        getSurveyList();
    },[]
    )



    function renderSurveyList(){
        return(
            <div>
                <table>
                    <tbody>
                        {fillSurveyList()}
                    </tbody>
                </table>
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
                    <tr key={i} onClick={()=>{goToSurvey(i)}}>
                        <td>
                            {item[i].name}
                        </td>
                        <td>
                            <img src={item[i].imgURL} alt={item[i].name} />
                        </td>
                    </tr>
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
                return(<MySingleSurveyDetails/>)
            default:
                return(<h1>Error</h1>)
        }
    }
    
    
    return (
        <MySurveyContext.Provider value={{activeSurvey, setActiveSurvey, surveyID, setPage, activeQuestionIndex, setActiveQuestionIndex, activeQuestion, setActiveQuestion}}>
            <div>
                <p className='text-xl'>Moje Ankiety</p>
            </div>
            <div>
                {renderPage()}
            </div>
        </MySurveyContext.Provider>
    )
  }
  