exports.randomTwoDigitNumber = () => {
  const mathRandom = Math.floor(Math.random() * 100);
  let randomNumber;
  if (mathRandom < 10) {
    randomNumber = `0${mathRandom}`;
  } else {
    randomNumber = mathRandom;
  }
  return randomNumber;
};

exports.randomFourDigitNumber = () => {
  const mathRandom = Math.floor(Math.random() * 10000);
  let randomNumber;
  if (mathRandom < 1000) {
    randomNumber = `0${mathRandom}`;
  } else {
    randomNumber = mathRandom;
  }
  return randomNumber;
};

exports.randomFiveDigitNumber = () => {
  const mathRandom = Math.floor(Math.random() * 100000);
  let randomNumber;
  if (mathRandom < 10000) {
    randomNumber = `0${mathRandom}`;
  } else {
    randomNumber = mathRandom;
  }
  return randomNumber;
};
