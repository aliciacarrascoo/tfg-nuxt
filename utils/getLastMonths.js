export default function (n) {
  const currentDate = new Date();
  const lastNMonths = [];
  var currentYear = currentDate.getUTCFullYear();
  var currentMonth = currentDate.getUTCMonth() + 1;
  console.log(currentMonth);

  for (let i = 0; i < n + 1; i++) {
    const lastMonthDate = new Date(
      Date.UTC(currentYear, currentMonth, 1, 0, 0, 0, 0),
    );
    lastNMonths.push(lastMonthDate.toISOString());
    if (currentMonth === 0) {
      currentMonth = 12;
      currentYear--;
    }
    currentMonth = currentMonth - 1;
  }

  return lastNMonths.reverse();
}
