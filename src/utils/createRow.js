import React from 'react';
import WinnerNumber from '../components/WinnerNumber';

export const createEmptyNumberRow = arr => {
  return arr.map((item, index) => {
    const isLast = index === arr.length - 1;

    return <WinnerNumber isLast={isLast} key={item.id} number={item.name} />;
  });
};

const createNumberRow = (arr, fdData, hasLetter) => {
  return arr.map((letter, index) => {
    const isLast = index === arr.length - 1;
    const number = fdData[letter.id];

    return (
      <WinnerNumber
        hasLetter={hasLetter}
        isLast={isLast}
        key={letter.id}
        letter={letter.name}
        number={number}
      />
    );
  });
};

export default createNumberRow;
