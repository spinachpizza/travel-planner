import { useEffect, useState } from 'react';
import AddNewBox from './Components/AddNewBox.tsx'
import LocationBox from './Components/LocationBox/LocationBox.tsx'
import TravelBox from './Components/TravelBox/TravelBox.tsx'
import type { BoxData, BoxType } from './Components/TravelStepBox.tsx';
import { defaultLocationRowTypes, defaultTravelRowTypes } from './Constants/Constants.tsx';
import './App.css';

export default function TripPlanner() {
    const [boxes, setBoxes] = useState<BoxData[]>(() => {
        const saved = localStorage.getItem("tripBoxes");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        const saved = localStorage.getItem("tripBoxes");
        if (saved) {
            setBoxes(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("tripBoxes", JSON.stringify(boxes));
    }, [boxes]);

    const addBox = (type: BoxType) => {
        const newBox: BoxData = {
            id: crypto.randomUUID(),
            type,
            rows: type == "location" ? defaultLocationRowTypes : defaultTravelRowTypes
        };
        setBoxes(prev => [...prev, newBox]);
    };

    const updateBox = (updatedBox: BoxData) => {
        setBoxes(prev =>
            prev.map(box => box.id === updatedBox.id ? updatedBox : box)
        );
    };

    return (
        <>
            <div style={{display:"flex", flexDirection: "column", alignItems: "center", marginBottom: 500, width: "100%", overflowY: "auto" }}>
                {boxes.map(box =>
                box.type === "location"
                    ? <LocationBox key={box.id} boxData={box} onChange={updateBox} />
                    : <TravelBox key={box.id} boxData={box} onChange={updateBox} />
                )}
                <AddNewBox onAdd={addBox} />
            </div>
        </>
    )
}