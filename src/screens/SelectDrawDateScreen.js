import {Box, Heading, Pressable, SectionList, Text} from 'native-base';
import React from 'react';

const SelectDrawDateScreen = ({navigation}) => {
  const data = [
    {
      title: 'This Week',
      data: [],
    },
    {
      title: 'Last Week',
      data: [
        {
          id: 0,
          date: '2022-07-10 (Sun)',
        },
        {
          id: 1,
          date: '2022-07-09 (Sat)',
        },
        {
          id: 2,
          date: '2022-07-06 (Wed)',
        },
      ],
    },
    {
      title: 'Last 2 Week',
      data: [
        {
          id: 0,
          date: '2022-07-03 (Sun)',
        },
        {
          id: 1,
          date: '2022-07-02 (Sat)',
        },
        {
          id: 2,
          date: '2022-06-29 (Wed)',
        },
        {
          id: 3,
          date: '2022-06-28 (Tue)',
        },
      ],
    },
    {
      title: 'Last 3 Week',
      data: [
        {
          id: 0,
          date: '2022-06-26 (Sun)',
        },
        {
          id: 1,
          date: '2022-06-25 (Sat)',
        },
        {
          id: 2,
          date: '2022-06-22 (Wed)',
        },
      ],
    },
  ];
  return (
    <SectionList
      bg="white"
      mb="4"
      w="100%"
      alwaysBounceVertical={false}
      keyExtractor={(item, index) => item + index}
      sections={data}
      stickySectionHeadersEnabled={false}
      renderItem={({item}) => (
        <Pressable
          borderBottomColor="gray.200"
          borderBottomWidth="1"
          onPress={() => navigation.navigate('Home', {date: item.date})}>
          <Text allowFontScaling={false} fontSize="xs" py="3" px="4">
            {item.date}
          </Text>
        </Pressable>
      )}
      renderSectionHeader={({section: {title}}) => (
        <Box backgroundColor="gray.300" px="4">
          <Heading allowFontScaling={false} color="black" fontSize="xs" my="2">
            {title}
          </Heading>
        </Box>
      )}
    />
  );
};

export default SelectDrawDateScreen;
