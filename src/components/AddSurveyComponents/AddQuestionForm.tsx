import { useContext, useState } from "react";
import { AddSurveyContext } from "../../services/AddSurveyContext";
import Button from "../Button";
import FromInput from "../FormInput";


export default function AddQuestionForm(){

    const[answerCount, setAnswerCount] = useState <number>(2);
    const[questionType, setQuestionType] = useState <string>("single");
    const[questionName, setQuestionName] = useState <string>('');
    const[answer, setAnswer] = useState <string[]>([])
    const{stateNewSurvey, setStateNewSurvey, questionIndex, setQuestionIndex, setPageState} = useContext(AddSurveyContext);

    let tempString:string = "answers: {";



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
                <FromInput
                    id={i.toString()}
                    fieldName={`Answer #${i+1}`}
                    isvalid={false}
                    errormsg={"Must not be empty"}
                    onChange={(ev)=>{
                        console.log(answer)
                        let newAnswer = answer;
                        console.log(newAnswer);
                        newAnswer[i] = ev.target.value
                        console.log(newAnswer[i])
                        setAnswer(newAnswer)
                        console.log(answer);
                    }}
                />
            </li>
            );
        }
        return <ul>{rows}</ul>;
    }


    function typeManager(){
        console.log(questionType);
        switch(questionType){
            case "single":
                return(
                    <>
                        <select id="answerCount" defaultValue={2} onChange={(ev)=>{
                        setAnswerCount(ev.target.value);
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
                        setAnswerCount(ev.target.value);
                        }}>
                            {fillAnswerCountSelect()}
                        </select>
                            {answerManager()}
                    </>
                    )
            case "slider":
                return(<></>)
            case "open":
                return(<></>)

        }
    }

    return(
        <form>
            <>
                <h2>New Question</h2>
                    <FromInput
                    id="questionName"
                    fieldName={"Question Name:"}
                    isvalid={false}
                    errormsg={"Must not be empty"}
                    onChange={(ev)=>{
                        setQuestionName(ev.target.value)
                    }}/>
                <div>
                    <label>Question Type</label>
                    <select id="questionType" defaultValue={"single"} onChange={(ev)=>{
                        setQuestionType(ev.target.value)
                    }}>
                        <option value="single">Single Answer</option>
                        <option value="multiple">Multiple Answer</option>
                        <option value="slider">Slider</option>
                        <option value="open">Open</option>
                    </select>
                </div>
                {typeManager()}
                <Button text={"Accept"} color={"primary"} onClick={(ev)=>{
                    ev.preventDefault();
                    console.log(answer);
                    console.log(answer[0]);
                    let newStateNewSurvey = stateNewSurvey;
                    let newString:string = `{"id": ${questionIndex},"question": "${questionName}","type": "${questionType}", "answers": {}}`
                    console.log(newString);
                    let newJSON = JSON.parse(newString)
                    newJSON.answers = answer;
                    console.log(newJSON);
                    console.log(newJSON.answers)
                    newStateNewSurvey.push(newJSON);
                    console.log(newStateNewSurvey);
                    setQuestionIndex(questionIndex+1);
                    setPageState("overview");
                }}/>
            </>
        </form>
    )

}