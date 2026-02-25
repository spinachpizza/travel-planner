import { useEffect, useRef, useState } from "react";
import cities from '../../assets/cityNames.json';
import '../../Styles/CitiesDropdown.css';

interface Props {
    value: string;
    onChange: (newValue: string) => void;
}

export default function CitiesDropdown({value, onChange}: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectionIndex, setSelectionIndex] = useState(0);
    
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

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Tab" || e.key === "Enter") {
            e.preventDefault();

            if (citiesSuggestions.length >= 1)
                selectCity(citiesSuggestions[selectionIndex]);
        }

        if (e.key === "ArrowDown")
        {
            if (citiesSuggestions.length - 1 > selectionIndex)
                setSelectionIndex(selectionIndex + 1);
        }

        if (e.key === "ArrowUp")
        {
            if (selectionIndex > 0)
                setSelectionIndex(selectionIndex - 1);
        }

        if (e.key === "Escape") {
            setIsOpen(false);
        }
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectionIndex(0);
        onChange(e.target.value);
        setIsOpen(true);
    };

    const selectCity = (name: string) => {
        onChange(name);
        setIsOpen(false);
        setSelectionIndex(0);
    }

    const citiesSuggestions = GetCities(value);

    const isLastRow = (index: number) =>
    {
        return citiesSuggestions.length - 1 == index;
    }

    const containerRef = useRef<HTMLDivElement>(null);
    
        return (
            <div ref={containerRef} onKeyDown={handleKeyPress}>
                <input className={`box-row-input location-box-input large-text`} value={value} onChange={handleValueChange} maxLength={36} />
    
                {isOpen && 
                    <div className="cities-dropdown-container">
                        {citiesSuggestions.map((city, index) => {
                            return (
                                <div key={city} className={`cities-dropdown-row ${index == selectionIndex ? "cities-dropdown-row-active" : ""}`} onClick={() => selectCity(city)}
                                    style={{ borderBottom: isLastRow(index) ? "" : "1px solid #363636"}}>
                                    <div style={{width: 140, paddingTop: 3, marginLeft: 10 }}>{city}</div>
                                </div>
                            )
                        })}
                    </div>
                }   
            </div>
        )
}


function GetCities(value: string)
{
    if (value.length < 2)
        return [];

    var relevantCities = cities
        .filter(city => 
            city.toLowerCase().startsWith(value.toLowerCase())
        )
        .slice(0,5);

    return relevantCities;
}
