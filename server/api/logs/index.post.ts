export default defineEventHandler((logJSON) => {
  console.log(logJSON);
  return { log: "this is a log" };
});
