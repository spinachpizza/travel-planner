export type newValueType =
    | string  
    | { value1: string; value2: string } 
    | { fromDate: string; toDate: string } 
    | { cost: string; perPerson: boolean }
    | { cost: string, perPerson: boolean, perNight: boolean, nights: string };