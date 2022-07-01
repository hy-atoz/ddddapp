import React from 'react';
import {Pressable} from 'react-native';
import {Box, Heading, SectionList, Text} from 'native-base';

const Item = ({borderBottomWidth, title}) => (
  <Pressable onPress={() => console.log('you clicked me')}>
    <Box
      borderBottomColor="gray.200"
      borderBottomWidth={borderBottomWidth}
      paddingX={4}
      paddingY={3}>
      <Text>{title}</Text>
    </Box>
  </Pressable>
);

const SettingScreen = () => {
  const LANGUAGES = [
    {
      title: 'Language',
      data: ['English', '中文'],
    },
    {
      title: 'Voice',
      data: ['English', '中文', 'Malay'],
    },
    {
      title: 'Others',
      data: ['Keep screen on'],
    },
  ];

  return (
    <SectionList
      alwaysBounceVertical={false}
      keyExtractor={(item, index) => item + index}
      sections={LANGUAGES}
      stickySectionHeadersEnabled={false}
      renderItem={({index, item, section}) => (
        <Item
          borderBottomWidth={index === section.data.length - 1 ? 0 : 1}
          title={item}
        />
      )}
      renderSectionHeader={({section: {title}}) => (
        <Box bgColor="muted.200">
          <Heading color="gray.700" fontSize="xs" paddingX={4} paddingY={2}>
            {title}
          </Heading>
        </Box>
      )}
    />
  );
};

export default SettingScreen;
