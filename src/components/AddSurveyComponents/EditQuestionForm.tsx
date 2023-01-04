import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AddSurveyContext } from "../../services/AddSurveyContext";
import Button from "../Button";
import FormInputValidate from "../FormInputValidate";


export default function EditQuestionForm(){

    const[answerCount, setAnswerCount] = useState <number>(2);
    const[questionType, setQuestionType] = useState <string>("");
    const[questionName, setQuestionName] = useState <string>('');
    const[answer, setAnswer] = useState <string[]>([]);
    const[validAnswers, setValidAnswers] = useState <boolean[]>([]);
    const{stateNewSurvey, setStateNewSurvey, setPageState, activeQuestion, activeQuestionIndex} = useContext(AddSurveyContext);


    useEffect(()=>{
        setAnswerCount(activeQuestion.answers.length > 0 ? activeQuestion.answers.length : 2)
        setQuestionType(activeQuestion.type);
        setQuestionName(activeQuestion.question);
        setAnswer([...activeQuestion.answers]);
        setValidAnswers([true]);
    },[])


    function checkUndefined(string:string){
        if(string === undefined) return true;
        else return false;
    }


    function checkValidity(questionType:string){
        let validName = false, isValid = false, validAnswersBool = false;
        if(questionName === '' || questionName === undefined) validName = false;
        else validName = true;
        if (questionType === "single" || questionType === "multiple"){
            validAnswersBool = (validAnswers.every(Boolean) && validAnswers.length > 0)
        }
        else validAnswersBool = true;
        if (validName && validAnswersBool) isValid = true;
        else isValid = false
        return isValid;
    }


    function fillAnswerValidity(answerCount:number){
        let newValidAnswers = [];
        for(var i = 0; i < answerCount; i++){
            if (answer[i] === undefined || answer[i] === '' || answer[i] === null) newValidAnswers[i] = false;
            else newValidAnswers[i] = true;
        }
        setValidAnswers(newValidAnswers);
    }

    function keepOldAnswers(answerCount:number){
        const oldAnswers:Array<string> = [];
        for(var i = 0; i < answerCount; i++){
            oldAnswers[i] = answer[i];
        }
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
                    }} defaultValue={checkUndefined(answer[i]) ? '' : answer[i]}/>
                </li>
            );
        }
        return <ul>{rows}</ul>;
    }


    function typeManager(){
        switch(questionType){
            case "single":
                return(
                    <>
                        <select id="answerCount" defaultValue={answerCount} onChange={(ev)=>{
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
                        <select id="answerCount" defaultValue={answerCount} onChange={(ev)=>{
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
                    }} defaultValue={activeQuestion.question}/>
                <div>
                    <label>Typ pytania</label>
                    <select id="questionType" defaultValue={activeQuestion.type} onChange={(ev)=>{
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
                    let newStateNewSurvey = stateNewSurvey;
                    let newJSON = {"question": questionName,"type": questionType, "answers": {}}
                    if (questionType === "single" || questionType === "multiple") newJSON.answers = answer; 
                    else newJSON.answers = [];
                    newStateNewSurvey.questions[activeQuestionIndex] = newJSON;
                    setStateNewSurvey(newStateNewSurvey);
                    setPageState("overview");
                }} disabled={!checkValidity(questionType)}/>
                <Button text={"Wstecz"} color={"primary"} onClick={() => {
                    setPageState("overview");
                }}/>
            </>
        </form>
    )
}