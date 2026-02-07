import Arrow from "../Arrow";
import { RowTypeValues, type RowType } from "../../Enums/RowType";
import AddRowDropdown from "../Dropdowns/AddRowDropdown";
import type { BoxRowData } from "../Box/BoxRow";
import { validTravelRowTypes as validRowTypes } from "../../Constants/Constants";
import BoxRow from "../Box/BoxRow";
import '../../Styles/Box.css'
import type { TransportType } from "../../Enums/TransportType";
import TransportIcon from "../Icons/TransportIcon";
import type { BoxData } from "../../Types/BoxData";

interface Props {
    boxData: BoxData;
  onChange: (updatedBox: BoxData) => void;
}

export default function TravelBox({boxData, onChange}: Props) {
    const rows = boxData.rows;

    const transportRow = rows.find(row => row.rowType === RowTypeValues.TransportType);
    const selectedTransportType = (transportRow?.value || "Plane") as TransportType | "";
    
    const updateRow = (id: string, newValue: string) => {
        const updatedRows = rows.map(row =>
        row.id === id ? { ...row, value: newValue } : row
        );
        onChange({ ...boxData, rows: updatedRows });
    };

    const addRow = (rowType: RowType) => {
        const newRow: BoxRowData = { id: crypto.randomUUID(), rowType, value: "" };
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
        <div className="travel-box-container">
            <div style={{width:150, display: "flex", justifyContent: "flex-end"}}>
                <div style={{ marginRight: 20 }} >
                    <TransportIcon transportType={selectedTransportType} size={75} />
                </div>
            </div>
            <div className="arrow-wrapper">
                <Arrow />
            </div>   
            <div className="travel-box">
                <div style={{width:450, height: 40, borderBottom: "2px solid grey"}} />
                {rows.map((row) => (
                    <BoxRow key={row.id} rowType={row.rowType} value={row.value} onChange={(val) => updateRow(row.id, val)} />
                ))}
    
                <div className="box-row" style={{ height: 40, border: 'none' }}>
                    <div className="box-row-title" style={{ minHeight: 40, border: "none" }} />
                    <div style= {{ marginLeft: "auto", marginRight: 10, marginTop: 5 }}>
                        <AddRowDropdown currentRows={rows.map(r => r.rowType)} availableRowTypes={validRowTypes} onAdd={addRow} onRemove={removeRow} />
                    </div>
                </div>
            </div>
        </div>
    )
}