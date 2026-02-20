import { RowTypeValues, type RowType } from "../../Enums/RowType";

import { FaHouseChimney, FaLocationDot, FaRegAddressBook, FaTicket } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { MdAirlineSeatReclineNormal, MdAttachMoney, MdNotes, MdOutlineKitesurfing, MdOutlineTimer } from "react-icons/md";
import { isCostRow } from "../Box/BoxHelpers";

interface Props {
    rowType : RowType;
    size?: number;
}

export default function Icon({ rowType, size = 18 } : Props) {
    let icon: any;

    if (isCostRow(rowType))
    {
        return <div className="icon"><MdAttachMoney size={20} /></div>;
    }

    switch (rowType) {
        case RowTypeValues.AccomodationName:
            icon = <FaHouseChimney size={size} />;
            break;
        case RowTypeValues.Activities:
            icon = <MdOutlineKitesurfing size={size} />;
            break;
        case RowTypeValues.Dates:
        case RowTypeValues.TravelDate:
            icon = <FaCalendarAlt size={size} />;
            break;
        case RowTypeValues.Location:
        case RowTypeValues.TravelLocations:
            icon = <FaLocationDot size={size} />;
            break;
        case RowTypeValues.TravelTime:
        case RowTypeValues.Times:
            icon = <MdOutlineTimer size={20} />
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