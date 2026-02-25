import { RowTypeValues, type RowType } from "../../Enums/RowType";
import type { BoxData } from "../../Types/BoxData";
import type { BoxRowData, TextRowData } from "../../Types/BoxRowData";
import Arrow from "../Arrow";
import AddRowDropdown from "../Dropdowns/AddRowDropdown";
import TransportIcon from "../Icons/TransportIcon";
import BoxRow from "./BoxRow";
import type { TransportType } from "../../Enums/TransportType";
import { CreateRow, isDateRow, isTextRow, isTransportRow, UpdateRowValue } from "./BoxHelpers";
import type { newValueType } from "../../Types/newValueType";
import { validLocationRowTypes, validTravelRowTypes } from "../../Constants/ValidRowTypeConstants";
import GoToAccomodationBookingButton from "../Buttons/GoToAccomodationBookingButton";

interface Props {
    boxData: BoxData;
    onChange: (updatedBox: BoxData) => void;
    numberOfPeople: number;
}

export default function Box({boxData, onChange, numberOfPeople}: Props) {
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
                    <div style={{width:150, height: "100%", display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
                        <div style={{ marginRight: 20 }} >
                            <TransportIcon transportType={selectedTransportType} size={75} />
                        </div>
                    </div>
                    <div className="arrow-wrapper">
                        <Arrow />
                    </div>
                </>
            }

            {boxData.type === "location" &&
                <>
                    <GoToAccomodationBookingButton
                        location={(rows.find(row => isTextRow(row) && row.rowType == RowTypeValues.Location) as TextRowData).value}
                        dateFrom={rows.find(row => isDateRow(row))?.fromDate}
                        dateTo={rows.find(row => isDateRow(row))?.toDate}
                        numberOfPeople={numberOfPeople} />
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