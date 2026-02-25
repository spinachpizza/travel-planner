import { FaLocationDot } from "react-icons/fa6";
import CitiesDropdown from "../Dropdowns/CitiesDropdown";

interface Props {
    value: string;
    onChange: (newValue: string) => void;
}

export default function TextInputBox({ value, onChange } : Props) {
    return (
        <>
            <CitiesDropdown value={value} onChange={onChange} />
            <FaLocationDot className="location-dot-icon" size={18} />
        </>
    )
}