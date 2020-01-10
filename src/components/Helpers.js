// import axios from 'axios';

export const convertToPST = (timeStr) => {
  // UTC to PST conversion:
  // takes a timeStr of 'YYYY-MM-DD' in UTC time and convert it to a timeStr in Pacific Standard Time
  // PST is ahead of UTC by 8 hours, so this method will return the PST's actual timeStr, if the given arg timeStr falls in that 8 hr gap wacky zone
  // Date('2020-1-1') returns UTC of 12/30 midnight, BOO!!!
  // Date('2020-1-1 00:00-0800') returns correct 1/1, YES!!!
  // obviously I"m assuming the end user lives in PST...

  const newStr = timeStr + " 00:00-0800";
  const newTime = new Date(newStr);
  return new Date(newTime);
}

export const convertDateString = (timeObj) => {
  const year = timeObj.getFullYear();
  let month = timeObj.getMonth() + 1;
  let day = timeObj.getDate();

  if (month < 10) { month = "0" + month.toString() }
  if (day < 10) { day = "0" + day.toString() }

  return `${year}-${month}-${day}`;
}

export const convertTimeString = (timeStr) => {
  // takes "HH:MM:SS" and turns it into "HH:MM AM/PM"
  let hours = parseInt(timeStr.slice(0,2));
  if (hours < 12) {
    if (timeStr[0] === "0") {
      return (timeStr.slice(1,5)+" A.M.");
    } else {
      return (timeStr.slice(0,5)+" A.M.");
    }
  } else {
    hours -= 12;
    return (hours+timeStr.slice(2,5)+" P.M.");
  }
}

export const formatDate = (arg_date) => {
  const date = new Date(arg_date);
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getUTCDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`
}

export const sortUnavailsByDate = (listOfUnavails) => {
  const sorted = listOfUnavails.sort((a,b) => {
    return (b.day_off < a.day_off ? 1:-1);
  });
  return sorted;
}

export const sortShiftsByDate = (listOfShifts) => {
  const sorted = listOfShifts.sort((a,b) => {
    return (b.shift_date < a.shift_date ? 1:-1);
  });
  return sorted;
}

export const dateInThePast = (dateStr) => {
  const todayStr = convertDateString(new Date());
  return todayStr < dateStr;
}

export const sendTexts = (listOfEmployees, shift) => {
  console.log("\nSENDING TEXT TO *WRONG* group", listOfEmployees);
  console.log("FOR correct SHIFT DATE = ", shift.shift_date);
  console.log("it's always the same friggin' group! whichever is last clicked on is it!")





}