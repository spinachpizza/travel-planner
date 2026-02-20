import { useEffect, useRef, useState } from 'react';
import AddNewBox from './Components/AddNewBox.tsx'
import type { BoxData, BoxType } from './Types/BoxData.tsx';
import { defaultLocationRowTypes, defaultTravelRowTypes, validLocationRowTypes, validTravelRowTypes } from './Constants/Constants.tsx';
import './App.css';

import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent, DragOverlay, pointerWithin } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import DownloadButton from './Components/DownloadButton.tsx';
import { FaHouseChimney } from 'react-icons/fa6';
import TrashBin from './Components/TrashBin.tsx';
import SortableBox from './Components/SortableBox.tsx';
import OverviewTab from './Components/OverviewTab.tsx';
import ProfileSelect from './Components/Dropdowns/ProfileSelect.tsx';
import type { TripProfile } from './Types/TripProfile.tsx';
import Box from './Components/Box/Box.tsx';
import { RowTypeValues } from './Enums/RowType.tsx';

export default function TripPlanner() {
    const [profiles, setProfiles] = useState<TripProfile[]>([]);
    const [activeProfileId, setActiveProfileId] = useState<string | null>(null);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const savedProfiles = localStorage.getItem("tripProfiles");
        const savedActiveId = localStorage.getItem("activeProfileId");

        if (savedProfiles) {
            const parsed: TripProfile[] = JSON.parse(savedProfiles);

            const cleanedProfiles = parsed.map(profile => ({
                ...profile,
                boxes: profile.boxes.map(box => ({
                    ...box,
                    rows: box.rows.filter(row =>
                        box.type == "location" 
                            ? row.rowType == RowTypeValues.Location || validLocationRowTypes.includes(row.rowType) 
                            : row.rowType == RowTypeValues.TransportType || validTravelRowTypes.includes(row.rowType)
                    )
                }))
            }))
            
            setProfiles(cleanedProfiles);
            
            if (savedActiveId && cleanedProfiles.some((p: TripProfile) => p.id === savedActiveId))
            {
                setActiveProfileId(savedActiveId);
            } else {
                setActiveProfileId(cleanedProfiles[0]?.id ?? null);
            }
        }
        
        setHasLoaded(true);
    }, []);

    useEffect(() => {
        if (!hasLoaded) return;

        localStorage.setItem("tripProfiles", JSON.stringify(profiles));

        if (activeProfileId) {
            localStorage.setItem("activeProfileId", activeProfileId);
        }
    }, [profiles, activeProfileId, hasLoaded]);

    const activeProfile = profiles.find(p => p.id === activeProfileId);
    const boxes = activeProfile?.boxes ?? [];

    const addBox = (type: BoxType) => {
        if (!activeProfileId) return;

        const newBox: BoxData = {
            id: crypto.randomUUID(),
            type,
            rows: type === "location"
                ? defaultLocationRowTypes
                : defaultTravelRowTypes
        };

        setProfiles(prev =>
        prev.map(p =>
            p.id === activeProfileId
            ? { ...p, boxes: [...p.boxes, newBox] }
            : p
        )
        );
    };

    const updateBox = (updatedBox: BoxData) => {
        if (!activeProfileId) return;

        setProfiles(prev =>
        prev.map(p =>
            p.id === activeProfileId
            ? {
                ...p,
                boxes: p.boxes.map(b =>
                    b.id === updatedBox.id ? updatedBox : b
                )
                }
            : p
        )
        );
    };

    const sensors = useSensors(useSensor(PointerSensor));
    const plannerRef = useRef<HTMLDivElement>(null);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);
        if (!over || !activeProfileId) return;

        if (over.id === "trash") {
            setProfiles(prev =>
                prev.map(p =>
                p.id === activeProfileId
                    ? { ...p, boxes: p.boxes.filter(b => b.id !== active.id) }
                    : p
                )
            );
            return;
        }

        const oldIndex = boxes.findIndex(b => b.id === active.id);
        const newIndex = boxes.findIndex(b => b.id === over.id);

        setProfiles(prev =>
            prev.map(p =>
                p.id === activeProfileId
                ? { ...p, boxes: arrayMove(p.boxes, oldIndex, newIndex) }
                : p
            )
        );
    };

    return (
        <>
            <div className="main-container sunken">
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{width:400}}>
                        <ProfileSelect profiles={profiles} activeProfileId={activeProfileId} setActiveProfileId={setActiveProfileId}
                            setProfiles={setProfiles} />
                    </div>
                    <div style={{ width: 300, height: 120, border: "2px solid #444444", borderRadius: 20, boxShadow: "3px 3px 12px rgba(0, 0, 0, 0.7)", marginBottom: 10 }}>
                        <p style={{ fontSize: 30, fontWeight: "bold", marginTop: 10 }}>Home</p>
                        <FaHouseChimney size={50} style={{ marginTop: -30 }} />
                    </div>
                    <div style={{width:400}} />
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
                                <Box boxData={box} onChange={updateBox} />
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
