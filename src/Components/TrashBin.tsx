import { useDroppable } from "@dnd-kit/core";
import { FaTrash } from "react-icons/fa6";

export default function TrashBin({ active }: { active: boolean }) {
  const { setNodeRef, isOver } = useDroppable({
    id: "trash",
  });

  if (!active) return null;

  return (
    <div ref={setNodeRef} style={{ position: "fixed", bottom: 15, right: 15, width: 75, height: 75, borderRadius: "50%",
        backgroundColor: isOver ? "#ff4d4f" : "#333", display: "flex", alignItems: "center", justifyContent: "center",
        color: "white", boxShadow: "0 8px 20px rgba(0,0,0,0.3)", zIndex: 9999, transition: "background-color 0.2s ease", }}>
      <FaTrash size={32} />
    </div>
  );
}