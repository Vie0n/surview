import { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import { SurveyContext } from "./SurveyContext";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function SurveyButtonsManager( props: { answer: number|Array<boolean>|string; isValid: boolean; } ){
    const [lastQuestionID, setLastQuestionID] = useState<number>();
    const {questions, currentQuestionID, setCurrentQuestionID, stateAnswers, setStateAnswers, surveyID, recipt, navigate} = useContext(SurveyContext);

    const surveyAnswersRef = collection(db, "survey-answers");

    let tempString:string;
    
    useEffect(()=>{
        getLastQuestionID();
    },[])


    async function addToDatabase(payload:object){
        await addDoc(surveyAnswersRef, payload);
    }

    function getLastQuestionID(){
        if (questions !== "undefined"){
            let last:number = questions.length - 1;
            setLastQuestionID(last);
        }
    }

    function addAnswer(){
        let oldAnswers = stateAnswers;
        let newJSON = {"id": currentQuestionID, "answer": {}}
        newJSON.answer = props.answer;
        oldAnswers.push(newJSON);
        setStateAnswers(oldAnswers);
    }

    function undoAnswer(){
        let oldAnswers = stateAnswers;
        oldAnswers.splice(currentQuestionID - 1, 1);
        setStateAnswers(oldAnswers);
    }

    function publishAnswers(){
        let newJSON = {"surveyID": surveyID, "recipt": recipt, "answers": []};
        newJSON.answers = stateAnswers;
        addToDatabase(newJSON);
    }



    if (lastQuestionID !== undefined){
        switch(currentQuestionID){
            case 0:
                return(
                    <div className="flex gap-4 justify-center">
                        <Button onClick={(ev) => {
                            ev.preventDefault();
                            setCurrentQuestionID(currentQuestionID + 1);
                            addAnswer();
                        } } text={"Next"} color={"primary"} disabled={!props.isValid} />
                    </div>
                )
            case lastQuestionID:
                return(
                    <div className="flex gap-4 justify-center">
                        <Button onClick={(ev) => {
                            ev.preventDefault();
                            setCurrentQuestionID(currentQuestionID - 1);
                            undoAnswer();
                        } } text={"previous"} color={"primary"} />
                        <Button onClick={(ev) => {
                            ev.preventDefault();
                            addAnswer();
                            publishAnswers();
                            alert("Ankieta została wysłana.")
                            navigate("/surveys/")
                        } } text={"Finish"} color={"primary"} disabled={!props.isValid} />
                    </div>
                )
            default:
                return(
                    <div className="flex gap-4 justify-center">
                        <Button onClick={(ev) => {
                            ev.preventDefault();
                            setCurrentQuestionID(currentQuestionID - 1);
                            undoAnswer();
                        } } text={"Previous"} color={"primary"} />
                        <Button onClick={(ev) => {
                            ev.preventDefault();
                            setCurrentQuestionID(currentQuestionID + 1);
                            addAnswer();
                        } } text={"Next"} color={"primary"} disabled={!props.isValid} />
                    </div>
                )
        }
    } else return <></>
}