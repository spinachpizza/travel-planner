import '../../Styles/Box.css'
import { RowTypeValues, type RowType } from '../../Enums/RowType'
import Icon from '../Icons/Icon'
import InputBox from '../InputBox';
import { validTransportTypes } from '../../Constants/Constants';
import type { TransportType } from '../../Enums/TransportType';
import TransportIcon from '../Icons/TransportIcon';
import TextBox from '../TextBox';

interface Props {
    rowType: RowType;
    value: string;
    onChange: (newValue: string) => void;
}

export default function BoxRow({ rowType, value, onChange }: Props) {
    return (
        <div className="box-row">
            <div className="box-row-title">
                {
                    <>
                        <div style={{ width: 5 }} />
                        <div style={{ width: 30, marginTop: 3 }}>
                            {rowType != RowTypeValues.TransportType &&
                                <Icon rowType={rowType} />
                            }
                            {rowType == RowTypeValues.TransportType &&
                                <TransportIcon transportType={value as TransportType | ""} size={20} />
                            }
                        </div>
                        <div style={{ width: 115 }}>
                            <p>{rowType}</p>
                        </div>
                    </>
                }
            </div>
            
            {rowType == RowTypeValues.Notes &&
                <TextBox textSize={"S"} value={value} onChange={(e) => onChange?.(e.target.value)} />
            }
            {rowType != RowTypeValues.TransportType && rowType != RowTypeValues.Notes &&
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