import moment from "moment";

export function convertMsToTime(milliseconds: number, format = "mm:ss") {
  return moment("2000-01-01 00:00:00")
    .add(moment.duration(milliseconds, "milliseconds"))
    .format(format);
}

const FORMAT_TIME = "DD MMM yyyy HH:mm";
export function formatTimeTable(time: any, format = FORMAT_TIME) {
  return moment(time).format(format);
}

export function countDownTime(startDate: Date | string) {
  const startDateValue = moment(startDate);
  const diffNow = startDateValue.diff(moment(), "seconds");

  if (diffNow <= 0) {
    return "";
  }

  if (diffNow < 60) {
    return `${Math.round(diffNow)}sec`;
  }

  if (diffNow < 60 * 60) {
    return `${Math.floor(diffNow / 60)}min`;
  }

  const hours = Math.floor(diffNow / 3600);
  const minutes = Math.floor(Math.floor(diffNow / 60) % 60);

  return `${hours}h:${minutes}m`;
}
