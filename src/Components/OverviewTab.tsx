import { useState } from "react";
import '../app.css'
import type { BoxData } from "./TravelStepBox";
import { costRowTypes } from "../Constants/Constants";
import TitleAndContent from "./TitleAndContent";
import { RowTypeValues } from "../Enums/RowType";
import { FaLocationDot } from "react-icons/fa6";
import TransportIcon from "./TravelBox/TransportIcon";
import type { TransportType } from "../Enums/TransportType";

interface Props {
    boxes: BoxData[];
}
export default function OverviewTab({ boxes }: Props) {
    const [open, setOpen] = useState(false);

    const totalCost = TotalCost({ boxes });

    const totalLength = TripLength({ boxes }) ?? "";

    const dateFrom = DateFrom({ boxes }) ?? "";
    const dateTo = DateTo({ boxes }) ?? "";
    
    return (
        <div className={`overview-wrapper ${open ? "" : "closed"}`} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <div className={`overview-tab ${open ? "open" : ""}`} />

            <div className={`overview-container ${open ? "open" : ""}`}>
                <p className="larger-text">Trip Overview</p>
                <div style={{display: "flex", flexDirection: "row", padding: 10, alignItems: "center" }} >
                    <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", padding: 15,
                    width: 190, height: 50, marginTop: -10,
                    }}>
                        <TitleAndContent title={"Total Cost: "} content={totalCost} />
                        <TitleAndContent title={"Date From: "} content={dateFrom} />
                    </div>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", padding: 15,
                        width: 190, height: 50, marginTop: -10,
                    }}>
                        <TitleAndContent title={"Trip Length: "} content={totalLength} />
                        <TitleAndContent title={"Date To: "} content={dateTo} />
                    </div>
                </div>
                <div className="timeline-container">
                    <TimeLine boxes={boxes} />
                </div>
            </div>
        </div>
    )
}

function TimeLine({ boxes }: Props)
{
    return (
        <>
            {boxes.map(box => (
                <div key={box.id} style={{ flexShrink: 0, height: 150, maxHeight: 150, width: 75, display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", paddingTop: 50 }}>
                    {box.type == "location" &&
                        <>
                            <FaLocationDot size={20} />
                            <p>{box.rows.find(row => row.rowType == RowTypeValues.Location)?.value ?? ""}</p>
                        </>
                    }
                    {box.type == "travel" && 
                        <div style={{ marginTop: 20 }}>
                            <TransportIcon transportType={box.rows.find(row => row.rowType == RowTypeValues.TransportType)!.value as TransportType} size={24} />
                        </div>
                    }
                </div>
            ))}
        </>
    )
}

function TotalCost({ boxes }: Props) {

    const rows = boxes.flatMap(box => box.rows)

    const totalCost = rows
        .filter(row => costRowTypes.includes(row.rowType))
        .reduce((sum, row) => { 
            const n = Number(row.value); 
            return isNaN(n) ? sum : sum + n; 
        }, 0);
    
    return "£ " + totalCost.toString();
}

function DateFrom({ boxes }: Props) {

    const firstDateFrom = boxes
        .flatMap(box => box.rows)
        .find(row => row.rowType == RowTypeValues.DateFrom)

    if (!firstDateFrom) { 
        return null; 
    } 
    
    return firstDateFrom.value;
}

function DateTo({ boxes }: Props) {

    const lastDateTo = [...boxes]
        .reverse()
        .flatMap(box => box.rows)
        .find(row => row.rowType == RowTypeValues.DateTo)

    if (!lastDateTo) { 
        return null; 
    } 
    
    return lastDateTo.value;
}

function TripLength({ boxes }: Props) {

    const dateFrom = DateFrom({boxes});
    const dateTo = DateTo({boxes});

    if (!dateFrom || !dateTo)
    {
        return null;
    }

    const fromDate = parseDate(dateFrom);
    const toDate = parseDate(dateTo);

    if (!fromDate || !toDate)
    {
        return null;
    }

    const days = (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24);
    return days.toString() + " days";
}

function parseDate(value: string | null | undefined): Date | null { 
    if (!value) {
        return null; 
    }
    
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
}