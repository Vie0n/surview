import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AddSurveyContext } from "../../services/AddSurveyContext";
import Button from "../Button";
import FormInputValidate from "../FormInputValidate";


export default function AddQuestionForm(){

    const[answerCount, setAnswerCount] = useState <number>(2);
    const[questionType, setQuestionType] = useState <string>("single");
    const[questionName, setQuestionName] = useState <string>('');
    const[answer, setAnswer] = useState <string[]>([]);
    const[validAnswers, setValidAnswers] = useState <boolean[]>([]);
    const{stateNewSurvey, setStateNewSurvey, questionIndex, setQuestionIndex, setPageState} = useContext(AddSurveyContext);

    let tempString:string = "answers: {";

    useEffect(()=>{
        fillAnswerValidity(answerCount);
    },[])


    function resetValidity(){
        //console.log("reset");
        let resetValidAnswers:Array<boolean> = [];
        //console.log(answerCount);
        for(var i = 0; answerCount > i; i++){
            console.log(i);
            resetValidAnswers[i] = false
        }
        //console.log(resetValidAnswers);
        setValidAnswers([...resetValidAnswers]);
        //console.log("Reset Complete");
    }


    function checkValidity(questionType:string){
        let validName = false, isValid = false, validAnswersBool = false;
        //console.log(questionType);
        //console.log(questionName)
        if(questionName === '' || questionName === undefined) validName = false;
        else validName = true;
        if (questionType === "single" || questionType === "multiple"){
            //console.log(questionType);
            //console.log(validAnswers);
            //console.log(validAnswers.every(Boolean))
            validAnswersBool = (validAnswers.every(Boolean) && validAnswers.length > 0)
        }
        else validAnswersBool = true;
        //console.log(validName);
        //console.log(validAnswersBool);
        if (validName && validAnswersBool) isValid = true;
        else isValid = false
        //console.log(isValid);
        return isValid;
    }


    function fillAnswerValidity(answerCount:number){
        let newValidAnswers = [];
        for(var i = 0; i < answerCount; i++){
            //console.log(answerCount)
            //console.log(answer[i])
            if (answer[i] === undefined || answer[i] === '' || answer[i] === null) newValidAnswers[i] = false;
            else newValidAnswers[i] = true;
        }
        //console.log(newValidAnswers);
        setValidAnswers(newValidAnswers);
    }

    function keepOldAnswers(answerCount:number){
        const oldAnswers:Array<string> = [];
        //setOldAnswer([]);
        console.log(oldAnswers);
        console.log(answerCount);
        for(var i = 0; i < answerCount; i++){
            console.log(i);
            oldAnswers[i] = answer[i];
        }
        console.log(oldAnswers);
        setAnswer(oldAnswers);
        fillAnswerValidity(answerCount);
    }

    function fillAnswerCountSelect(){
        let options = []
        for(let i = 2; i <= 20; i++){
            options.push(<option value={i} key={i}>{i}</option>)
        }
        return options;
        
    }

    function answerManager(){
        const rows = [];
        for (let i = 0; i < answerCount; i++) {
            rows.push(
                <li key={i}>
                    <FormInputValidate fieldName={`Odpowiedź #${i + 1}`} setState={(ev: ChangeEvent<HTMLInputElement>) => {
                        let newAnswer = answer;
                        let newValidAnswers = validAnswers;
                        newAnswer[i] = ev.target.value
                        setAnswer(newAnswer)
                        if(ev.target.value.length > 0) newValidAnswers[i] = true;
                        else newValidAnswers[i] = false;
                        setValidAnswers([...newValidAnswers]);
                    }}/>
                </li>
            );
        }
        return <ul>{rows}</ul>;
    }


    function typeManager(){
        //console.log(questionType);
        switch(questionType){
            case "single":
                return(
                    <>
                        <select id="answerCount" defaultValue={2} onChange={(ev)=>{
                        setAnswerCount(parseInt(ev.target.value));
                        keepOldAnswers(parseInt(ev.target.value));
                        }}>
                            {fillAnswerCountSelect()}
                        </select>
                        {answerManager()}
                    </>
                )
            case "multiple":
                return(
                    <>
                        <select id="answerCount" defaultValue={2} onChange={(ev)=>{
                        setAnswerCount(parseInt(ev.target.value));
                        keepOldAnswers(parseInt(ev.target.value));
                        }}>
                            {fillAnswerCountSelect()}
                        </select>
                            {answerManager()}
                    </>
                    )
            case "slider":
                break
            case "open":
                break

        }
    }

    return(
        <form>
            <>
                <h2>Nowe Pytanie</h2>
                <FormInputValidate fieldName={"Podaj pytanie"} setState={(ev: ChangeEvent<HTMLInputElement>) => {
                        setQuestionName(ev.target.value)
                    }}/>
                <div>
                    <label>Typ pytania</label>
                    <select id="questionType" defaultValue={"single"} onChange={(ev)=>{
                        if(ev.target.value === "slider" || ev.target.value == "open") {
                            setAnswer([]);
                        };
                        fillAnswerValidity(answerCount);
                        setQuestionType(ev.target.value)
                    }}>
                        <option value="single">Jednokrotnego wyboru</option>
                        <option value="multiple">Wielokrotnego wyboru</option>
                        <option value="slider">Skala 1-10</option>
                        <option value="open">Otwarte</option>
                    </select>
                </div>
                {typeManager()}
                <Button text={"Akceptuj"} color={"primary"} onClick={(ev)=>{
                    ev.preventDefault();
                    //console.log(answer);
                    //console.log(answer[0]);
                    let newStateNewSurvey = stateNewSurvey;
                    let newString:string = `{"id": ${questionIndex},"question": "${questionName}","type": "${questionType}", "answers": {}}`
                    //console.log(newString);
                    let newJSON = JSON.parse(newString)
                    newJSON.answers = answer;
                    //console.log(newJSON);
                    //console.log(newJSON.answers)
                    newStateNewSurvey.push(newJSON);
                    //console.log(newStateNewSurvey);
                    setQuestionIndex(questionIndex+1);
                    setPageState("overview");
                }} disabled={!checkValidity(questionType)}/>
                <Button text={"Wstecz"} color={"primary"} onClick={() => {
                    setPageState("overview");
                }}/>
            </>
        </form>
    )

}