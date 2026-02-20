import { FaLongArrowAltRight } from "react-icons/fa";
import { RowTypeValues } from "../../Enums/RowType";

interface Props {
    rowType: string,
    fromDate: string;
    toDate: string;
    onChange: (newValue: { fromDate: string; toDate: string }) => void;
}

export default function DateInputBox({ rowType, fromDate, toDate, onChange }: Props) {

    const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.({ fromDate: e.target.value, toDate });
    };

    const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.({ fromDate, toDate: e.target.value });
    };

    if (rowType == RowTypeValues.Dates)
    {
        return (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <input className={`box-row-input`} value={fromDate} onChange={handleFromDateChange} type="date"
                    style={{ width: "30%", marginBottom: 10, marginTop: 10, marginRight: -1 }} />
                <FaLongArrowAltRight />
                <input className={`box-row-input`} value={toDate} onChange={handleToDateChange} type="date"
                    style={{ width: "30%", marginBottom: 10, marginTop: 10, marginRight: 15, marginLeft: -1 }} />
            </div>
        )
    }

    return (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <input className={`box-row-input`} value={fromDate} onChange={handleFromDateChange} type="date"
                style={{ width: "100%", marginBottom: 10, marginTop: 10, marginRight: 15 }} />
        </div>
    );
}