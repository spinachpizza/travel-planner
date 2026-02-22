import { FaLocationDot } from "react-icons/fa6";
import type { BoxData } from "../../Types/BoxData";
import { RowTypeValues } from "../../Enums/RowType";
import type { TextRowData } from "../../Types/BoxRowData";
import TransportIcon from "../Icons/TransportIcon";
import { isTransportRow } from "../Box/BoxHelpers";
import type { TransportType } from "../../Enums/TransportType";

export default function TimeLine({ boxes }: { boxes: BoxData[] })
{
    return (
        <>
            {boxes.map(box => (
                <div key={box.id} style={{ flexShrink: 0, height: 150, maxHeight: 150, width: 75, display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", paddingTop: 50 }}>
                    {box.type == "location" &&
                        <>
                            <FaLocationDot size={20} />
                            <p>{(box.rows.find(row => row.rowType == RowTypeValues.Location) as TextRowData)?.value ?? ""}</p>
                        </>
                    }
                    {box.type == "travel" && 
                        <div style={{ marginTop: 20 }}>
                            <TransportIcon transportType={box.rows.find(row => isTransportRow(row))?.value ?? "Plane" as TransportType} size={24} />
                        </div>
                    }
                </div>
            ))}
        </>
    )
}