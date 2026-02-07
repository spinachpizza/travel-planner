import {useLayoutEffect, useRef } from 'react';
import '.././Styles/Box.css'

interface Props {
    textSize: "L" | "S";
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextBox({ textSize, value, onChange }: Props) {
    const textClass = textSize == "L" ? "large-text" : "default-text";

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Adjust height whenever value changes (after DOM updates)
    useLayoutEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const style = window.getComputedStyle(textarea);
        const paddingTop = parseFloat(style.paddingTop);
        const paddingBottom = parseFloat(style.paddingBottom);

        textarea.style.height = "auto"; 
        textarea.style.height = `${textarea.scrollHeight - paddingTop - paddingBottom}px`; 
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (onChange) onChange(e); // let parent update value first
    };

    return (
        <>
            <textarea ref={textareaRef} className={`notes-box ${textClass}`} value={value} onChange={handleChange} rows={1} maxLength={300} />
        </>
    )
}