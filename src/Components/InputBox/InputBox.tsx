import type { JSX } from "react";
import { isAccomodationCostRow, isCostRow, isDateRow, isTextRow, isTransportRow, isTwoTextRow } from "../Box/BoxHelpers";
import type { AccomodationCostRowData, BoxRowData, CostRowData, DateRowData, TextRowData, TransportRowData, TwoTextRowData } from "../../Types/BoxRowData";
import TextInputBox from "./TextInputBox";
import TwoTextInputBox from "./TwoTextInputBox";
import CostInputBox from "./CostInputBox";
import DateInputBox from "./DateInputBox";
import TransportInputBox from "./TransportInputBox";
import type { newValueType } from "../../Types/newValueType";
import AccomodationCostInputBox from "./AccomodationCostInputBox";

interface Props {
    row: BoxRowData;
    onChange: (params: {newValue: newValueType }) => void;
}

export default function InputBox({ row, onChange }: Props ) {

    let content: JSX.Element;

    content = <div style={{marginLeft: 20}}>Error</div>

    if (isTextRow(row))
    {
        content = (
            <TextInputBox textSize={"S"} value={(row as TextRowData).value} rowType={row.rowType} 
                onChange={(data) => onChange({ newValue: data })} />
        )
    }

    if (isTwoTextRow(row))
    {
        content = (
            <TwoTextInputBox rowType={row.rowType} value1={(row as TwoTextRowData).value1} value2={(row as TwoTextRowData).value2} 
                onChange={(data) => onChange({ newValue: data })} />
        )
    }

    if (isCostRow(row))
    {
        content = (
            <CostInputBox cost={(row as CostRowData).cost} perPerson={(row as CostRowData).perPerson} 
                onChange={(data) => onChange({ newValue: data })} />
        );
    }

    if (isAccomodationCostRow(row))
    {
        content = (
            <AccomodationCostInputBox cost={(row as AccomodationCostRowData).cost} perPerson={(row as AccomodationCostRowData).perPerson} 
                perNight={(row as AccomodationCostRowData).perNight} nights={(row as AccomodationCostRowData).nights} 
                onChange={(data) => onChange({ newValue: data })} />
        )
    }

    if (isDateRow(row))
    {
        content = (
            <DateInputBox rowType={row.rowType} fromDate={(row as DateRowData).fromDate} toDate={(row as DateRowData).toDate} 
                onChange={(data) => onChange({ newValue: data })} />
        );
    }

    if (isTransportRow(row))
    {
        content = (
            <TransportInputBox value={(row as TransportRowData).value} onChange={(data) => onChange({ newValue: data })} />
        )
    }

    return content;
}