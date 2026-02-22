import { RowTypeValues, type RowType } from "../../Enums/RowType";
import TextBox from "../TextBox";
import '../../Styles/Box.css'
import { useEffect, useRef } from "react";

interface Props {
    textSize: "L" | "S";
    rowType: RowType;
    value: string;
    onChange: (newValue: string) => void;
}

export default function TextInputBox({ textSize, rowType = RowTypeValues.NotSet, value, onChange } : Props) {

    const textClass = textSize == "L" ? "large-text" : "default-text";

    const locationInputRef = useRef<HTMLInputElement>(null);

    const resizeInput = (val: string) => {
        const input = locationInputRef.current;
        if (!input) return;

        const tmp = document.createElement("span");
        tmp.style.visibility = "hidden";
        tmp.style.whiteSpace = "pre";
        tmp.style.font = getComputedStyle(input).font;
        tmp.textContent = val || "--:--";
        document.body.appendChild(tmp);

        const newWidth = Math.min(
            Math.max(tmp.offsetWidth + 20, input.parentElement ? input.parentElement.offsetWidth * 0.1 : 0),
            input.parentElement ? input.parentElement.offsetWidth * 0.6 : input.offsetWidth
        );

        input.style.width = `${newWidth}px`;
        document.body.removeChild(tmp);
    };

    const handleLocationInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
        resizeInput(e.target.value);
    };

    useEffect(() => {
        if (rowType === RowTypeValues.Location) {
            resizeInput(value ?? "");
        }
    }, [value, rowType]);

    if (rowType === RowTypeValues.Notes)
    {
        return (
            <TextBox textSize="S" value={value as string} onChange={(e) => onChange?.(e.target.value)}/>
        )
    }

    if (rowType === RowTypeValues.Location)
    {
        return (
            <input ref={locationInputRef} className={`box-row-input location-box-input larger-text`} value={value} onChange={handleLocationInput} maxLength={36} />
        )
    }

    return (
        <input className={`box-row-input ${textClass}`} value={value} onChange={(e) => onChange(e.target.value)} maxLength={24}/>
    )
}