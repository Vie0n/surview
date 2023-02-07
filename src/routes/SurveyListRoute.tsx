// @ts-nocheck
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
                    <div onClick={()=>{goToSurvey(item[i].id)}} className="flex flex-col rounded-lg shadow-lg bg-white max-w-sm h-full p-5 duration-150 hover:text-blue-600 cursor-pointer text-center text-gray-900 text-xl font-medium mb-2" key={i} >
                        <h5>{item[i].name}</h5>
                        <div className="text-sm"><h5>{item[i].description.slice(0,100)}</h5></div>
                    </div>
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
                <p className='text-3xl w-full text-center mb-4'>Ankiety</p>
            </div>
            <div>
                {renderSurveyList()}
            </div>
        </>
    )
  }
  