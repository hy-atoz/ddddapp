import React from 'react';
import {Dimensions} from 'react-native';
import {HStack, Image, Text, VStack} from 'native-base';
import getItem from '../utils/getItem';
import {useSelector} from 'react-redux';
import WinnerBadge from './WinnerBadge';
import Icon from 'react-native-vector-icons/Entypo';

const DEVICE_WIDTH = Dimensions.get('window').width;

const DashboardRow = ({companyCode, companyName, source}) => {
  const result = useSelector(state => state.result.value);
  const fdData = getItem(result, companyCode).fdData;
  const {day, dn, n1, n2, n3} = fdData;

  return (
    <HStack
      alignItems="center"
      borderBottomWidth="0.5"
      borderBottomColor="muted.300"
      justifyContent="space-between"
      paddingX={4}
      paddingY={3}>
      <Image
        alt={companyName}
        height={DEVICE_WIDTH <= 320 ? 8 : 10}
        width={DEVICE_WIDTH <= 320 ? 8 : 10}
        source={source}
        // marginRight={4}
      />
      <VStack space={1}>
        <Text color="gray.700" fontSize="xs" fontWeight="bold">
          {companyName} [{dn || '---/--'}] [{day || '---'}]
        </Text>
        <HStack space={4}>
          <HStack alignItems="center">
            <WinnerBadge isFirst num="1" />
            <Text fontFamily="Roboto-Bold" fontWeight="bold">
              {n1}
            </Text>
          </HStack>
          <HStack alignItems="center">
            <WinnerBadge num="2" />
            <Text fontFamily="Roboto-Bold" fontWeight="bold">
              {n2}
            </Text>
          </HStack>
          <HStack alignItems="center">
            <WinnerBadge num="3" />
            <Text fontFamily="Roboto-Bold" fontWeight="bold">
              {n3}
            </Text>
          </HStack>
        </HStack>
      </VStack>
      <Icon name="chevron-small-right" size={24} color="gray" />
    </HStack>
  );
};

export default DashboardRow;
