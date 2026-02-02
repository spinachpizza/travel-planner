import { useSortable } from "@dnd-kit/sortable";
import type { BoxData } from "./TravelStepBox";
import { HiOutlineBars3 } from "react-icons/hi2";
import LocationBox from "./LocationBox/LocationBox";
import TravelBox from "./TravelBox/TravelBox";
import { CSS } from "@dnd-kit/utilities";

export default function SortableBox({ box, onChange, activeId }: { box: BoxData; onChange: (updatedBox: BoxData) => void; activeId: string | null }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: box.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: 10,
    width: 1000,
    position: "relative" as "relative",
    opacity: box.id === activeId ? 0 : 1,
  };

  const horizontal = box.type === "location" ? 285 : 545;
  const vertical = box.type === "location" ? 32 : 58;

  return (
    <div className="box" ref={setNodeRef} style={style}>
      <HiOutlineBars3 {...attributes} {...listeners} style={{ cursor: "grab", position: "absolute", top: vertical,
          left: horizontal, fontSize: 30, color: "#888" }} title="Drag to reorder" />

      {box.type === "location" ? (
        <LocationBox boxData={box} onChange={onChange} />
      ) : (
        <TravelBox boxData={box} onChange={onChange} />
      )}
    </div>
  );
}