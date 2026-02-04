import { useEffect, useRef, useState } from "react";
import type { BoxData } from "./TravelStepBox";
import ConfirmDialog from "./ConfirmDeletionDialog";
import { FaTrash } from "react-icons/fa6";

export type TripProfile = {
  id: string;
  name: string;
  boxes: BoxData[];
};

type Props = {
  profiles: TripProfile[];
  activeProfileId: string | null;
  setActiveProfileId: (id: string) => void;
  setProfiles: React.Dispatch<React.SetStateAction<TripProfile[]>>;
};

export default function ProfileSelect({ profiles, activeProfileId, setActiveProfileId, setProfiles }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [newName, setNewName] = useState("");
    const [hoveredProfileId, setHoveredProfileId] = useState<string | null>(null);
    const [deleteProfileId, setDeleteProfileId] = useState<string | null>(null);

    const activeProfile = profiles.find(p => p.id === activeProfileId);

    const handleCreate = () => {
        if (!newName.trim()) return;

        const profile: TripProfile = {
        id: crypto.randomUUID(),
        name: newName.trim(),
        boxes: []
        };

        setProfiles(prev => [...prev, profile]);
        setActiveProfileId(profile.id);
        setNewName("");
        setIsCreating(false);
        setIsOpen(false);
    };

    const containerRef = useRef<HTMLDivElement>(null);
    
        useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
            containerRef.current &&
            !containerRef.current.contains(event.target as Node)
            ) {
            setIsOpen(false);
            }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
        }, []);

    const handleDelete = (id: string) => {
        setDeleteProfileId(id); 
    };

    // Confirm deletion
    const confirmDelete = () => {
        if (deleteProfileId) {
            setProfiles(prev => prev.filter(p => p.id !== deleteProfileId));
            if (activeProfileId === deleteProfileId) setActiveProfileId("");
            setDeleteProfileId(null);
        }
    };

    return (
        <div ref={containerRef} style={{ position: "relative", width: 210, marginLeft: 30, marginTop: -20 }}>
            <div onClick={() => { setIsOpen(o => !o); setIsCreating(false); setNewName(""); }} style={{ height: 32, padding: "0 10px",
                border: "1px solid grey", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "space-between",
                cursor: "pointer", background: "#1a1a1a"}}>
                <span>{activeProfile?.name ?? "Select trip"}</span>
                <span style={{ fontSize: 12 }}>▾</span>
            </div>

            {isOpen && (
                <div style={{ position: "absolute", top: 36, width: "100%", background: "#1a1a1a", border: "1px solid grey",
                    borderRadius: 6, zIndex: 100, overflow: "hidden"}}>
                    {profiles.map(profile => (
                        <div key={profile.id} 
                            onClick={() => {
                                setActiveProfileId(profile.id);
                                setIsOpen(false);
                                setIsCreating(false);
                                setNewName("");
                            }} 
                            onMouseEnter={() => setHoveredProfileId(profile.id)}
                            onMouseLeave={() => setHoveredProfileId(null)}
                            style={{
                                position: "relative",
                                padding: "8px 30px 8px 10px",
                                paddingLeft: 30,
                                cursor: "pointer",
                                textAlign: "start",
                                background: hoveredProfileId === profile.id 
                                    ? "#333"
                                    : profile.id === activeProfileId
                                        ? "#282828"
                                        : "transparent"
                            }}
                        >
                            {profile.name}

                            {/* Delete button */}
                            {hoveredProfileId === profile.id && (
                                <span onClick={e => { e.stopPropagation(); handleDelete(profile.id); }}
                                    style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", color: "coral",
                                        fontWeight: "bold", cursor: "pointer" }}>
                                    <FaTrash size={15} style={{marginRight: 2}} />
                                </span>
                            )}
                        </div>
                ))}

                <ConfirmDialog isOpen={!!deleteProfileId} message="Are you sure you want to delete this trip?"
                    onConfirm={confirmDelete} onCancel={() => setDeleteProfileId(null)} />

                <div style={{ borderTop: "1px solid grey" }} />

                {!isCreating ? (
                    <div onClick={() => setIsCreating(true)} style={{ textAlign: "start", padding: "8px 10px", paddingLeft: "30px", cursor: "pointer", color: "lightblue"}}
                        onMouseEnter={e => (e.currentTarget.style.background = "#333")}
                        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    >
                        Add New trip
                    </div>
                ) : (
                    <div style={{ display: "flex", padding: 8, gap: 8, backgroundColor: "#1a1a1a" }}>
                        <input style={{ width: 150, padding: 5, borderRadius: 4, border: "1px solid grey", backgroundColor: "#242424", fontFamily: "Arial, sans-serif", fontSize: 15 }} 
                            placeholder="Trip name" value={newName} onChange={e => setNewName(e.target.value)} />
                        <button style={{ padding: "4px 8px", borderRadius: 4, border: "none", background: "lightblue", cursor: "pointer"}} onClick={handleCreate}>
                            ✓
                        </button>
                    </div>
                )}
                </div>
            )}
        </div>
    );
}

