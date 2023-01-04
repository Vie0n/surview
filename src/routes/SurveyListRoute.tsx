import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom"

export default function SurveyListRoute() {

    const[surveyList, setSurveyList] = useState<{}>([]);
    const navigate = useNavigate()

    useEffect(()=>{setSurveyList(fetchSurveyList)},[]
    )

    function fetchSurveyList(){
        //TODO: Real data fetch from Firebase
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
                    <tr key={i} onClick={()=>{goToSurvey(item[i].id)}}>
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
        console.log(`/survey/${id}`)
       navigate(`/survey/${id}`)
    }
    
    
    
    
    return (
        <>
            <div>
                <p className='text-xl'>Survey List:</p>
            </div>
            <div>
                <input placeholder="Search"/>
            </div>
            <div>
                {renderSurveyList()}
            </div>
        </>
    )
  }
  