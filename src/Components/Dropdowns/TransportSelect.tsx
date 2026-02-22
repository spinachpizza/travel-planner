import { useEffect, useRef, useState } from "react";
import { validTransportTypes } from "../../Constants/ValidTransportTypeConstants";
import '../../Styles/TransportTypeSelect.css'

interface Props {
    value: string;
    onChange: (newValue: string) => void;
}

export default function TransportSelect({ value, onChange }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const selectTransportType = (type: string) => {
        onChange(type);
        setIsOpen(false);
    }
    
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="transport-select-main-container">
            <div onClick={() => { setIsOpen(o => !o) }} className={`transport-select-display-container ${isOpen ? "transport-select-open" : ""}`}>
                <span className="transport-select-display-text">{value}</span>
                <span style={{ fontSize: 18 }}>▾</span>
            </div>

            {isOpen && 
                <div className="transport-select-dropdown-container">
                    {validTransportTypes.map(type => {
                        return (
                            <div key={type} className={`transport-select-dropdown-row ${type == value ? "transport-select-dropdown-row-active" : ""}`} onClick={() => selectTransportType(type)}>
                                <div style={{width: 140, paddingTop: 3, marginLeft: 10 }}>{type}</div>
                            </div>
                        )
                    })}
                </div>
            }   
        </div>
    )
}