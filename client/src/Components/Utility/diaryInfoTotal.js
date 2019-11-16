const diaryInfoTotal = (typeFor, data) => {
  const value = Object.entries(data).map(([key, value]) =>
    data[key].length === 0 ? [] : value.map(item => parseInt(item[typeFor]))
  );

  const addAll =
    value[0].reduce((a, b) => a + b, 0) +
    value[1].reduce((a, b) => a + b, 0) +
    value[2].reduce((a, b) => a + b, 0) +
    value[3].reduce((a, b) => a + b, 0) +
    value[4].reduce((a, b) => a + b, 0) +
    value[5].reduce((a, b) => a + b, 0);
  return addAll;
};

export default diaryInfoTotal;
