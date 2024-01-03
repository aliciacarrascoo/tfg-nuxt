export default function (property) {
  const languages = {
    en: {
      id: "en",
      name: "English",
    },
    es: {
      id: "es",
      name: "Español",
    },
    cat: {
      id: "cat",
      name: "Català",
    },
  };
  return languages[property] || languages;
}
