import { useEffect, useRef, useState } from "react";
import ConfirmDialog from "../ConfirmDeletionDialog";
import { FaTrash } from "react-icons/fa6";
import { MdAdd, MdEdit } from "react-icons/md";

import '../../Styles/ProfileSelect.css'
import type { TripProfile } from "../../Types/TripProfile";

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

    const [editingProfileId, setEditingProfileId] = useState<string | null>(null);
    const [editName, setEditName] = useState("");

    const activeProfile = profiles.find(p => p.id === activeProfileId);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                closeWindow();
            }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (profiles.length === 0) {
            const defaultProfile = createDefaultProfile();
            setProfiles([defaultProfile]);
            setActiveProfileId(defaultProfile.id);
            return;
        }
    }, [profiles, activeProfileId, setProfiles, setActiveProfileId]);

    const startCreating = () => {
        closeAll();

        setNewName("");
        setIsCreating(true);
    }

    const handleCreate = () => {
        const trimmedName = newName.trim();

        if (!trimmedName) return;
        if (!validateNewName(profiles, trimmedName)) return;

        const profile: TripProfile = {
        id: crypto.randomUUID(),
        name: trimmedName,
        boxes: []
        };

        setProfiles(prev => [...prev, profile]);
        setActiveProfileId(profile.id);
        setNewName("");
        setIsCreating(false);
        setIsOpen(false);
    };
    
    const startEditing = (profile: TripProfile) => {
        closeAll();
        
        setEditingProfileId(profile.id);
        setEditName(profile.name);
    };

    const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, profileId: string) => {
        if (e.key === "Enter") {
            e.preventDefault();
            saveEdit(profileId);
        }

        if (e.key === "Escape") {
            closeAll();
        }
    };
    
    const saveEdit = (id: string) => {
        const trimmedName = editName.trim();
        
        if (!trimmedName) return; 
        if (!validateNewName(profiles, trimmedName, editingProfileId ?? "" )) return;
        
        setProfiles(prev =>
            prev.map(p =>
                p.id === id ? { ...p, name: trimmedName } : p
            )
        );
        
        setEditingProfileId(null);
        setEditName("");
    };
    
    const handleDelete = (id: string) => {
        setDeleteProfileId(id); 
    };
    
    const confirmDelete = () => {
        if (deleteProfileId) {
            setProfiles(prev => prev.filter(p => p.id !== deleteProfileId));
            if (activeProfileId === deleteProfileId) {
                setActiveProfileId(profiles[0].id);
                setDeleteProfileId(null);
            }
        }
        
        closeWindow();
    };

    const openDropdown = (id: string) => {
        setActiveProfileId(id);
        setIsOpen(false);
        setIsCreating(false);
        setNewName("");
    }
    
    const closeWindow = () => {
        setIsOpen(false);
        closeAll();
    }
    
    const closeAll = () => {
        setIsCreating(false);
        setNewName("");
        setEditingProfileId("");
        setEditName("");
    }

    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="profile-select-main-container">
            <div onClick={() => { setIsOpen(o => !o); closeAll(); }} className="profile-select-display-container">
                <span style={{ paddingLeft: 5 }}>{activeProfile?.name}</span>
                <span style={{ fontSize: 18 }}>▾</span>
            </div>

            {isOpen && (
                <div className="profile-select-dropdown-container">

                    {profiles.map(profile => (
                        <div key={profile.id} onClick={() => {openDropdown(profile.id)}}  className="profile-select-row-container"
                            onMouseEnter={() => setHoveredProfileId(profile.id)} onMouseLeave={() => setHoveredProfileId(null)}
                            style={{ background: hoveredProfileId === profile.id && profile.id != editingProfileId ? "#333" : profile.id === activeProfileId ? "#282828" : "transparent"}}>
                            
                            {editingProfileId === profile.id ? (
                                <input value={editName} onChange={e => setEditName(e.target.value)} autoFocus
                                    onClick={e => e.stopPropagation()} className="profile-select-edit-box"
                                    onKeyDown={(e => handleEditKeyDown(e, profile.id))}/>
                                ) : (
                                profile.name
                            )}

                            {hoveredProfileId === profile.id && editingProfileId !== profile.id && (
                                <span className="profile-select-edit-button" onClick={e => {e.stopPropagation(); startEditing(profile);}}>
                                    <MdEdit size={20} style={{ marginTop: 5 }} />
                                </span>
                            )}

                            {editingProfileId === profile.id && (
                            <>
                                <div className="profile-select-delete-button" onClick={e => {e.stopPropagation(); handleDelete(profile.id);}}>
                                    <FaTrash size={15} />
                                </div>
                            </>
                            )}
                        </div>
                ))}

                <ConfirmDialog isOpen={!!deleteProfileId} message="Are you sure you want to delete this trip?"
                    onConfirm={confirmDelete} onCancel={() => setDeleteProfileId(null)} />

                <div style={{ borderTop: "1px solid grey" }} />

                {!isCreating ? (
                    <div onClick={startCreating} className="profile-select-add-button" onMouseEnter={e => (e.currentTarget.style.background = "#333")}
                        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                        Add New trip
                    </div>
                ) : (
                    <div style={{ display: "flex", padding: 8, gap: 8, backgroundColor: "#1a1a1a" }}>
                        <input className="profile-select-add-box" placeholder="Trip name" value={newName} onChange={e => setNewName(e.target.value)} />
                        <div className="profile-select-add-confirm-button" onClick={handleCreate}>
                            <MdAdd size={24} />
                        </div>
                    </div>
                )}
                </div>
            )}
        </div>
    );
}

const createDefaultProfile = (): TripProfile => ({
    id: "default",
    name: "My Trip",
    boxes: []
});

const validateNewName = (profiles: TripProfile[], name: string, currentId: string = "") => {
    const normalized = name.trim().toLowerCase();

    return !profiles.some(p => 
        p.id !== currentId && 
        p.name.trim().toLowerCase() === normalized);
}

