import type { IFormInputProps } from "../@types/formInput";
import { useState } from "react";


export default function FromInput(props: IFormInputProps) {
  const { className, isvalid, errormsg, fieldName, onChange } = props
  const [focus, setFocus] = useState<boolean>(false)

  return (
    <div className='flex flex-col py-1'>
      <label className="py-2 font-medium">{ fieldName }</label>
      <input 
        type={props.type}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className={`focus:outline-none rounded-lg hover:drop-shadow-md border-2 p-2 duration-150
        ${ className } ${!isvalid ? 'focus:border-rose-500' : 'focus:border-green-500'}`}
        required={props.required}
      />
      { (!isvalid && focus) && 
        <p className="pl-4 text-red-500 text-sm">
          { errormsg }
        </p>
      }
    </div>
  )
}