//helper methods for calendar calculations

// Days in each month (non-leap year)
const MONTH_LENGTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Days of the week
export const WEEKDAY_NAMES = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const MONTH_NAMES = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

interface CalHeaderProps {
  monthName: string;
  year: number;
}

export const getCalendarHeaderData = (date: Date): CalHeaderProps => {
  return {
    monthName: getMonthName(date),
    year: getYear(date),
  };
};
//Get name of month given date
const getMonthName = (date: Date): string => {
  return MONTH_NAMES[date.getMonth()];
};

// Get number of given date
const getTodaysNum = (date: Date): number => {
  return date.getDate();
};

// Get the Year from given date
const getYear = (date: Date): number => date.getFullYear();

const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

// Get the number of days for the given month
const getDaysInMonth = (date: Date): number => {
  const month = date.getMonth();
  const year = date.getFullYear();
  return month === 1 ? (isLeapYear(year) ? 29 : 28) : MONTH_LENGTHS[month];
};

// Get the day of the week for the first day of the month (0-6, where 0 is Sunday)
const getFirstWeekdayOfMonth = (date: Date): number => {
  const month = date.getMonth();
  const year = date.getFullYear();
  return new Date(year, month, 1).getDay();
};

// Get total cells in calendar grid, includes the first empty cells, days in the month,
// and the remaining cells to fill the grid
const getTotalCells = (firstEmptyCells: number, dayCells: number): number => {
  const totalDays = firstEmptyCells + dayCells;
  const totalWeeks = Math.ceil(totalDays / 7);
  return totalWeeks * 7;
};

export interface CellData {
  month: (null | number)[];
  todayNum: number;
}

//data handling wrapper
export const getCalendarData = (date: Date): CellData => {
  return {
    month: calculateMonthCells(date),
    todayNum: getTodaysNum(date),
  };
};

const calculateMonthCells = (date: Date): (null | number)[] => {
  const daysInMonth = getDaysInMonth(date);
  const firstWeekdayOfMonth = getFirstWeekdayOfMonth(date);
  const totalCells = getTotalCells(firstWeekdayOfMonth, daysInMonth);
  const monthCells = Array(totalCells).fill(null);
  for (let day = 1; day <= daysInMonth; day++) {
    const pos = day + firstWeekdayOfMonth - 1;
    monthCells[pos] = day;
  }
  return monthCells;
};
//a generic function to generate an array based on set length and some function, generateCells(8, i => <div key={i} />)
export const generateCells = <T>(
  length: number,
  fn: (index: number) => T,
): T[] => Array.from({ length }, (_, i) => fn(i));
