export default function(date) {
  console.log(date)
  if (!date) return "";
  return new Date(date).toLocaleString().replace(",", " at ");
};

