import '../../Styles/Box.css';
import TransportSelect from "../Dropdowns/TransportSelect";

interface Props {
    value: string;
    onChange: (newValue: string) => void;
}

export default function TransportInputBox({ value, onChange }: Props) {
    return (
        <TransportSelect value={value} onChange={onChange} />
    )
}