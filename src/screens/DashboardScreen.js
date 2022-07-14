import AsyncStorage from '@react-native-async-storage/async-storage';
import {HStack, Image, Pressable, Text, VStack} from 'native-base';
import React, {useLayoutEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import DraggableFlatList, {
  OpacityDecorator,
} from 'react-native-draggable-flatlist';
import Icon from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../components/CustomButton';
import WinnerBadge from '../components/WinnerBadge';
import {updateOrder} from '../features/company';
import {ORDER_STORAGE_KEY} from '../i18n';
import getItem from '../utils/getItem';

const DEVICE_WIDTH = Dimensions.get('window').width;

const DashboardScreen = ({navigation}) => {
  const [reorderMode, setReorderMode] = useState(false);
  const companies = useSelector(state => state.company.value);
  const result = useSelector(state => state.result.value);
  const dispatch = useDispatch();

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(ORDER_STORAGE_KEY, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomButton
          title={reorderMode ? 'Done' : 'Reorder'}
          onPress={() => setReorderMode(!reorderMode)}
        />
      ),
    });
  }, [navigation, reorderMode]);

  const renderItem = ({item, drag, isActive}) => {
    const fdData = getItem(result, item.code).fdData;
    const {day, dn, n1, n2, n3} = fdData;

    return (
      <OpacityDecorator>
        <Pressable disabled={isActive} onPressIn={reorderMode ? drag : null}>
          <HStack
            alignItems="center"
            borderBottomWidth="0.5"
            borderBottomColor="muted.300"
            justifyContent="space-between"
            paddingX={DEVICE_WIDTH <= 320 ? 2 : 4}
            paddingY={3}>
            <HStack alignItems="center" space={4}>
              <Image
                alt={item.name_en}
                height={DEVICE_WIDTH <= 320 ? 8 : 10}
                width={DEVICE_WIDTH <= 320 ? 8 : 10}
                source={item.image}
              />
              <VStack space={1}>
                <Text
                  color="black"
                  fontSize={DEVICE_WIDTH <= 320 ? 'xs' : 'sm'}
                  fontWeight="bold">
                  {item.name_en} [{dn || '---/--'}] [{day || '---'}]
                </Text>
                <HStack space={DEVICE_WIDTH <= 320 ? 4 : 6}>
                  <HStack alignItems="center">
                    <WinnerBadge isFirst num="1" />
                    <Text
                      color="gray.700"
                      fontFamily="Roboto-Bold"
                      fontSize={DEVICE_WIDTH <= 320 ? 'xs' : 'md'}
                      fontWeight="bold">
                      {n1 || '----'}
                    </Text>
                  </HStack>
                  <HStack alignItems="center">
                    <WinnerBadge num="2" />
                    <Text
                      color="gray.700"
                      fontFamily="Roboto-Bold"
                      fontSize={DEVICE_WIDTH <= 320 ? 'xs' : 'md'}
                      fontWeight="bold">
                      {n2 || '----'}
                    </Text>
                  </HStack>
                  <HStack alignItems="center">
                    <WinnerBadge num="3" />
                    <Text
                      color="gray.700"
                      fontFamily="Roboto-Bold"
                      fontSize={DEVICE_WIDTH <= 320 ? 'xs' : 'md'}
                      fontWeight="bold">
                      {n3 || '----'}
                    </Text>
                  </HStack>
                </HStack>
              </VStack>
            </HStack>
            {reorderMode ? (
              <Icon name="menu" size={24} color="#000" />
            ) : (
              <Icon name="chevron-small-right" size={24} color="gray" />
            )}
          </HStack>
        </Pressable>
      </OpacityDecorator>
    );
  };

  return (
    <DraggableFlatList
      data={companies}
      onDragEnd={({data}) => {
        dispatch(updateOrder(data));
        storeData(data);
      }}
      keyExtractor={item => item.id}
      renderItem={renderItem}
    />
  );
};

export default DashboardScreen;
