const dateStore = {
  weekDays: [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
  ],
  months: [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
  ]
};

export function transformDate(date) {
  const weekDay = getWeekDay(date);
  const monthDay = date.getDate();
  const month = getMonth(date);
  const your = date.getFullYear();

  return `${monthDay} ${month} ${your}, ${weekDay}`;
}

function getWeekDay(date) {
  return dateStore.weekDays[date.getDay()];
}

function getMonth(date) {
  return dateStore.months[date.getMonth()];
}
