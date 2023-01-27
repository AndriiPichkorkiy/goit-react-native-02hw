export const getDateString = (dateString) => {
  const date = new Date(+dateString);
  const day = (date.getDay() + "").padStart(2, "0");
  const months = getMonth(date.getUTCMonth());
  const year = date.getFullYear();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  const response = `${day} ${months} ${year} | ${hours}:${minutes}`;
  return response;
};

function getMonth(idx) {
  const objDate = new Date();
  objDate.setDate(1);
  objDate.setMonth(idx - 1);

  const locale = "en-us";
  const month = objDate.toLocaleString(locale, { month: "long" });

  return month;
}

