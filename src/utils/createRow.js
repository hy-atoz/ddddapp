import React from 'react';
import WinnerNumber from '../components/WinnerNumber';

export const createEmptyNumberRow = (arr, hasLetter) => {
  return arr.map((item, index) => {
    const isLast = index === arr.length - 1;

    return (
      <WinnerNumber
        hasLetter={hasLetter}
        isLast={isLast}
        key={item.key}
        letter={item.id}
        number={item.name}
      />
    );
  });
};

export const createNumberRow = (arr, fdData, hasLetter) => {
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
