module.exports = function capitalize(str) {
  if (typeof str !== "string") {
    return "";
  }
  const words = str.split(" ");

  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  const capitalizedStr = capitalizedWords.join(" ");

  return capitalizedStr;
};
