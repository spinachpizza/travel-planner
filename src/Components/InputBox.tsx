import { RowTypeValues, type RowType } from "../Enums/RowType";

interface Props {
    textSize: "L" | "S";
    rowType?: RowType;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputBox({ textSize, rowType = RowTypeValues.NotSet, value, onChange } : Props) {
    let content: any;

    const textClass = textSize == "L" ? "large-text" : "default-text";

    switch(rowType) {
        case RowTypeValues.NotSet:
            content = (
                <input className={`box-row-input ${textClass}`} value={value} onChange={onChange} maxLength={24}/>
            )
            break;
        case RowTypeValues.AccomodationCost:
        case RowTypeValues.FoodCosts:
        case RowTypeValues.OtherCosts:
        case RowTypeValues.TravelCost:
            content = (
                <>
                    <p className="default-text" style={{marginLeft: 20}}>£</p>
                    <input className={`box-row-input ${textClass}`} value={value} onChange={onChange} type="number"
                        style={{ width: "25%", marginLeft: 5, marginBottom: 10, marginTop: 10, marginRight: 15 }} />
                </>
            )
            break;
        case RowTypeValues.DateFrom:
        case RowTypeValues.DateTo:
        case RowTypeValues.TravelDate:
            content = (
                <input className={`box-row-input ${textClass}`} value={value} onChange={onChange} type="date"
                    style={{ width: "30%", marginBottom: 10, marginTop: 10, marginRight: 15 }} />
            )
            break;
        case RowTypeValues.TravelTime:
        case RowTypeValues.LeaveTime:
        case RowTypeValues.ArriveTime:
            content = (
                <input className={`box-row-input ${textClass}`} value={value} onChange={onChange} maxLength={10}
                    style={{ width: "30%", marginBottom: 10, marginTop: 10, marginRight: 15 }} />
            )
            break;
        default:
            content = (
                <>
                    <input className={`box-row-input ${textClass}`} maxLength={50} value={value} onChange={onChange} />
                </>
            )
    }

    return (
        <>{content}</>
    )
}