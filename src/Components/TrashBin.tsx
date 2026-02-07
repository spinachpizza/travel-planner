import { useDroppable } from "@dnd-kit/core";
import { FaTrash } from "react-icons/fa6";

import '.././Styles/TrashBin.css'

interface Props {
    active: boolean
}

export default function TrashBin({ active }: Props) {
    const { setNodeRef, isOver } = useDroppable({
        id: "trash",
    });

    if (!active) return null;

    return (
        <div ref={setNodeRef} className="trashbin-container" style= {{ backgroundColor: isOver ? "#ff4d4f" : "#333" }}>
            <FaTrash size={32} />
        </div>
    );
}