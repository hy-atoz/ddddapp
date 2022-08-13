import moment from 'moment';
import momentTz from 'moment-timezone';
import * as RNLocalize from 'react-native-localize';

// testing

export const ALPHABET = [
  {id: 's1', name: 'A'},
  {id: 's2', name: 'B'},
  {id: 's3', name: 'C'},
  {id: 's4', name: 'D'},
  {id: 's5', name: 'E'},
  {id: 's6', name: 'F'},
  {id: 's7', name: 'G'},
  {id: 's8', name: 'H'},
  {id: 's9', name: 'I'},
  {id: 's10', name: 'J'},
  {id: 's11', name: 'K'},
  {id: 's12', name: 'L'},
  {id: 's13', name: 'M'},
  {id: 'c1', name: 'N'},
  {id: 'c2', name: 'O'},
  {id: 'c3', name: 'P'},
  {id: 'c4', name: 'Q'},
  {id: 'c5', name: 'R'},
  {id: 'c6', name: 'S'},
  {id: 'c7', name: 'T'},
  {id: 'c8', name: 'U'},
  {id: 'c9', name: 'V'},
  {id: 'c10', name: 'W'},
];

// export const API_BASE_URL = 'https://test.algo.my/';
export const API_BASE_URL = 'https://api.4dnum.com/api/v1/result';

export const APP = {
  BORDER_WIDTH: '1',
  EMPTY: '----',
  GRAY_BORDER: 'gray.400',
  TITLE_BG: 'brand.black',
};

export const DATE_FORMAT = 'YYYY-MM-DD';
export const TIME_FORMAT_SHORT = 'HH:mm';
export const TIME_FORMAT_LONG = 'HHmmss';
export const DRAW_TIME = {start: 190000, end: 204500};
export const MALAYSIA_TIME_ZONE = 'Asia/Kuala_Lumpur';
export const TODAY = moment().format(`${DATE_FORMAT} ${TIME_FORMAT_SHORT}`);
export const DEVICE_TIME_ZONE = RNLocalize.getTimeZone();
export const DEVICE_TIME = momentTz.tz(TODAY, DEVICE_TIME_ZONE);
export const TARGET_TIME = DEVICE_TIME.clone()
  .tz(MALAYSIA_TIME_ZONE)
  .format(TIME_FORMAT_LONG);
export const TARGET_DATE = DEVICE_TIME.clone()
  .tz(MALAYSIA_TIME_ZONE)
  .format(DATE_FORMAT);

export const REFRESH_RATE_SECOND = 30;
export const REFRESH_RATE_MILLISECOND = 30000;

export const TITLES = {
  APP: '4DNum Results',
  FIRST: '1st Prize 首獎',
  SECOND: '2nd Prize 二獎',
  THIRD: '3rd Prize 三獎',
  SPECIAL: 'Special 特別獎',
  CONSOLATION: 'Consolation 安慰獎',
  FD_JACKPOT_ONE: '4D Jackpot 1 Prize',
  FD_JACKPOT_TWO: '4D Jackpot 2 Prize',
};

export const EMPTY_ARR = [
  {
    key: 1,
    id: 'a',
    name: APP.EMPTY,
  },
  {
    key: 2,
    id: 'b',
    name: APP.EMPTY,
  },
  {
    key: 3,
    id: 'c',
    name: APP.EMPTY,
  },
  {
    key: 4,
    id: 'd',
    name: APP.EMPTY,
  },
  {
    key: 5,
    id: 'e',
    name: APP.EMPTY,
  },
  {
    key: 6,
    id: 'f',
    name: APP.EMPTY,
  },
  {
    key: 7,
    id: 'g',
    name: APP.EMPTY,
  },
  {
    key: 8,
    id: 'h',
    name: APP.EMPTY,
  },
  {
    key: 9,
    id: 'i',
    name: APP.EMPTY,
  },
  {
    key: 10,
    id: 'j',
    name: APP.EMPTY,
  },
  {
    key: 11,
    id: 'k',
    name: APP.EMPTY,
  },
  {
    key: 12,
    id: 'l',
    name: APP.EMPTY,
  },
  {
    key: 13,
    id: 'm',
    name: APP.EMPTY,
  },
  {
    key: 14,
    id: 'n',
    name: APP.EMPTY,
  },
  {
    key: 15,
    id: 'o',
    name: APP.EMPTY,
  },
  {
    key: 16,
    id: 'p',
    name: APP.EMPTY,
  },
  {
    key: 17,
    id: 'q',
    name: APP.EMPTY,
  },
  {
    key: 18,
    id: 'r',
    name: APP.EMPTY,
  },
  {
    key: 19,
    id: 's',
    name: APP.EMPTY,
  },
  {
    key: 20,
    id: 't',
    name: APP.EMPTY,
  },
  {
    key: 21,
    id: 'u',
    name: APP.EMPTY,
  },
  {
    key: 22,
    id: 'v',
    name: APP.EMPTY,
  },
  {
    key: 23,
    id: 'w',
    name: APP.EMPTY,
  },
];
