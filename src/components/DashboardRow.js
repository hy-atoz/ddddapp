import React from 'react';
import {Dimensions} from 'react-native';
import {HStack, Image, Text, VStack} from 'native-base';
import getItem from '../utils/getItem';
import {useSelector} from 'react-redux';
import WinnerBadge from './WinnerBadge';
import Icon from 'react-native-vector-icons/Entypo';

const DEVICE_WIDTH = Dimensions.get('window').width;

const DashboardRow = ({companyCode, companyName, inReorderMode, source}) => {
  const result = useSelector(state => state.result.value);
  const fdData = getItem(result, companyCode).fdData;
  const {day, dn, n1, n2, n3} = fdData;

  return (
    <HStack
      alignItems="center"
      borderBottomWidth="0.5"
      borderBottomColor="muted.300"
      justifyContent="space-between"
      paddingX={DEVICE_WIDTH <= 320 ? 2 : 4}
      paddingY={3}>
      <HStack alignItems="center" space={4}>
        <Image
          alt={companyName}
          height={DEVICE_WIDTH <= 320 ? 8 : 10}
          width={DEVICE_WIDTH <= 320 ? 8 : 10}
          source={source}
        />
        <VStack space={1}>
          <Text
            color="black"
            fontSize={DEVICE_WIDTH <= 320 ? 'xs' : 'sm'}
            fontWeight="bold">
            {companyName} [{dn || '---/--'}] [{day || '---'}]
          </Text>
          <HStack space={DEVICE_WIDTH <= 320 ? 4 : 6}>
            <HStack alignItems="center">
              <WinnerBadge isFirst num="1" />
              <Text
                color="gray.700"
                fontFamily="Roboto-Bold"
                fontSize={DEVICE_WIDTH <= 320 ? 'xs' : 'md'}
                fontWeight="bold">
                {n1}
              </Text>
            </HStack>
            <HStack alignItems="center">
              <WinnerBadge num="2" />
              <Text
                color="gray.700"
                fontFamily="Roboto-Bold"
                fontSize={DEVICE_WIDTH <= 320 ? 'xs' : 'md'}
                fontWeight="bold">
                {n2}
              </Text>
            </HStack>
            <HStack alignItems="center">
              <WinnerBadge num="3" />
              <Text
                color="gray.700"
                fontFamily="Roboto-Bold"
                fontSize={DEVICE_WIDTH <= 320 ? 'xs' : 'md'}
                fontWeight="bold">
                {n3}
              </Text>
            </HStack>
          </HStack>
        </VStack>
      </HStack>
      {inReorderMode ? (
        <Icon name="menu" size={24} color="#000" />
      ) : (
        <Icon name="chevron-small-right" size={24} color="gray" />
      )}
    </HStack>
  );
};

export default DashboardRow;
