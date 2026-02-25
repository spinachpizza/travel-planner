import type { BoxData } from "../../Types/BoxData";
import { isAccomodationCostRow, isCostRow, isDateRow } from "../Box/BoxHelpers";

export function TotalCost({ boxes, totalPeople}: { boxes: BoxData[], totalPeople: number }) {

    const rows = boxes.flatMap(box => box.rows)

    const totalCost = rows
        .filter(row => isCostRow(row))
        .reduce((sum, row) => { 
            const n = row.perPerson ? Number(row.cost) * totalPeople: Number(row.cost); 
            return isNaN(n) ? sum : sum + n;
        }, 0);

    const totalAccomodationCost = rows
        .filter(row => isAccomodationCostRow(row))
        .reduce((sum, row) => {
            const total = row.perPerson ? Number(row.cost) * totalPeople: Number(row.cost);
            const totalStayCost = row.perNight ? total * Number(row.nights) : total;
            return isNaN(totalStayCost) ? sum : sum + totalStayCost;
        }, 0);
    
    return totalCost + totalAccomodationCost;
}

export function DateFrom({ boxes }: { boxes: BoxData[] }) {

    const dateFromBoxes = boxes
        .flatMap(box => box.rows)
        .filter(row => isDateRow(row))

    const firstDateFrom = dateFromBoxes
        .find(row => row.fromDate)

    if (!firstDateFrom) { 
        return null; 
    } 
    
    return firstDateFrom.fromDate;
}

export function DateTo({ boxes }: { boxes: BoxData[] }) {

    const dateToBoxes = [...boxes]
        .reverse()
        .flatMap(box => box.rows)
        .filter(row => isDateRow(row))

    const lastDateTo = dateToBoxes
        .find(row => row.toDate)

    if (!lastDateTo) { 
        return null; 
    } 
    
    return lastDateTo.toDate;
}

export function TripLength({ boxes }: { boxes: BoxData[] }) {

    const dateFrom = DateFrom({boxes});
    const dateTo = DateTo({boxes});

    if (!dateFrom || !dateTo)
    {
        return null;
    }

    const fromDate = parseDate(dateFrom);
    const toDate = parseDate(dateTo);

    if (!fromDate || !toDate)
    {
        return null;
    }

    const days = (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24);
    return days.toString() + " days";
}

function parseDate(value: string | null | undefined): Date | null { 
    if (!value) {
        return null; 
    }
    
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
}