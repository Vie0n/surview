export interface IReciptInput extends React.LiHTMLAttributes<HTMLLIElement>{
    fieldName:string,
    setState: (ev:React.ChangeEvent<HTMLInputElement>) => void,
    defaultValue:string;
}