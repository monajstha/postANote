const getDayAndTime = (date: Date) => {
  const properDate = new Date(date);
  return properDate.toLocaleString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    weekday: "long",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
};

export default getDayAndTime;
