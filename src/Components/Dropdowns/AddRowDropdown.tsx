import { useState, useRef, useEffect } from "react";
import { type RowType } from "../../Enums/RowType";
import { MdEdit } from "react-icons/md";
import Icon from "../Icons/Icon";

import '../../Styles/AddRowDropdown.css'

interface Props {
    availableRowTypes: RowType[]; 
    currentRows: RowType[];
    onAdd: (rowType: RowType) => void; 
    onRemove: (rowType: RowType) => void;
}

export default function AddRowDropdown({ availableRowTypes, currentRows, onAdd, onRemove }: Props) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div>
            <div ref={containerRef} style={{ position: "relative", display: "inline-block", marginTop: 0 }}>
            
                <div className="edit-button-box" onClick={() => setOpen((prev) => !prev)}>
                    <MdEdit size={20} title="Edit Box" />
                </div>

                {open && (
                    <div className="dropdown-main-container">
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <div style={{width: 30}} />
                            <div style={{width:160, height: 40, marginTop: -5 }}> <p className="default-text">Add or Remove rows</p> </div>
                            <div style={{width: 30, marginTop: 6}} />
                        </div>
                        <div className="dropdown-container">
                            {availableRowTypes.length > 0 ? (
                                availableRowTypes.map((rowType) => {
                                    const isAdded = currentRows.includes(rowType);
                                    return (
                                        <div key={rowType} className={`dropdown-row ${isAdded ? "removed" : ""}`} onClick={() => isAdded ? onRemove(rowType) : onAdd(rowType)}>
                                            <div style={{width: 30}}> <Icon rowType={rowType} /> </div>
                                            <div style={{width: 140, paddingTop: 3, marginLeft: 10 }}>{rowType}</div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div style={{ padding: "3px 12px", color: "white" }}>
                                    No more rows to add
                                </div> 
                            )}
                        </div>
                        <div style={{height:15}} />
                    </div>
                )}
          </div>
      </div>
    );
}