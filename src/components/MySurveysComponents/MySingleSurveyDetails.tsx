import { useContext } from "react";
import { MySurveyContext } from "../../services/MySurveyContex";
import Button from "../Button";

export default function MySingleSurveyDetails(){

    const {setPage, activeQuestion, activeQuestionIndex} = useContext(MySurveyContext);

    function renderAnswers(){
        if (activeQuestion.answers !== undefined){
            if(activeQuestion.answers.length > 0){
                return(
                    activeQuestion.answers.map((answer:string, answerIndex:number)=>{
                        return(
                            <tr key={answerIndex}>
                                <td>{`Odpowiedź #${answerIndex+1}: ${answer}`}</td>
                            </tr>
                        )
                    })
                )
            }
        }
        else return(
            <tr><td>Brak</td></tr>
        )
    }

    function renderQuestions(){
        if (activeQuestion === undefined || activeQuestion.length <= 0) {
            return(
            <div>
                <h1>Error</h1>
            </div>)
        }else{
            return(
                <table>
                    <thead>
                        <tr>
                            <th>{activeQuestion.question}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderAnswers()}
                    </tbody>
                </table>
            )
        }
    
    }






    return(
        <div>
            <Button text={"Wstecz"} color={"primary"} onClick={()=>{
                setPage("single")
            }}/>
            {renderQuestions()}
        </div>
    )
}