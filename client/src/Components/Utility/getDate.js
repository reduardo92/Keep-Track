const getDate = () => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  const date = new Date();
  return `${days[date.getDay()]} ${date.getMonth() +
    1}/${date.getDate()}/${date.getFullYear()}`;
};

export default getDate;
