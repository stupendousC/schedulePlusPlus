// import axios from 'axios';
import _ from 'underscore';

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
  // For data comparison purposes, between JS time obj and postgres's date column format
  // Takes time obj (such as from JS), converts it to "YYYY-MM-DD"
  // "YYYY-MM-DD" is the shift_date format that comes from backend's postgres db
  const year = timeObj.getFullYear();
  let month = timeObj.getMonth() + 1;
  let day = timeObj.getDate();

  if (month < 10) { month = "0" + month.toString() }
  if (day < 10) { day = "0" + day.toString() }

  return `${year}-${month}-${day}`;
}

export const getWeekday = (timeStr_or_timeObj) => {
  // takes in either a timeStr like "2020-02-28" or a Date() object,
  // returns an abbrev'd weekday string

  let timeObj;
  if (typeof(timeStr_or_timeObj) === "string") {
    timeObj = convertToPST(timeStr_or_timeObj);
  } else {
    timeObj = timeStr_or_timeObj;
  }
  
  let weekdayArray = new Array(7);
  weekdayArray[0] = "Sun";
  weekdayArray[1] = "Mon";
  weekdayArray[2] = "Tues";
  weekdayArray[3] = "Wed";
  weekdayArray[4] = "Thurs";
  weekdayArray[5] = "Fri";
  weekdayArray[6] = "Sat";

  return weekdayArray[timeObj.getDay()];
}

export const formatTime = (timeStr) => {
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
  // For visual display purposes
  // Takes a date string like "YYYY-MM-DD" and converts to human-friendly "Jan 15, 2020"
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
    return (b.shift_date <= a.shift_date ? 1:-1);
  });
  return sorted;
}

export const dateInThePast = (dateStr) => {
  const todayStr = convertDateString(new Date());
  return todayStr > dateStr;
}

export const isPhoneValid = (phoneStr) => {
  // returns True if phoneStr fits any of these acceptable formats for Twilio texting: 
    // "4251112222"       // Length = 10
    // "14251112222"      // Length = 11
    // "425-111-2222"     // Length = 12
    // "1-425-111-2222"   // Length = 14
  // else returns False, including "(425)111-2222", so will have convertToValidPhoneNumberIfInParens() for that, to minimize user interruption

  if (!phoneStr) return false;
  if (phoneStr.length < 10 || phoneStr.length > 14) return false;

  if (phoneStr.length === 10 || phoneStr.length === 11) return canStringBeInteger(phoneStr);
  
  if (phoneStr.length === 12) {
    // check the non-numerical parts
    if ((phoneStr[3] !== "-") || (phoneStr[7] !== "-")) return false;

    // check the number parts
    const areaCode = phoneStr.slice(0,3);
    const phone3 = phoneStr.slice(4,7);
    const phone4 = phoneStr.slice(8,12);
    const areNumberPartsOK = areStringsInListAllIntegers([areaCode, phone3, phone4]);
    return areNumberPartsOK;
  }

  if (phoneStr.length === 14) {
    // check the non-numerical parts
    if ((phoneStr[1] !== "-") || (phoneStr[5] !== "-") || (phoneStr[9] !== "-")) return false;

    // check the number parts
    const firstDigit = phoneStr[0];
    const areaCode = phoneStr.slice(2,5);
    const phone3 = phoneStr.slice(6,9);
    const phone4 = phoneStr.slice(10,14);
    const areNumberPartsOK = areStringsInListAllIntegers([firstDigit, areaCode, phone3, phone4]);
    return areNumberPartsOK;
  }
}

// for use by isPhoneValid()
const canStringBeInteger = (str) => {
  // if str has leading zeros, get rid of them
  let nonZeroStr = str;
  while (nonZeroStr[0] === "0" && nonZeroStr.length > 1) {
    nonZeroStr = nonZeroStr.slice(1,nonZeroStr.length);
  }

  const asInt = parseInt(str);
  const backToStr = asInt.toString();
  return((nonZeroStr === backToStr) ? true:false);
}

// for use by isPhoneValid()
const areStringsInListAllIntegers = (list_of_strings) => {
  for (const str of list_of_strings) {
    if (!canStringBeInteger(str)) return false
  }
  // if nobody in the list fails, then they all pass
  return true;
}

export const convertToValidPhoneNumberIfAllNums = (phoneStr) => {
  // if phoneStr is in format of '4251112222' or '14251112222', it's annoying to read for user, so change it to 425-111-2222 minus the 1
  if (phoneStr.length === 10) {
    return `${phoneStr.slice(0,3)}-${phoneStr.slice(3,6)}-${phoneStr.slice(6,10)}`;
  } else if (phoneStr.length === 11) {
    return convertToValidPhoneNumberIfAllNums(phoneStr.slice(1,11));
  } else {
    return phoneStr;
  }
}

export const convertToValidPhoneNumberIfInParens = (phoneStr) => {
  // if "(425)111-2222" was the input, fcn will convert it to twilio-accepted & db-accepted value of 425-111-2222

  if (phoneStr.length === 13) {
    // check the non-numerical parts
    if (phoneStr[0] !== "(") return null;
    if (phoneStr[4] !== ")") return null;
    if (phoneStr[8] !== "-") return null;

    // check the number parts
    const areaCode = phoneStr.slice(1,4);
    const phone3 = phoneStr.slice(5,8);
    const phone4 = phoneStr.slice(9,13);
    const areNumberPartsOK = areStringsInListAllIntegers([areaCode, phone3, phone4]);
    // if phoneStr is in accepted convertable format, return it in target format like "425-111-2222"
    if (areNumberPartsOK) {
      return `${areaCode}-${phone3}-${phone4}`;
    } else {
      return null;
    }

  } else {
    return null;
  }
}

export const isEmailValid = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const deepCompareTwoSchedArrayss = (array1, array2) => {
  if (array1.length !== array2.length) return false;
  const sortedArray1 = sortById(array1);
  const sortedArray2 = sortById(array2);
  return _.isEqual(sortedArray1, sortedArray2);
}

// for use by deepCompareTwoArrays()
const sortById = (listOfObjs) => {
  return listOfObjs.sort((a,b) => b.id <= a.id ? 1:-1);
}

export const truncateString = (longStr, numberCharsToShow) => {
  if (longStr.length <= numberCharsToShow) {
    return longStr;
  } else {
    return (longStr.slice(0,numberCharsToShow) + "...");
  }
}