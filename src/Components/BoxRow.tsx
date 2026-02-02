import './LocationBox/LocationBox.css'
import { RowTypeValues, type RowType } from '../Enums/RowType'
import Icon from './Icon'
import InputBox from './InputBox';
import { validTransportTypes } from '../Constants/Constants';
import type { TransportType } from '../Enums/TransportType';
import TransportIcon from './TravelBox/TransportIcon';

interface Props {
    rowType: RowType;
    value: string;
    onChange: (newValue: string) => void;
}

export default function LocationBoxRow({ rowType, value, onChange }: Props) {
    
    const topRow = (rowType == RowTypeValues.Location || rowType == RowTypeValues.TransportType);

    return (
        <div className="box-row">
            <div className="box-row-title">

                {topRow &&
                    <>
                        <div style={{ width: 10 }} />
                        <div style={{ width: 30 }}> 

                            {rowType == RowTypeValues.Location &&
                                <Icon rowType={RowTypeValues.Location} />
                            }
                            {rowType == RowTypeValues.TransportType &&
                                <TransportIcon transportType={value as TransportType | ""} size={20} />
                            }
                        </div>
                        <div style={{ width: 110 }}>
                            <p>{rowType == RowTypeValues.Location ? "Location" : "Transport Type"}</p>
                        </div>
                    </>
                }
                {!topRow &&
                    <>
                        <div style={{ width: 3 }} />
                        <div style={{ width: 30 }}>
                            <Icon rowType={rowType} />
                        </div>
                        <div style={{ width: 117 }}>
                            <p>{rowType}</p>
                        </div>
                    </>
                }
            </div>

            {rowType != RowTypeValues.TransportType &&
                <InputBox textSize={"S"} rowType={rowType} value={value} onChange={(e) => onChange?.(e.target.value)} />
            } 
            {rowType == RowTypeValues.TransportType &&
                <select value={value} onChange={(e) => onChange(e.target.value as TransportType)} className="type-select">
                    {validTransportTypes.map((transportType) => (
                        <option key={transportType} value={transportType}>
                            {transportType}
                        </option>
                    ))}
                </select>
            }
            
        </div>
    )
}

export interface BoxRowData {
  id: string;
  rowType: RowType; 
  value: string;
}