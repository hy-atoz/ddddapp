const getItem = (arr, code) => {
  return arr.find(i => i.type === code);
};

export default getItem;
