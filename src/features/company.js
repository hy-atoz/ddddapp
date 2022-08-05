import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: [
    {
      id: 0,
      code: 'M',
      color: 'brand.magnum',
      name: 'Magnum 4D 萬能',
      isBlackText: true,
      image: require('../../assets/img/magnum.png'),
      hasLastRow: true,
      hasLetter: true,
      hasLiveVideo: false,
    },
    {
      id: 1,
      code: 'PMP',
      color: 'brand.damacai',
      name: 'Da Ma Cai 1+3D 大馬彩',
      image: require('../../assets/img/damacai.png'),
      hasLastRow: false,
      hasLetter: false,
      hasLiveVideo: false,
    },
    {
      id: 2,
      code: 'ST',
      color: 'brand.toto',
      name: 'SportsToto 4D 多多',
      image: require('../../assets/img/toto.png'),
      hasLastRow: true,
      hasLetter: true,
      hasLiveVideo: false,
    },
    {
      id: 3,
      code: 'SG',
      color: 'brand.sg4d',
      name: 'Singapore 4D',
      image: require('../../assets/img/sg4d.png'),
      hasLastRow: false,
      hasLetter: false,
      hasLiveVideo: false,
    },
    {
      id: 4,
      code: 'STC',
      color: 'brand.sandakan',
      name: 'Sandakan 4D 山打根賽馬會',
      isGreenText: true,
      image: require('../../assets/img/sandakan.png'),
      hasLastRow: true,
      hasLetter: false,
      hasLiveVideo: false,
    },
    {
      id: 5,
      code: 'EE',
      color: 'brand.sabah88',
      name: 'Sabah 88 4D 沙巴萬字',
      image: require('../../assets/img/sabah88.png'),
      hasLastRow: true,
      hasLetter: false,
      hasLiveVideo: false,
    },
    {
      id: 6,
      code: 'CS',
      color: 'brand.cashsweep',
      name: 'Special CashSweep 砂勞越大萬',
      image: require('../../assets/img/cashsweep.png'),
      hasLastRow: false,
      hasLetter: false,
      hasLiveVideo: false,
    },
    {
      id: 7,
      code: 'H',
      color: 'brand.hari',
      name: 'Lucky Hari Hari 天天好運',
      image: require('../../assets/img/hari.png'),
      hasLastRow: true,
      hasLetter: true,
      hasLiveVideo: true,
    },
    {
      id: 8,
      code: 'P',
      color: 'brand.perdana',
      name: 'Perdana Lottery 4D',
      image: require('../../assets/img/perdana.png'),
      hasLastRow: false,
      hasLetter: true,
      hasLiveVideo: true,
      swiperHeight: 0,
    },
    {
      id: 9,
      code: 'GD',
      color: 'brand.gd',
      name: 'Grand Dragon 4D 豪龍',
      image: require('../../assets/img/gd.png'),
      hasLastRow: true,
      hasLetter: true,
      hasLiveVideo: false,
    },
  ],
};

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    updateCompanyData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {updateCompanyData} = companySlice.actions;

export default companySlice.reducer;
