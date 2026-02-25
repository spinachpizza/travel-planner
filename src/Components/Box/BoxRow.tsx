import '../../Styles/Box.css'
import type { BoxRowData } from '../../Types/BoxRowData';
import Icon from '../Icons/Icon';
import { RowTypeValues } from '../../Enums/RowType';
import InputBox from '../InputBox/InputBox';
import type { newValueType } from '../../Types/newValueType';

interface Props {
    row: BoxRowData;
    onChange: ({ newValue }: { newValue: newValueType }) => void;
}

export default function BoxRow({ row, onChange }: Props) {

    if (row.rowType === RowTypeValues.Location)
    {
        return (
            <>
                <div className="box-row">
                    <InputBox row={row} onChange={onChange} />
                </div>
            </>
        )
    }

    if (row.rowType === RowTypeValues.TransportType)
    {
        return (
            <>
                <div className="box-row">
                    <InputBox row={row} onChange={onChange} />
                </div>
            </>
        )
    }

    return (
        <div className="box-row">
            <div className="box-row-title-container">
                <div className="box-row-title">
                    <div style={{ width: 5 }} />
                    <div style={{ width: 30, marginTop: 3 }}>
                        <Icon rowType={row.rowType} />
                    </div>
                    <div style={{ width: 115 }}>
                        <p>{row.rowType}</p>
                    </div>
                </div>
            </div>

            <InputBox row={row} onChange={onChange} />
        </div>
    )
}