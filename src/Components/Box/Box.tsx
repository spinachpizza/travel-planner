import { type RowType } from "../../Enums/RowType";
import type { BoxData } from "../../Types/BoxData";
import type { BoxRowData } from "../../Types/BoxRowData";
import Arrow from "../Arrow";
import AddRowDropdown from "../Dropdowns/AddRowDropdown";
import TransportIcon from "../Icons/TransportIcon";
import BoxRow from "./BoxRow";
import type { TransportType } from "../../Enums/TransportType";
import { CreateRow, isTransportRow, UpdateRowValue } from "./BoxHelpers";
import type { newValueType } from "../../Types/newValueType";
import { validLocationRowTypes, validTravelRowTypes } from "../../Constants/ValidRowTypeConstants";

interface Props {
    boxData: BoxData;
    onChange: (updatedBox: BoxData) => void;
}

export default function Box({boxData, onChange}: Props) {
    const rows = boxData.rows as BoxRowData[];

    const validRowTypes = (boxData.type === "location" ? validLocationRowTypes : validTravelRowTypes)

    const transportRow = rows.find(row => isTransportRow(row));
    const selectedTransportType = transportRow == null ? "Plane" : transportRow.value as TransportType;

    
    const updateRow = (id: string, { newValue }: { newValue: newValueType }) => {
        const updatedRows = UpdateRowValue(rows, id, newValue);
        onChange({ ...boxData, rows: updatedRows });
    };

    const addRow = (rowType: RowType) => {
        const newRow = CreateRow(rowType); 

        const newRows = [...rows, newRow].sort(
            (a, b) => validRowTypes.indexOf(a.rowType) - validRowTypes.indexOf(b.rowType)
        );
        onChange({ ...boxData, rows: newRows });
    };

    const removeRow = (rowType: RowType) => {
        const newRows = rows.filter(row => row.rowType !== rowType);
        onChange({ ...boxData, rows: newRows });
    };
        

    return (
        <div className={boxData.type === "location" ? "location-box" : "travel-box-container"}>

            {boxData.type === "travel" && 
                <>
                    <div style={{width:150, display: "flex", justifyContent: "flex-end"}}>
                        <div style={{ marginRight: 20 }} >
                            <TransportIcon transportType={selectedTransportType} size={75} />
                        </div>
                    </div>
                    <div className="arrow-wrapper">
                        <Arrow />
                    </div>
                </>
            }

            <div className={boxData.type === "location" ? "" : "travel-box"}>
                    {rows.map((row) => (
                        <BoxRow key={row.id} row={row} onChange={(val) => updateRow(row.id, val)} />
                    ))}
    
                <div className="box-row" style={{ height: 40, border: 'none' }}>
                    <div className="box-row-title-container" style={{ minHeight: 40, border: "none" }} />
                    <div style= {{ marginLeft: "auto", marginRight: 10, marginTop: 5 }}>
                        <AddRowDropdown currentRows={rows.map(r => r.rowType)} availableRowTypes={validRowTypes} onAdd={addRow} onRemove={removeRow} />
                    </div>
                </div>
            </div>
        </div>

    )
}