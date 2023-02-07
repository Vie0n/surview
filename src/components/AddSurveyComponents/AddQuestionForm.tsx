// @ts-nocheck
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AddSurveyContext } from "../../services/AddSurveyContext";
import Button from "../Button";
import FormInputValidate from "../FormInputValidate";


export default function AddQuestionForm(){

    const[answerCount, setAnswerCount] = useState <number>(2);
    const[questionType, setQuestionType] = useState <string>("Single");
    const[questionName, setQuestionName] = useState <string>('');
    const[answer, setAnswer] = useState <string[]>([]);
    const[validAnswers, setValidAnswers] = useState <boolean[]>([]);
    const{stateNewSurvey, questionIndex, setQuestionIndex, setPageState} = useContext(AddSurveyContext);

    let tempString:string = "answers: {";

    useEffect(()=>{
        fillAnswerValidity(answerCount);
    },[])



    function checkValidity(questionType:string){
        let validName = false, isValid = false, validAnswersBool = false;
        if(questionName === '' || questionName === undefined) validName = false;
        else validName = true;
        if (questionType === "Single" || questionType === "Multiple"){
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
                        newAnswer[i] = ev.target.value;
                        setAnswer(newAnswer);
                        if (ev.target.value.length > 0)
                            newValidAnswers[i] = true;
                        else
                            newValidAnswers[i] = false;
                        setValidAnswers([...newValidAnswers]);
                    } } defaultValue={""}/>
                </li>
            );
        }
        return <ul>{rows}</ul>;
    }


    function typeManager(){
        switch(questionType){
            case "Single":
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
            case "Multiple":
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
            case "Slider":
                break
            case "Open":
                break

        }
    }

    return(
        <div>
            <div className="grid grid-cols-3 gap-4 place-items-start">
            <Button text={"Wstecz"} color={"primary"} onClick={()=>{
                setPageState("overview");
            }}/>
            </div>
            <form className="max-w-[600px] m-auto">
            <div>
                <h2>Nowe Pytanie</h2>
                <FormInputValidate fieldName={"Podaj pytanie"} setState={(ev: ChangeEvent<HTMLInputElement>) => {
                    setQuestionName(ev.target.value);
                } } defaultValue={""}/>
                <div>
                    <label>Typ pytania</label>
                    <select id="questionType" defaultValue={"Single"} onChange={(ev)=>{
                        if(ev.target.value === "slider" || ev.target.value == "open") {
                            setAnswer([]);
                        };
                        fillAnswerValidity(answerCount);
                        setQuestionType(ev.target.value)
                    }}>
                        <option value="Single">Jednokrotnego wyboru</option>
                        <option value="Multiple">Wielokrotnego wyboru</option>
                        <option value="Slider">Skala 1-10</option>
                        <option value="Open">Otwarte</option>
                    </select>
                </div>
                {typeManager()}
                <div className="flex max-w-[600px] m-auto justify-evenly mt-4">
                    <Button text={"Akceptuj"} color={"primary"} onClick={(ev)=>{
                        ev.preventDefault();
                        let newStateNewSurvey = stateNewSurvey;
                        let newJSON = {"question": questionName,"type": questionType, "answers": {}}
                        newJSON.answers = answer;
                        newStateNewSurvey.questions.push(newJSON);
                        setQuestionIndex(questionIndex+1);
                        setPageState("overview");
                    }} disabled={!checkValidity(questionType)}/>
                    <Button text={"Wstecz"} color={"primary"} onClick={() => {
                        setPageState("overview");
                    }}/>
                    </div>
            </div>
        </form>
        </div>
    )

}