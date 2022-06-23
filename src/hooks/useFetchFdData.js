// TODO: To be implemented

import {useEffect} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {saveResult, setIsLoaded} from '../features/result';
import {API_BASE_URL} from '../constants';

const useFetchFdData = ({date = ''}) => {
  const dispatch = useDispatch();
  const {formattedDate} = useSelector(state => state.result.dates);
  const result = useSelector(state => state.result.value);

  useEffect(() => {
    console.log('selectedDate: ', formattedDate); // TODO: Remove this line
    fetchFdData();
    // if (formattedDate !== '') {
    //   fetchFdData(formattedDate);
    // } else {
    //   fetchFdData();
    // }
  }, [formattedDate]);

  const fetchFdData = () => {
    dispatch(setIsLoaded(false));
    axios
      .get(`${API_BASE_URL}/${date}`)
      .then(
        res =>
          res.data !== undefined &&
          dispatch(saveResult(res.data)) &&
          dispatch(setIsLoaded(true)),
      )
      .catch(err => console.log(err));
  };

  return {
    dateSelected: formattedDate,
    result,
  };
};

export default useFetchFdData;
