import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom"
import MySingleSurvey from "../components/MySurveysComponents/MySingleSurvey";
import MySingleSurveyDetails from "../components/MySurveysComponents/MySingleSurveyDetails";
import { MySurveyContext } from "../services/MySurveyContex";

export default function MySurveysRoute() {

    const[surveyList, setSurveyList] = useState<{}>([]);
    const[surveyID, setSurveyID] = useState('');
    const[activeSurvey, setActiveSurvey] = useState({});
    const[page, setPage] = useState('list');
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [activeQuestion, setActiveQuestion] = useState <{}>({});
    const navigate = useNavigate()

    useEffect(()=>{setSurveyList(fetchSurveyList)},[]
    )

    function fetchSurveyList(){
        //TODO: Real data fetch from Firebase based on user
        let mockData = [{
            id: 1,
            name: "Survey 1",
            imgURL: ""
        },{
            id: 2,
            name: "Survey 2",
            imgURL: ""
        },{
            id: 3,
            name: "Survey 3",
            imgURL: ""
        }]
        return mockData;
    }


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
                //console.log(item[i].name);
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
                <input placeholder="Search"/>
            </div>
            <div>
                {renderPage()}
            </div>
        </MySurveyContext.Provider>
    )
  }
  