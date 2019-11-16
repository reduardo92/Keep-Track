const mealTotalMacros = (name, data) =>
  data.map(item => item[name]).reduce((a, b) => parseInt(a) + parseInt(b), 0);

export default mealTotalMacros;
