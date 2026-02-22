import { IoPeopleSharp, IoPerson } from 'react-icons/io5';
import '../../Styles/Box.css';
import { FaBed, FaCalculator } from 'react-icons/fa6';

interface Props {
    cost: string;
    perPerson: boolean;
    perNight: boolean;
    nights: string;
    onChange: (newValue: { cost: string; perPerson: boolean, perNight: boolean, nights: string }) => void;
}

export default function AccomodationCostInputBox({ cost, perPerson, perNight, nights, onChange }: Props) {

    const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value === "") {
            onChange?.({ cost: "", perPerson, perNight, nights });
            return;
        }

        const regex = /^\d*\.?\d*$/;
        if (regex.test(value)) {
            onChange?.({ cost: value, perPerson, perNight, nights });
        }
    };

    const handleNightsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value === "") {
            onChange?.({ cost, perPerson, perNight, nights: "" });
            return;
        }

        const regex = /^\d{1,3}$/;
        if (regex.test(value)) {
            onChange?.({ cost, perPerson, perNight, nights: value });
        }
    };

    const handlePerPersonToggle = () => {
        onChange?.({ cost: cost, perPerson: !perPerson, perNight, nights });
    };

    const handlePerNightToggle = () => {
        onChange?.({ cost: cost, perPerson, perNight: !perNight, nights });
    };

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <p className="default-text" style={{marginLeft: 15}}>£</p>
            <input className={`box-row-input default-text`} value={cost} onChange={handleCostChange}
                style={{ width: "20%", marginLeft: 10, marginBottom: 10, marginTop: 10, marginRight: 10 }} />

            <div onClick={handlePerPersonToggle} className="cost-input-toggle-container" style={{ marginLeft: 0 }} >
                {perPerson &&
                    <IoPerson size={20} title="Per Person" />
                }
                {!perPerson &&
                    <IoPeopleSharp size={24} title="Total" />
                }
            </div>
            
            <div onClick={handlePerNightToggle} className="cost-input-toggle-container">
                {perNight &&
                    <FaBed size={20} title="Per Night" />
                }
                {!perNight &&
                    <FaCalculator size={24} title="Total Stay Cost" />
                }
            </div>
            {perNight &&
                <input className={`box-row-input default-text`} value={nights} onChange={handleNightsChange} placeholder=''
                    style={{ width: "10%", marginLeft: 10, marginBottom: 10, marginTop: 10, marginRight: 15 }} />
            }
        </div>
    );
}