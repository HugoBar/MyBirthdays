import { readFileSync } from "fs";

type BirthdayEntry = {
  name: string;
  day: number;
  month: number;
  year: number;
  thisYear?: Date;
};

type BirthdayData = BirthdayEntry[];

enum Month {
  Previous,
  Current,
  Next
}

// LIST BIRTHDAYS
// This function lists birthdays based on a json file (birthdays.json)
// First, today's birthdays, followed by other birthdays of the 
// current month, birthdays from last month and birthdays next month
function myBirthdays() {
  // Read birthdays from file
  const data = readFileSync("birthdays.json", "utf8");
  const birthdayList: BirthdayData = JSON.parse(data).data;

  // Initialize date today
  const today = new Date();
  today.setHours(1, 0, 0, 0);

  // Assign Date object to each birthday
  // JavaScript months are 0-based
  birthdayList.forEach(function (birthday) {
    const birthdayDate = new Date(
      today.getFullYear(),
      birthday.month - 1,
      birthday.day,
      1,
      0,
      0,
      0
    );
    birthday.thisYear = birthdayDate;
  });

  // Filter birthdays per month

  // Today
  const birthdaysToday: BirthdayData = birthdayList.filter(
    (birthday) =>
      birthday.thisYear && birthday.thisYear.getTime() === today.getTime()
  );
  printBirthdays(birthdaysToday, today.getFullYear())

  // Current month
  const birthdaysCurrentMonth: BirthdayData = birthdaysPerMonth(birthdayList, Month.Current, today)
  printBirthdays(birthdaysCurrentMonth, today.getFullYear(), Month.Current)

  // Last Month
  const birthdaysLastMonth: BirthdayData = birthdaysPerMonth(birthdayList, Month.Previous, today)
  printBirthdays(birthdaysLastMonth, today.getFullYear(), Month.Previous)

  // Next month
  const birthdaysNextMonth: BirthdayData = birthdaysPerMonth(birthdayList, Month.Next, today)
  printBirthdays(birthdaysNextMonth, today.getFullYear(), Month.Next)
}

function birthdaysPerMonth(birthdayData: BirthdayData, month: Month, today: Date): BirthdayData {
  let firstOfTheMonth: Date;
  let lastOfTheMonth: Date;
  
  // Find first and last day of the month
  // JavaScript months are 0-based
  if (month === Month.Current) {
    firstOfTheMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    lastOfTheMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  } else if (month === Month.Previous) {
    firstOfTheMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    lastOfTheMonth = new Date(today.getFullYear(), today.getMonth(), 0);
  } else {
    firstOfTheMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    lastOfTheMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0);
  }

  // filter birthdays within the range set
  return birthdayData.filter(
    (birthday) =>
      birthday.thisYear &&
      birthday.thisYear.getTime() >= firstOfTheMonth.getTime() &&
      birthday.thisYear.getTime() <= lastOfTheMonth.getTime()
  );
}

function printBirthdays(birthdayList: BirthdayData, year: number, month?: Month) {
  if(month === Month.Current) {
    console.info("\n\n*********** BIRTHDAYS THIS MONTH ***********");
  } else if (month === Month.Previous) {
    console.info("\n\n*********** BIRTHDAYS LAST MONTH ***********");
  } else if (month === Month.Next) {
    console.info("\n\n*********** BIRTHDAYS NEXT MONTH ***********");
  } else {
    console.info("\n\n*********** BIRTHDAYS TODAY ***********");
  }

  birthdayList.forEach((birthday) =>
    console.info(
      `${birthday.name} - ${birthday.day}/${birthday.month} (${
        year - birthday.year
      } anos)`
    )
  );
}

myBirthdays();
