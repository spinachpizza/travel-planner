import { FaBusAlt, FaWalking } from "react-icons/fa";
import { TransportTypeValues, type TransportType } from "../../Enums/TransportType";
import { FaBicycle, FaCarSide, FaPlane, FaSailboat } from "react-icons/fa6";
import { MdOutlineSurfing } from "react-icons/md";
import { GiSurferVan } from "react-icons/gi";

interface Props {
    transportType: TransportType | "";
    size: number;
}

export default function Icon({ transportType, size } : Props) {
    let icon: any;

    switch (transportType) {
        case TransportTypeValues.Boat:
            icon = <FaSailboat size={size} />
            break;
        case TransportTypeValues.Bus:
            icon = <FaBusAlt size={size} />
            break;
        case TransportTypeValues.Car:
            icon = <FaCarSide size={size} />
            break;
        case TransportTypeValues.Cycle:
            icon = <FaBicycle size={size} />
            break;
        case TransportTypeValues.Plane:
            icon = <FaPlane size={size} />
            break;
        case TransportTypeValues.Surf:
            icon = <MdOutlineSurfing size={size} />
            break;
        case TransportTypeValues.Van:
            icon = <GiSurferVan size={size} />
            break;
        case TransportTypeValues.Walk:
            icon = <FaWalking size={size} />
            break;
        default:
            icon = <></>
    }

    return <div className="icon">{icon}</div>;
}