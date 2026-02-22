import { RowTypeValues, type RowType } from "../../Enums/RowType";
import TextBox from "../TextBox";
import '../../Styles/Box.css'
import LocationInputBox from "./LocationInputBox";

interface Props {
    textSize: "L" | "S";
    rowType: RowType;
    value: string;
    onChange: (newValue: string) => void;
}

export default function TextInputBox({ textSize, rowType = RowTypeValues.NotSet, value, onChange } : Props) {

    const textClass = textSize == "L" ? "large-text" : "default-text";

    if (rowType === RowTypeValues.Notes)
    {
        return (
            <TextBox textSize="S" value={value} onChange={(e) => onChange?.(e.target.value)}/>
        )
    }

    if (rowType === RowTypeValues.Location)
    {
        return (
            <LocationInputBox value={value} onChange={onChange} />
        )
    }

    return (
        <input className={`box-row-input ${textClass}`} value={value} onChange={(e) => onChange(e.target.value)} maxLength={24}/>
    )
}