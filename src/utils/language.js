const Languages = () => {
  return [
    { value: "en", label: "English", direction: "ltr" },
    { value: "sd", label: "سنڌي", direction: "rtl" },
    { value: "ur", label: "اردو", direction: "rtl" },
  ];
};

const defaultLanguage = "sd";

const getLanguages = () => {
  return { languages: Languages(), defaultLanguage };
};

const saveLayoutDirection = (langCode) => {
  const language = Languages().find((lang) => lang.value === langCode);
  const direction = language ? language.direction : "rtl";
  sessionStorage.setItem("layoutDirection", direction);
};

const getLayoutDirection = () => {
  const direction =
    sessionStorage.getItem("layoutDirection") || getLanguages().defaultLanguage;

  const language = Languages().find((lang) => lang.value === direction);
  return language ? language.direction : "rtl";
};

const getCurrentLanguage = () => {
  const languageSaved = sessionStorage.getItem("info")
    ? JSON.parse(sessionStorage.getItem("info")).lang
    : null;
  return languageSaved || getLanguages().defaultLanguage;
};

export {
  getLanguages,
  getLayoutDirection,
  saveLayoutDirection,
  getCurrentLanguage,
};
