export const searchValue = (originalArr, attribute, value) => {
  return originalArr.filter((item) =>
    item[attribute].toLowerCase().includes(value)
  );
};
