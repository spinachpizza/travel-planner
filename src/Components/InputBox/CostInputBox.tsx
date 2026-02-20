import { IoPeopleSharp, IoPerson } from 'react-icons/io5';
import '../../Styles/Box.css';

interface Props {
    cost: string;
    perPerson: boolean;
    onChange: (newValue: { cost: string; perPerson: boolean }) => void;
}

export default function CostInputBox({ cost, perPerson, onChange }: Props) {

    const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value === "") {
            onChange?.({ cost: "", perPerson });
            return;
        }

        const regex = /^\d*\.?\d*$/;
        if (regex.test(value)) {
            onChange?.({ cost: value, perPerson });
        }
    };

    const handlePerPersonToggle = () => {
        onChange?.({ cost: cost, perPerson: !perPerson });
    };

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <p className="default-text" style={{marginLeft: 15}}>£</p>
            <input className={`box-row-input default-text`} value={cost} onChange={handleCostChange}
                style={{ width: "25%", marginLeft: 10, marginBottom: 10, marginTop: 10, marginRight: 15 }} />

            <div onClick={handlePerPersonToggle} className="cost-input-toggle-container">
                {perPerson &&
                    <IoPerson size={20} title="Per Person" />
                }
                {!perPerson &&
                    <IoPeopleSharp size={24} title="Total" />
                }
            </div>
        </div>
    );
}