import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {Box, Heading, HStack, SectionList, Text, VStack} from 'native-base';
import {APP} from '../constants';
import SectionTitle from '../components/SectionTitle';
import SettingItem from '../components/SettingItem';

const Item = ({borderBottomWidth, title}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedVoice, setSelectedVoice] = useState('en');

  return (
    <Pressable onPress={() => console.log('you clicked me')}>
      <HStack
        borderBottomColor="gray.200"
        borderBottomWidth={borderBottomWidth}
        justifyContent="space-between"
        paddingX={4}
        paddingY={3}>
        <Text>{title}</Text>
        <Text>selected</Text>
      </HStack>
    </Pressable>
  );
};

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
    // {
    //   title: 'Others',
    //   data: ['Keep screen on'],
    // },
  ];

  return (
    // <SectionList
    //   alwaysBounceVertical={false}
    //   keyExtractor={(item, index) => item + index}
    //   sections={LANGUAGES}
    //   stickySectionHeadersEnabled={false}
    //   renderItem={({index, item, section}) => (
    //     <Item
    //       borderBottomWidth={index === section.data.length - 1 ? 0 : 1}
    //       title={item}
    //     />
    //   )}
    //   renderSectionHeader={({section: {title}}) => (
    //     <Box bgColor={APP.TITLE_BG}>
    //       <Heading color="white" fontSize="xs" paddingX={4} paddingY={2}>
    //         {title}
    //       </Heading>
    //     </Box>
    //   )}
    // />
    <>
      <VStack>
        <SectionTitle isSettingPage title="Language" />
        <VStack>
          <SettingItem
            isSelected
            onPress={() => console.log('hello')}
            text="English"
          />
          <SettingItem
            isLast
            onPress={() => console.log('hello')}
            text="中文"
          />
        </VStack>
      </VStack>
      <SectionTitle isSettingPage title="Voice" />
      <SectionTitle isSettingPage title="Others" />
    </>
  );
};

export default SettingScreen;
