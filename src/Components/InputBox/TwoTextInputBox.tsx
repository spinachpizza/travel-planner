import { FaLongArrowAltRight } from "react-icons/fa";
import { RowTypeValues } from "../../Enums/RowType";
import MaskedTimeInput from "./TimeInputBox";

interface Props {
    rowType: string,
    value1: string;
    value2: string;
    onChange: (newValue: { value1: string; value2: string }) => void;
}

export default function DateInputBox({ rowType, value1, value2, onChange }: Props) {

    const handleValue1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.({ value1: e.target.value, value2 });
    };

    const handleValue2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.({ value1, value2: e.target.value });
    };


    if (rowType == RowTypeValues.Times)
    {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 10 }}>
                <MaskedTimeInput className={`box-row-input`} value={value1} onChange={(val) => onChange?.({ value1: val, value2 })}
                    style={{ width: "15%", marginBottom: 10, marginTop: 10, marginRight: -1, caretColor: "transparent" }} />
                <FaLongArrowAltRight />
                <MaskedTimeInput className={`box-row-input`} value={value2} onChange={(val) => onChange?.({ value1, value2: val })}
                    style={{ width: "15%", marginBottom: 10, marginTop: 10, marginRight: 15, marginLeft: -1, caretColor: "transparent" }} />
            </div>
        )
    }

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 10 }}>
            <input className={`box-row-input`} value={value1} onChange={handleValue1Change} type="text"
                style={{ width: "35%", marginBottom: 10, marginTop: 10, marginRight: -1 }} />
            <FaLongArrowAltRight />
            <input className={`box-row-input`} value={value2} onChange={handleValue2Change} type="text"
                style={{ width: "35%", marginBottom: 10, marginTop: 10, marginRight: 15, marginLeft: -1 }} />
        </div>
    )
}