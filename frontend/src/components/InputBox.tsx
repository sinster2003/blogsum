import { ChangeEvent } from "react";

interface InputBoxInputs {
    label: string;
    placeholder: string;
    value: string | number
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

const InputBox = ({label, placeholder, value, onChange, type}: InputBoxInputs) => {
  return (
    <div className="flex flex-col gap-1">
        <label htmlFor={label} className="text-md font-bold">
            {label}
        </label>
        <input type={type || "text"} className="border-2 p-2 outline-none border-gray-200 rounded-md focus:border-slate-600" autoComplete="off" id={label} value={value} placeholder={placeholder} onChange={onChange}/> 
    </div>
  )
}

export default InputBox