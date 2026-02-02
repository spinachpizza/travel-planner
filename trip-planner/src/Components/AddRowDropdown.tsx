import { useState, useRef, useEffect } from "react";
import { type RowType } from "../Enums/RowType";
import { MdEdit } from "react-icons/md";
import Icon from "./Icon";

import './LocationBox/LocationBox.css'

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
    <div className="edit-button-box">
      <div ref={containerRef} style={{ position: "relative", display: "inline-block", marginTop: 6 }}>
        <MdEdit size={20} style={{ cursor: "pointer" }} onClick={() => setOpen((prev) => !prev)} title="Edit Box" />
        
        {open && (
          <div style={{ position: "absolute", top: "30px", backgroundColor: "#1a1a1a", border: "1px solid #ccc", marginTop: -5,
              marginLeft: -200, borderRadius: 15, boxShadow: "0px 2px 6px rgba(0,0,0,0.15)", zIndex: 100, minWidth: 220 }}>
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
                                  <div style={{width: 140, paddingTop: 3, marginLeft: 20 }}>{rowType}</div>
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