export default function(n) {
  const currentDate = new Date();
  const lastMonths = [];

  for (let i = 0; i < n; i++) {
    lastMonths.push(currentDate.toISOString());
    currentDate.setUTCMonth(currentDate.getUTCMonth() - 1);
  }

  return lastMonths.reverse();
}

