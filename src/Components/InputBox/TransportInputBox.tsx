import { validTransportTypes } from "../../Constants/Constants";
import type { TransportType } from "../../Enums/TransportType";
import '../../Styles/Box.css';

interface Props {
    value: string;
    onChange: (newValue: string) => void;
}

export default function DateInputBox({ value, onChange }: Props) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <select
                value={value as string}
                onChange={(e) => onChange(e.target.value as TransportType)}
                className="type-select"
            >
                {validTransportTypes.map((transportType) => (
                    <option key={transportType} value={transportType}>
                        {transportType}
                    </option>
                ))}
            </select>
        </div>
    );
}