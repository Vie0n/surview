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
            console.log(questions);
            console.log(questions.length);
            let last:number = questions.length - 1;
            setLastQuestionID(last);
        }
    }

    function addAnswer(){
        console.log(currentQuestionID);
        surveySubmitManager();
        let oldAnswers = stateAnswers;
        tempString += "}";
        console.log("State of tempString: " + tempString);
        oldAnswers.push(JSON.parse(tempString));
        console.log(oldAnswers);
        setStateAnswers(oldAnswers);
    }

    function undoAnswer(){
        let oldAnswers = stateAnswers;
        oldAnswers.splice(currentQuestionID - 1, 1);
        console.log(currentQuestionID);
        console.log(oldAnswers);
        setStateAnswers(oldAnswers);
    }

    function surveySubmitManager(){
        tempString = "";
        switch(questions[currentQuestionID].type){
            case "Single":
                console.log(props.answer);
                tempString = `{"id": "${currentQuestionID}", "answer": "${props.answer}"`;
                break;
            case "Multiple":
                console.log(props.answer);
                tempString = `{"id": "${currentQuestionID}", "answer": [${props.answer}]`;
                break;
            case "Slider":
                tempString = `{"id": "${currentQuestionID}", "answer": "${props.answer}"`;
                break;
            case "Open":
                console.log(props.answer);
                tempString = `{"id": "${currentQuestionID}", "answer": "${props.answer}"`;
                break;
            default:
                <div>
                    <p>Error</p>
                </div>
        }
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