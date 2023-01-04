import { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import { SurveyContext } from "./SurveyContext";

export default function SurveyButtonsManager( props: { answer: number|Array<boolean>|string; isValid: boolean; } ){
    const [lastQuestionID, setLastQuestionID] = useState<number>();
    const {questions, currentQuestionID, setCurrentQuestionID, stateAnswers, setStateAnswers} = useContext(SurveyContext);

    let tempString:string;
    
    useEffect(()=>{
        getLastQuestionID();
    },[])

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


    if (lastQuestionID !== undefined){
        switch(currentQuestionID){
            case 0:
                return(
                    <div>
                        <Button onClick={(ev) => {
                            ev.preventDefault();
                            setCurrentQuestionID(currentQuestionID + 1);
                            addAnswer();
                        } } text={"Next"} color={"primary"} disabled={!props.isValid} />
                    </div>
                )
            case lastQuestionID:
                return(
                    <div>
                        <Button onClick={(ev) => {
                            ev.preventDefault();
                            setCurrentQuestionID(currentQuestionID - 1);
                            undoAnswer();
                        } } text={"previous"} color={"primary"} />
                        <Button onClick={(ev) => {
                            //TODO: Create a function for putting answers into the database
                            ev.preventDefault();
                            addAnswer();
                        } } text={"Finish"} color={"primary"} disabled={!props.isValid} />
                    </div>
                )
            default:
                return(
                    <div>
                        <Button onClick={(ev) => {
                            ev.preventDefault();
                            setCurrentQuestionID(currentQuestionID - 1);
                            undoAnswer();
                        } } text={"previous"} color={"primary"} />
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