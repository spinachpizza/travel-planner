import { useSortable } from "@dnd-kit/sortable";
import type { BoxData } from "../Types/BoxData";
import { HiOutlineBars3 } from "react-icons/hi2";
import { CSS } from "@dnd-kit/utilities";

import '.././Styles/SortableBox.css'
import Box from "./Box/Box";

interface Props {
    box: BoxData;
    onChange: (updatedBox: BoxData) => void;
    activeId: string | null
}

export default function SortableBox({ box, onChange, activeId }: Props) {
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

    const horizontal = box.type === "location" ? 285 : 470; //525 575
    const vertical = box.type === "location" 
        ? 35
        : box.rows.length > 2 
            ? 58 
            : box.rows.length == 1
                ? 112
                : 82;

  	return (
    	<div className="box" ref={setNodeRef} style={style}>
			<HiOutlineBars3 {...attributes} {...listeners} className="drag-icon" style={{ top: vertical, left: horizontal }} title="Drag to reorder" />

            <Box boxData={box} onChange={onChange} />
		</div>
  	);
}