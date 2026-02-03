import { useEffect, useRef, useState } from 'react';
import AddNewBox from './Components/AddNewBox.tsx'
import LocationBox from './Components/LocationBox/LocationBox.tsx'
import TravelBox from './Components/TravelBox/TravelBox.tsx'
import type { BoxData, BoxType } from './Components/TravelStepBox.tsx';
import { defaultLocationRowTypes, defaultTravelRowTypes } from './Constants/Constants.tsx';
import './App.css';

import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent, DragOverlay, pointerWithin } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import DownloadButton from './Components/DownloadButton.tsx';
import { FaHouseChimney } from 'react-icons/fa6';
import TrashBin from './Components/TrashBin.tsx';
import SortableBox from './Components/SortableBox.tsx';
import OverviewTab from './Components/OverviewTab.tsx';

export default function TripPlanner() {
    const [boxes, setBoxes] = useState<BoxData[]>(() => {
        const saved = localStorage.getItem("tripBoxes");
        return saved ? JSON.parse(saved) : [];
    });

    const [activeId, setActiveId] = useState<string | null>(null);

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

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        console.log("ACTIVE:", active.id);
        console.log("OVER:", over?.id);
        setActiveId(null);

        if (!over) return;

        if (over.id === "trash") {
            setBoxes(prev => prev.filter(b => b.id !== active.id));
            return;
        }

        if (active.id === over.id) return;
        const oldIndex = boxes.findIndex(b => b.id === active.id);
        const newIndex = boxes.findIndex(b => b.id === over.id);

        setBoxes(prev => arrayMove(prev, oldIndex, newIndex));
    };

    const plannerRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <div className="main-container sunken">
                <div style={{ width: 300, height: 200, border: "2px solid grey", borderRadius: 20}}>
                    <p style={{ fontSize: 50, fontWeight: "bold", marginTop: 20 }}>Home</p>
                    <FaHouseChimney size={75} style={{marginTop: -80}} />
                </div>
                <DndContext sensors={sensors} collisionDetection={pointerWithin} onDragStart={(event) => setActiveId(event.active.id as string)}
                    onDragEnd={handleDragEnd} onDragCancel={() => setActiveId(null)} >
                    <SortableContext items={boxes.map(b => b.id)} strategy={verticalListSortingStrategy}>
                        <div className="main-container" ref={plannerRef}>
                        {boxes.map(box => (
                            <SortableBox key={box.id} box={box} onChange={updateBox} activeId={activeId} />
                        ))}
                        </div>
                        <AddNewBox onAdd={addBox} />
                    </SortableContext>

                    <DragOverlay>
                        {activeId ? (() => {
                            const box = boxes.find(b => b.id === activeId);
                            if (!box) return null;
                            return (
                            <div style={{ display: "flex", justifyContent: "center", width: 1000, background: "none", padding: 8, borderRadius: 8,         
                                opacity: 0.9, pointerEvents: "none" }}>
                                {box.type === "location" ? (
                                    <LocationBox boxData={box} onChange={updateBox} />
                                ) : (
                                    <TravelBox boxData={box} onChange={updateBox} />
                                )}
                            </div>
                            );
                        })() : null}
                    </DragOverlay>
                    <TrashBin active={!!activeId} />
                </DndContext>
                <OverviewTab boxes={boxes} />
            </div>
            <DownloadButton captureRef={plannerRef} />
        </>
    )
}
