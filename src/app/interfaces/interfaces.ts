export interface IWorkDays {
    totalDays: number;
    monthName: string;
    year: number;
    monthIndex: number;
    workedFor: { [key: string]: boolean };
}

export interface ITask {
    name: string;
    workDays: { [key: string]: IWorkDays }
}