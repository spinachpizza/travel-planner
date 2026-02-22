import { costRowTypes, dateRowTypes, textRowTypes, twoTextRowTypes } from "../../Constants/RowTypeCategoryConstants";
import { RowTypeValues, type RowType } from "../../Enums/RowType";
import type { AccomodationCostRowData, BoxRowData, CostRowData, DateRowData, TextRowData, TransportRowData, TwoTextRowData } from "../../Types/BoxRowData";
import type { newValueType } from "../../Types/newValueType";

export const UpdateRowValue = (
    rows: BoxRowData[], 
    id: string, 
    newValue: newValueType
    ): BoxRowData[] =>
{
    return rows.map(row => {
        if (row.id !== id) return row;

        if (isTextRow(row))
        {
            if ('value' in row) {
                return { ...row, value: newValue as string } as TextRowData;
            }
        }

        if (isTwoTextRow(row))
        {
            if ('value1' in row && typeof newValue === 'object' && 'value1' in newValue) {
                return { ...row, value1: newValue.value1, value2: newValue.value2 } as TwoTextRowData;
            }
        }

        if (isCostRow(row))
        {
            if ('cost' in row && 'perPerson' in row && typeof newValue === 'object' && 'cost' in newValue) {
                return { ...row, cost: newValue.cost, perPerson: newValue.perPerson } as CostRowData;
            }
        }

        if (isAccomodationCostRow(row))
        {
            if ('cost' in row && 'perPerson' in row && 'perNight' in row && typeof newValue === 'object' && 'perNight' in newValue) {
                return { ...row, cost: newValue.cost, perPerson: newValue.perPerson, perNight: newValue.perNight, nights: newValue.nights} as AccomodationCostRowData;
            }
        }

        if (isDateRow(row))
        {
            if ('fromDate' in row && 'toDate' in row && typeof newValue === 'object' && 'fromDate' in newValue) {
                return { ...row, fromDate: newValue.fromDate, toDate: newValue.toDate } as DateRowData;
            }
        }

        return row;
    });
}

export const CreateRow = (rowType: RowType): BoxRowData => {

    if (isTextRowType(rowType))
    {
        return { id: crypto.randomUUID(), rowType, value: "" };
    }

    if (isTwoTextRowType(rowType))
    {
        return { id: crypto.randomUUID(), rowType, value1: "", value2: "" }
    }

    if (isCostRowType(rowType))
    {
        if (rowType == RowTypeValues.TravelCost)
        {
            return { id: crypto.randomUUID(), rowType, cost: "", perPerson: true };
        }

        return { id: crypto.randomUUID(), rowType, cost: "", perPerson: false };
    }

    if (isAccomodationCostRowType(rowType))
    {
        return { id: crypto.randomUUID(), rowType, cost: "", perPerson: false, perNight: false, nights: "1" };
    }

    if (isDateRowType(rowType))
    {
        return { id: crypto.randomUUID(), rowType, fromDate: "", toDate: "" };
    }

    if (isTransportRowType(rowType))
    {
        return { id: crypto.randomUUID(), rowType, value: "Plane" };
    }

    throw new Error("Unhandled rowType: " + rowType);
};


export function isTextRowType(rowType: RowType): rowType is TextRowData["rowType"] {
    return (textRowTypes as readonly string[]).includes(rowType);
}

export function isTwoTextRowType(rowType: RowType): rowType is TwoTextRowData["rowType"] {
    return (twoTextRowTypes as readonly string[]).includes(rowType);
}

export function isCostRowType(rowType: RowType): rowType is CostRowData["rowType"] {
    return (costRowTypes as readonly string[]).includes(rowType);
}

export function isAccomodationCostRowType(rowType: RowType): rowType is AccomodationCostRowData["rowType"] {
    return rowType === RowTypeValues.AccomodationCost;
}

export function isDateRowType(rowType: RowType): rowType is DateRowData["rowType"] {
    return (dateRowTypes as readonly string[]).includes(rowType);
}

export function isTransportRowType(rowType: RowType): rowType is TransportRowData["rowType"] {
    return rowType === RowTypeValues.TransportType;
}




export function isTextRow(row: BoxRowData): row is TextRowData {
    return textRowTypes.includes(row.rowType);
}

export function isTwoTextRow(row: BoxRowData): row is TwoTextRowData {
    return twoTextRowTypes.includes(row.rowType);
}

export function isCostRow(row: BoxRowData): row is CostRowData {
    return costRowTypes.includes(row.rowType);
}

export function isAccomodationCostRow(row: BoxRowData): row is AccomodationCostRowData {
    return row.rowType == RowTypeValues.AccomodationCost;
}

export function isDateRow(row: BoxRowData): row is DateRowData {
    return dateRowTypes.includes(row.rowType);
}

export function isTransportRow(row: BoxRowData): row is TransportRowData {
    return row.rowType == RowTypeValues.TransportType;
}