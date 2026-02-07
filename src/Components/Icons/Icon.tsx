import { RowTypeValues, type RowType } from "../../Enums/RowType";

import { FaHouseChimney, FaLocationDot, FaRegAddressBook, FaTicket } from "react-icons/fa6";
import { GiKnifeFork } from "react-icons/gi";
import { FaCalendarAlt } from "react-icons/fa";
import { MdAirlineSeatReclineNormal, MdAttachMoney, MdNotes, MdOutlineTimer } from "react-icons/md";

interface Props {
    rowType : RowType;
    size?: number;
}

export default function Icon({ rowType, size = 18 } : Props) {
    let icon: any;

    switch (rowType) {
        case RowTypeValues.AccomodationCost:
        case RowTypeValues.AccomodationName:
            icon = <FaHouseChimney size={size} />;
            break;
        case RowTypeValues.DateFrom:
        case RowTypeValues.DateTo:
        case RowTypeValues.TravelDate:
            icon = <FaCalendarAlt size={size} />;
            break;
        case RowTypeValues.FoodCosts:
            icon = <GiKnifeFork size={size} />;
            break;
        case RowTypeValues.Location:
        case RowTypeValues.TravelFrom:
        case RowTypeValues.TravelTo:
            icon = <FaLocationDot size={size} />;
            break;
        case RowTypeValues.TravelTime:
        case RowTypeValues.LeaveTime:
        case RowTypeValues.ArriveTime:
            icon = <MdOutlineTimer size={20} />
            break;
        case RowTypeValues.TravelCost:
        case RowTypeValues.OtherCosts:
            icon = <MdAttachMoney size={20} />
            break;
        case RowTypeValues.Notes:
            icon = <MdNotes size={20} />
            break;
        case RowTypeValues.Address:
            icon = <FaRegAddressBook size={20} />
            break;
        case RowTypeValues.SeatInfo:
            icon = <MdAirlineSeatReclineNormal size={20} />
            break;
        case RowTypeValues.BookingReference:
            icon = <FaTicket size={20} />
            break;
        default:
            icon = <></>
    }

    return <div className="icon">{icon}</div>;
}