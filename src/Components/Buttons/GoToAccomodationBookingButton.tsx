import { FaLongArrowAltRight } from "react-icons/fa";
import '../../Styles/Box.css'

interface Props {
	location?: string;
	dateFrom?: string;
	dateTo?: string;
	numberOfPeople?: number;
}

export default function GoToAccomodationBookingButton({ location, dateFrom, dateTo, numberOfPeople }: Props) {

	const url = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(
		location ?? ""
	)}&checkin=${dateFrom}&checkout=${dateTo}&group_adults=${numberOfPeople}&no_rooms=1`;

	const handleClick = () => {

		if (disabled())
		{
			return;
		}

		window.open(url, "_blank");
	};

	const disabled = () => {

		if (!location || !numberOfPeople)
		{
			return true;
		}

		return false;
	};

	return (
		<div className={`accomodation-booking-button-box ${disabled() ? "accomodation-booking-button-box-disabled" : ""}`}>
			<FaLongArrowAltRight onClick={handleClick} title="Search on Booking.com" size={24} />
		</div>
	)
}