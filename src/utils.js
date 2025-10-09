export const average = (arr) => {
  if (arr.length === 0) return 0;
  return arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
};

export const KEY = "44b9e1a3"; // OMDB API key
