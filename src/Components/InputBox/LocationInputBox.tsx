import { useEffect, useRef } from "react";

interface Props {
    value: string;
    onChange: (newValue: string) => void;
}

export default function TextInputBox({ value, onChange } : Props) {
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

    useEffect(() => {
        resizeInput(value ?? "");  
    }, [value]);
    
    const handleLocationInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
        resizeInput(e.target.value);
    };

    return (
        <input ref={locationInputRef} className={`box-row-input location-box-input larger-text`} value={value} onChange={handleLocationInput} maxLength={36} />
    )
}