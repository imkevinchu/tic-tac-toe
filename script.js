const playerCreator = (name, sign) => {
  this.name = name;
  this.sign = sign;

  const getName = () => {
    return name;
  };

  const getSign = () => {
    return sign;
  };

  return { getName, getSign };
};

const gameBoard = (() => {
  const checkGameOver = () => {};
  return {};
})();

const displayController = (() => {
  return {};
})();

window.onload = () => {};
