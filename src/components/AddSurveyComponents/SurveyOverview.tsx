import { useContext } from "react";
import { AddSurveyContext } from "../../services/AddSurveyContext";
import Button from "../Button";

export default function SurveyOverview(){
    
    const {surveyName, stateNewSurvey, questionIndex, setPageState} = useContext(AddSurveyContext);

    function renderAnswers(questionIndex:number){
        console.log(stateNewSurvey[questionIndex].answers);
        return(
            stateNewSurvey[questionIndex].answers.map((answer:string, answerIndex:number)=>{
                console.log(answer);
                return(
                    <tr key={answerIndex}>
                        <td>{answer}</td>
                    </tr>
                )
            })
        )
    }


    function renderQuestions(){
        //console.log(stateNewSurvey);
        if (stateNewSurvey.length <= 0){
            //console.log("empty");
            return(<div>
                <h1>Brak pytań</h1>
            </div>)
        } else{
            //console.log("not empty");
            return(
                stateNewSurvey.map((question:Array<{id:number, question:string, type:string, answers:Array<[]>}>, questionIndex:number)=>{
                    //console.log(question.id);
                    return(
                        <table key={questionIndex}>
                            <thead>
                                <tr>
                                    <th>{`Pytanie #${questionIndex+1}: ${question.question}`}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderAnswers(questionIndex)}
                            </tbody>
                        </table>
                    )
                })
            )
        }
        
    }
    
    
    return(
        <div>
            <div>
                <p className='text-xl'>{surveyName}</p>
            </div>
            <div>
                {renderQuestions()}
            </div>
            <Button text={"Dodaj Pytanie"} color={"primary"} onClick={() =>{
                setPageState("addQuestion");
            }}/>
            { questionIndex>0 ? 
                <Button text={"Publikuj Ankiete"} color={"primary"}/> :
                <></>
            }
        </div>
    )
}