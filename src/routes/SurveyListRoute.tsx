import { useEffect, useState } from "react";
import { db } from "../firebase";
import {collection, getDocs} from "firebase/firestore";

import { useNavigate } from "react-router-dom"

export default function SurveyListRoute() {

    const [surveyList, setSurveyList] = useState<{}>([]);
    const surveyCollectionRef = collection(db, "survey-list");
    const navigate = useNavigate()

    useEffect(()=>{
        async function getSurveyList() {
            const surveyListData = await getDocs(surveyCollectionRef);
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
    
    
    function goToSurvey(id: string){
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
  