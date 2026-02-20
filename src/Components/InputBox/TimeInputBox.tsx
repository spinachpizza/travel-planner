import { useState } from "react";

interface MaskedTimeInputProps {
  value: string;
  onChange: (val: string) => void;
  style?: React.CSSProperties;
  className?: string;
}

export default function MaskedTimeInput({ value, onChange, style, className }: MaskedTimeInputProps) {
  const [internalValue, setInternalValue] = useState(value || "--:--");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    let chars = internalValue.split(""); // ["-", "-", ":", "-", "-"]

    if (e.key >= "0" && e.key <= "9") {
      // find first dash (skip colon at index 2)
      const index = chars.findIndex((c, i) => c === "-" && i !== 2);
      if (index !== -1) {
        chars[index] = e.key;
        const newVal = chars.join("");
        setInternalValue(newVal);
        onChange(newVal);
      }
    } else if (e.key === "Backspace") {
      // find last filled digit (skip colon)
      const index = [...chars].reverse().findIndex((c) => c !== "-" && c !== ":" );
      if (index !== -1) {
        const realIndex = chars.length - 1 - index;
        chars[realIndex] = "-";
        const newVal = chars.join("");
        setInternalValue(newVal);
        onChange(newVal);
      }
    }
  };

  return (
    <input type="text" value={internalValue} onKeyDown={handleKeyDown} onChange={() => {}}
      maxLength={5} className={className} style={{ textAlign: "center", fontFamily: "monospace", ...style, }} />
  );
}