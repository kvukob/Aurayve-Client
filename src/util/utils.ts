import moment from 'moment';

// Converts a UTC string date to a local date string
// in this format: Dec 25 1941, 5:41:14 PM
export const formatUTCDateToLocalDateTime = (date: string) => {
  const stillUtc = moment.utc(date).toDate();
  return moment(stillUtc).local().format('MMM Do YYYY, h:mm:ss A');
};
// Converts a UTC string date to a local date string
// in this format: 5:41:14 PM
export const formatUTCDateToLocalTime = (date: string) => {
  const stillUtc = moment.utc(date).toDate();
  return moment(stillUtc).local().format('h:mm:ss A');
};
