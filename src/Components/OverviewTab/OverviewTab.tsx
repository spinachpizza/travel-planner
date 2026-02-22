import { useState } from "react";
import '../../App.css'
import type { BoxData } from "../../Types/BoxData";
import TitleAndContent from "../TitleAndContent";
import { HiOutlineBars2 } from "react-icons/hi2";
import TimeLine from "./TripTimeline";
import { DateFrom, DateTo, TotalCost, TripLength } from "./OverviewTabHelpers";

interface Props {
    boxes: BoxData[];
}

export default function OverviewTab({ boxes }: Props) {
    const [open, setOpen] = useState(false);
    const [numberOfPeople, setNumberOfPeople] = useState(1);

    const totalCost = TotalCost({ boxes, totalPeople: numberOfPeople });

    const totalLength = TripLength({ boxes }) ?? "0 days";

    const dateFrom = DateFrom({ boxes }) ?? "";
    const dateTo = DateTo({ boxes }) ?? "";

    const numberOfPeopleOptions = [1,2,3,4,5,6,7,8,9,10];
    
    return (
        <div className={`overview-wrapper ${open ? "" : "closed"}`} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            
            <div className={`overview-tab ${open ? "open" : ""}`}>
                <HiOutlineBars2 style={{marginBottom: 12, color: "white" }} />
            </div>

            <div className={`overview-container ${open ? "open" : ""}`}>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid grey", marginBottom: 15, height: 60 }}>
                    <p className="larger-text">Trip Overview</p>
                </div>

                <div style={{display: "flex", flexDirection: "row", padding: 10, alignItems: "center" }} >
                    <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", padding: 15,
                    width: 190, height: 50, marginTop: -10,
                    }}>
                        <TitleAndContent title={"Total Cost: "} content={"£ " + totalCost.toString()} />
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

                <div style={{display: "flex", flexDirection: "row", padding: 10, alignItems: "center" }} >
                    <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", padding: 15,
                    width: 190, height: 50, marginTop: -10,
                    }}>
                        <TitleAndContent title={"Cost Per Person: "} content={"£ " + ((totalCost / numberOfPeople).toFixed(2)).toString()} />
                    </div>
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: 15,
                    width: 190, height: 50, marginTop: -10,
                    }}>
                        <TitleAndContent title={"Number of People: "} content="" />
                        <select style={{ width: 50, height: 25, paddingLeft: 5 }} value={numberOfPeople} onChange={(e) => setNumberOfPeople(Number(e.target.value))} >
                            {numberOfPeopleOptions.map((number) => (
                                <option key={number} value={number}>
                                    {number}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

            </div>
            
        </div>
    )
}