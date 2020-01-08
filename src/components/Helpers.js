// import axios from 'axios';

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