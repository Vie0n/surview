import React from "react";

export interface IFormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fieldName: string,
  isvalid: boolean,
  errormsg: string | React.ReactNode,
  defaultValue?: string
}