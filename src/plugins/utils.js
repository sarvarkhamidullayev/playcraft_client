// Import necessary modules
import moment from "moment";
import { api } from "src/boot/axios";
import { useAuthStore } from "src/pages/Auth/auth-store";
import { useLoading } from "src/plugins/loading";
import { useNotify } from "src/plugins/notify";
import { useRoomStore } from "src/stores/room";
// audio  is  in public folder

const { showLoading, hideLoading } = useLoading();
const { negative } = useNotify();

// Function to parse a string and return a float number
function getNumber(str) {
  return parseFloat(String(str).replace(/\s/g, ""));
}

async function makeRequest(method, url, data = null, options = {}) {
  try {
    showLoading();
    const response = await api[method](url, data, options);
    return { success: true, data: response.data };
  } catch (error) {
    console.error(error);
    if (
      error.request &&
      error.request.status !== 401 &&
      error.request.status !== 404 &&
      error.request.status !== 500 &&
      error.request.status !== 409
    ) {
      console.log(error.request);
      negative("Интернет билан муаммо бор. Қайтадан уриниб кўринг!");
      return { success: false, data: error.request };
    }
    if (error.response.status === 401) {
      negative("Iltimos tizimga qaytadan kiring!");
      useAuthStore().logout();
      return { success: false, data: error.response };
    }

    negative(error.response.data.message || "Ҳатолик рўй берди");
    return { success: false, data: error.response };
  } finally {
    hideLoading();
  }
}

// Function to check for empty strings in an object
function checkForEmptyString(obj) {
  for (let field in obj) {
    if (typeof obj[field] === "object") {
      if (checkForEmptyString(obj[field])) {
        return true;
      }
    } else if (obj[field] === "" && field !== "_id" && field !== "club") {
      return true;
    }
  }
  return false;
}

// Function to check for empty strings or zero in an object's fields
function checkObjFieldsForEmptyString(obj) {
  for (let field in obj) {
    if (typeof obj[field] === "object") {
      if (checkForEmptyString(obj[field])) {
        return true;
      }
    } else if (obj[field] === "" && field !== "_id" && field !== "club") {
      return true;
    }
  }
  return false;
}

// Function to clear all fields in an object
function clearObjectFields(obj) {
  for (let field in obj) {
    obj[field] = "";
  }
}
function getCurrentDateAndTimeISO() {
  return moment().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
}

// Function to format time from a full date string
function formatTime(fullDate) {
  const time = fullDate.split("T")[1].split(".")[0];
  const showtime = time.slice(0, 5);
  return showtime;
}

// Function to format date from a full date string
function formatDate(fullDate) {
  const date = fullDate.split("T")[0];
  return date;
}
// formatNumber function
function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Function to convert date string to ISO format
function getIsoFormat(date, bool = false) {
  return `${date.split(".")[2]}-${date.split(".")[1]}-${date.split(".")[0]}${
    bool ? "T23:59:59.999Z" : "T00:00:00.000Z"
  }`;
}

// Function to convert minutes to HH:MM format
function convertMinutesToHours(minutes) {
  var hours = Math.floor(minutes / 60);
  var remainingMinutes = minutes % 60;

  var formattedHours = String(hours).padStart(2, "0");
  var formattedMinutes = String(remainingMinutes.toFixed(0)).padStart(2, "0");

  return formattedHours + ":" + formattedMinutes;
}
function formatMinutesToTime(time) {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  const formattedResult = `${String(hours).padStart(2, "0")}:${String(
    minutes.toFixed(0)
  ).padStart(2, "0")}`;
  return formattedResult;
}
function getMinutesDifference(startTime) {
  const endTime = getCurrentDateAndTimeISO();
  // calculate difference times
  const diffTime = moment
    .duration(moment(endTime).diff(moment(startTime)))
    .asMinutes()
    .toFixed(2);

  return diffTime;
}
function notifyTimeIsUp() {
  const notificationSound = new Audio("notification.mp3");

  notificationSound
    .play()
    .catch((error) => console.error("Error playing sound:", error));
}
// Exporting all functions
export function useUtils() {
  return {
    formatNumber,
    getNumber,
    getCurrentDateAndTimeISO,
    makeRequest,
    checkObjFieldsForEmptyString,
    clearObjectFields,
    formatTime,
    formatMinutesToTime,
    formatDate,
    getIsoFormat,
    convertMinutesToHours,
    getMinutesDifference,
    notifyTimeIsUp,
  };
}
