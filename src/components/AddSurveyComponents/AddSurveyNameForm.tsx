import { useContext, useState } from "react";
import { AddSurveyContext } from "../../services/AddSurveyContext";
import Button from "../Button";
import FromInput from "../FormInput";

export default function AddSurveyNameForm()
    {
        const [newSurveyNameInfo, setNewSurveyNameInfo] = useState <string>('')
        const {surveyName, setSurveyName, setPageState} = useContext(AddSurveyContext);
        return(
            <form>
                    <FromInput
                        type="text"
                        id="newSurveyName"
                        placeholder="New Survey"
                        fieldName="Add Survey Name"
                        isvalid={false}
                        errormsg={undefined}
                        onChange={(ev)=>{
                            setSurveyName(ev.target.value)
                        }}
                        required
                    />
                <Button onClick={(ev) => {
                    ev.preventDefault();
                    console.log("Click");
                    if (surveyName != '')
                        setPageState("overview");
                } } text={"Accept"} color={"primary"}                />
            </form>
        )
    }