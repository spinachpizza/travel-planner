import { useEffect, useRef, useState } from 'react'
import { RowTypeValues } from '../Enums/RowType'
import { TransportTypeValues } from '../Enums/TransportType'
import Icon from './Icons/Icon'
import '../Styles/AddNewBox.css'
import TransportIcon from './Icons/TransportIcon'
import { FaPlus } from 'react-icons/fa6'

type Props = {
    onAdd: (type: "location" | "travel") => void;
};

export default function AddNewBox({ onAdd }: Props) {
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

    const addLocation = () => {
        setOpen(false);
        onAdd("location");
    };

    const addTravel = () => {
        setOpen(false);
        onAdd("travel");
    };
      
    return (
        <>
            {!open &&
                <div className="container">
                    <div className="button" onClick={() => {setOpen(true);}}>
                        <FaPlus size={45} />
                    </div>
                </div>
            }
            {open && 
                <div className="choice-container" ref={containerRef}>
                    <div className="choice-button" onClick={addLocation}>
                        <p>Location Box</p>
                        <Icon rowType={RowTypeValues.Location} size={75} />
                    </div>
                    <div className="choice-button" onClick={addTravel}>
                        <p>Travel Box</p>
                        <TransportIcon transportType={TransportTypeValues.Plane} size={75} />
                    </div>
                </div>
            }
        </>
    )
}