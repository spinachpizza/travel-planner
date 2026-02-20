import { costRowTypes, dateRowTypes, textRowTypes, twoTextRowTypes } from "../../Constants/Constants";
import { RowTypeValues, type RowType } from "../../Enums/RowType";
import type { BoxRowData, CostRowData, DateRowData, TextRowData, TransportRowData, TwoTextRowData } from "../../Types/BoxRowData";

export const UpdateRowValue = (
    rows: BoxRowData[], 
    id: string, 
    newValue: string | number | { value1: string; value2: string } | { fromDate: string; toDate: string } | { cost: string; perPerson: boolean } 
    ): BoxRowData[] =>
{
    return rows.map(row => {
        if (row.id !== id) return row;

        if ('value' in row) {
            return { ...row, value: newValue as string } as TextRowData;
        }

        if ('value1' in row && typeof newValue === 'object' && 'value1' in newValue) {
            return { ...row, value1: newValue.value1, value2: newValue.value2 } as TwoTextRowData;
        }

        if ('cost' in row && 'perPerson' in row && typeof newValue === 'object' && 'cost' in newValue) {
            return { ...row, cost: newValue.cost, perPerson: newValue.perPerson } as CostRowData;
        }

        if ('fromDate' in row && 'toDate' in row && typeof newValue === 'object' && 'fromDate' in newValue) {
            return { ...row, fromDate: newValue.fromDate, toDate: newValue.toDate } as DateRowData;
        }

        return row;
    });
}

export const CreateRow = (rowType: RowType): BoxRowData => {

    if (isTextRow(rowType))
    {
        return { id: crypto.randomUUID(), rowType, value: "" };
    }

    if (isTwoTextRow(rowType))
    {
        return { id: crypto.randomUUID(), rowType, value1: "", value2: "" }
    }

    if (isCostRow(rowType))
    {
        if (rowType == RowTypeValues.TravelCost)
        {
            return { id: crypto.randomUUID(), rowType, cost: "", perPerson: true };
        }

        return { id: crypto.randomUUID(), rowType, cost: "", perPerson: false };
    }

    if (isDateRow(rowType))
    {
        return { id: crypto.randomUUID(), rowType, fromDate: "", toDate: "" };
    }

    if (isTransportRow(rowType))
    {
        return { id: crypto.randomUUID(), rowType, value: "Plane" };
    }

    throw new Error("Unhandled rowType: " + rowType);
};

export function isTextRow(rowType: RowType): rowType is TextRowData["rowType"] {
    return (textRowTypes as readonly string[]).includes(rowType);
}

export function isTwoTextRow(rowType: RowType): rowType is TwoTextRowData["rowType"] {
    return (twoTextRowTypes as readonly string[]).includes(rowType);
}

export function isCostRow(rowType: RowType): rowType is CostRowData["rowType"] {
    return (costRowTypes as readonly string[]).includes(rowType);
}

export function isDateRow(rowType: RowType): rowType is DateRowData["rowType"] {
    return (dateRowTypes as readonly string[]).includes(rowType);
}

export function isTransportRow(rowType: RowType): rowType is TransportRowData["rowType"] {
    return rowType === RowTypeValues.TransportType;
}