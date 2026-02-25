import { useState } from "react";
import '../../App.css'
import '../../Styles/OverviewTab.css'
import type { BoxData } from "../../Types/BoxData";
import TitleAndContent from "../TitleAndContent";
import { HiOutlineBars2 } from "react-icons/hi2";
import TimeLine from "./TripTimeline";
import { DateFrom, DateTo, TotalCost, TripLength } from "./OverviewTabHelpers";

interface Props {
    boxes: BoxData[];
    numberOfPeople: number;
    onChange: (newValue: number) => void;
}

export default function OverviewTab({ boxes, numberOfPeople, onChange }: Props) {
    const [open, setOpen] = useState(false);

    const totalCost = TotalCost({ boxes, totalPeople: numberOfPeople });

    const totalLength = TripLength({ boxes }) ?? "0 days";

    const dateFrom = DateFrom({ boxes }) ?? "";
    const dateTo = DateTo({ boxes }) ?? "";

    const numberOfPeopleOptions = [1,2,3,4,5,6,7,8,9,10];
    
    return (
        <>
            <div className={`overview-wrapper ${open ? "" : "closed"}`} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                
                <div className={`overview-tab ${open ? "open" : ""}`}>
                    <HiOutlineBars2 style={{marginBottom: 12, color: "white" }} />
                </div>

                <div className={`overview-container ${open ? "open" : ""}`}>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "2px solid #242424", marginBottom: 15, height: 60 }}>
                        <p className="larger-text">Trip Overview</p>
                    </div>

                    <div style={{display: "flex", flexDirection: "row", padding: 10, alignItems: "center", marginTop: 50, marginBottom: 80}}>
                        <div className="overview-tab-info-container">
                            <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                                <TitleAndContent title={"Number of People: "} content="" />
                                <select style={{ width: 50, height: 25, paddingLeft: 5 }} value={numberOfPeople} onChange={(e) => onChange(Number(e.target.value))} >
                                    {numberOfPeopleOptions.map((number) => (
                                        <option key={number} value={number}>
                                            {number}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <TitleAndContent title={"Trip Length: "} content={totalLength} />
                            <TitleAndContent title={"Date From: "} content={dateFrom} />
                        </div>
                        <div className="overview-tab-info-container">
                            <TitleAndContent title={"Total Cost: "} content={"£ " + totalCost.toString()} />
                            <TitleAndContent title={"Cost Per Person: "} content={"£ " + ((totalCost / numberOfPeople).toFixed(2)).toString()} />
                            <TitleAndContent title={"Date To: "} content={dateTo} />
                        </div>
                    </div>

                    <div className="timeline-container">
                        <TimeLine boxes={boxes} />
                    </div>

                </div>
                
            </div>
            <div className={open ? "overview-tab-background" : ""} />
        </>
    )
}