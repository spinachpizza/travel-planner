import '../../Styles/Box.css'
import type { BoxRowData, CostRowData, DateRowData, TextRowData, TransportRowData, TwoTextRowData } from '../../Types/BoxRowData';
import type { JSX } from 'react';
import CostInputBox from '../InputBox/CostInputBox';
import { isCostRow, isDateRow, isTextRow, isTransportRow, isTwoTextRow } from './BoxHelpers';
import DateInputBox from '../InputBox/DateInputBox';
import TransportInputBox from '../InputBox/TransportInputBox';
import Icon from '../Icons/Icon';
import TransportIcon from '../Icons/TransportIcon';
import TextInputBox from '../InputBox/TextInputBox';
import TwoTextInputBox from '../InputBox/TwoTextInputBox';
import { RowTypeValues } from '../../Enums/RowType';

interface Props {
    row: BoxRowData;
    onChange: (newValue: string | number | { value1: string; value2: string } | { fromDate: string; toDate: string } | { cost: string; perPerson: boolean }) => void;
}

export default function BoxRow({ row, onChange }: { row: BoxRowData; onChange: Props["onChange"] }) {

    if (row.rowType === RowTypeValues.Location)
    {
        return (
            <>
                <div className="box-row" style={{ justifyContent: "center" }}>
                    <InputBox row={row} onChange={onChange} />
                </div>
            </>
        )
    }

    if (row.rowType === RowTypeValues.TransportType)
    {
        return (
            <>
                <div className="box-row" style={{ justifyContent: "center" }}>
                    <InputBox row={row} onChange={onChange} />
                </div>
            </>
        )
    }



    return (
        <div className="box-row">
            <div className="box-row-title-container">
                <div className="box-row-title">
                    <div style={{ width: 5 }} />
                    <div style={{ width: 30, marginTop: 3 }}>
                        {isTransportRow(row.rowType) &&
                            <TransportIcon transportType={(row as TransportRowData).value} size={20} />
                        }
                        <Icon rowType={row.rowType} />
                    </div>
                    <div style={{ width: 115 }}>
                        <p>{row.rowType}</p>
                    </div>
                </div>
            </div>

            <InputBox row={row} onChange={onChange} />
        </div>
    )
}

export function InputBox({ row, onChange }: { row: BoxRowData; onChange: Props["onChange"] }) {

    let value: string | number = "";
    if ("value" in row) value = row.value;
    else if ("cost" in row) value = row.cost;
    else if ("fromDate" in row) value = `${row.fromDate} - ${row.toDate}`;

    let content: JSX.Element;

    content = <div style={{marginLeft: 20}}>Error</div>

    if (isTextRow(row.rowType))
    {
        content = (
            <TextInputBox textSize={"S"} value={(row as TextRowData).value} rowType={row.rowType} onChange={(data) => onChange(data)} />
        )
    }

    if (isTwoTextRow(row.rowType))
    {
        content = (
            <TwoTextInputBox rowType={row.rowType} value1={(row as TwoTextRowData).value1} value2={(row as TwoTextRowData).value2} onChange={(data) => onChange(data)} />
        )
    }

    if (isCostRow(row.rowType))
    {
        content = (
            <CostInputBox cost={(row as CostRowData).cost} perPerson={(row as CostRowData).perPerson} onChange={(data) => onChange(data)} />
        );
    }

    if (isDateRow(row.rowType))
    {
        content = (
            <DateInputBox rowType={row.rowType} fromDate={(row as DateRowData).fromDate} toDate={(row as DateRowData).toDate} onChange={(data) => onChange(data)} />
        );
    }

    if (isTransportRow(row.rowType))
    {
        content = (
            <TransportInputBox value={value as string} onChange={(data) => onChange(data)} />
        )
    }

    return content;
}