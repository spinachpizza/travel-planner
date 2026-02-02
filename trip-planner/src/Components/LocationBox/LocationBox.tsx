import './LocationBox.css'

import BoxRow from '../BoxRow'
import { type RowType } from '../../Enums/RowType'
import AddRowDropdown from "../AddRowDropdown";
import { costRowTypes, validLocationRowTypes as validRowTypes } from "../../Constants/Constants";
import type { BoxData } from "../TravelStepBox";

interface Props {
    boxData: BoxData;
    onChange: (updatedBox: BoxData) => void
}

export default function LocationBox({ boxData, onChange}: Props) {

    const rows = boxData.rows;

    const updateRow = (id: string, newValue: string) => {
        const updatedRows = rows.map(row => row.id === id ? { ...row, value: newValue } : row);
        onChange({ ...boxData, rows: updatedRows });
    };

    const addRow = (rowType: RowType) => {
        const newRows = [
            ...rows,
            { id: crypto.randomUUID(), rowType, value: "" }
        ];

        newRows.sort((a, b) => validRowTypes.indexOf(a.rowType) - validRowTypes.indexOf(b.rowType));

        onChange({ ...boxData, rows: newRows });
    };

    const removeRow = (rowType: RowType) => {
        const newRows = rows.filter(row => row.rowType !== rowType);
        onChange({ ...boxData, rows: newRows });
    };
    
    const totalCost : number = rows
        .filter(row => costRowTypes.includes(row.rowType))
        .reduce((sum, row) => sum + Number(row.value || 0), 0);

    return (
        <div className="location-box">
            <div style={{width:450, height: 40, borderBottom: "1px solid grey"}} />
            {rows.map((row) => (
                <BoxRow key={row.id} rowType={row.rowType} value={row.value} onChange={(val) => updateRow(row.id, val)} />
            ))}

            <div className="box-row" style={{ height: 40, border: 'none' }}>
                <div className="box-row-title" style={{ minHeight: 40 }}>
                    <p>Total Cost</p>
                </div>
                <p className="default-text" style={{marginLeft: 20}}>£ {totalCost}</p>
                <div style= {{ marginLeft: "auto", marginRight: 10, marginTop: 5 }}>
                    <AddRowDropdown currentRows={rows.map(r => r.rowType)} availableRowTypes={validRowTypes} onAdd={addRow} onRemove={removeRow} />
                </div>
            </div>
        </div>
    )
}