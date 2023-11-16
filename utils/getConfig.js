export default function (property) {
  const config = {
    siteName: "Malware scan",
  };
  return config[property] || config;
}
