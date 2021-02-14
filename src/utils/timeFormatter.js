const formatDigits = (value) => {
  const str = String(value);
  return str.length === 1 ? "0" + str : str;
};

const formatTime = (date) => {
  return `${formatDigits(date.getHours())}:${formatDigits(
    date.getMinutes() + 1
  )}`;
};

export default formatTime;
