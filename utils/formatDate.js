export default function(date) {
  if (!date) return "";
  return new Date(date).toLocaleString().replace(",", " at ");
};

