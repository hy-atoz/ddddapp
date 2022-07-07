import React, {useState} from 'react';
import {Platform} from 'react-native';
import {HStack, Pressable, ScrollView, Switch, Text, VStack} from 'native-base';
import SectionTitle from '../components/SectionTitle';
import SettingItem from '../components/SettingItem';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {APP, LINK_OPTIONS, PRIVACY_URL} from '../constants';
import {useDispatch, useSelector} from 'react-redux';
import {setScreenOn} from '../features/setting';

const SettingScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedVoice, setSelectedVoice] = useState('cn');

  const dispatch = useDispatch();
  const screenOn = useSelector(state => state.setting.screenOn);

  const onLanguageChange = lang => {
    setSelectedLanguage(lang);
  };

  const onVoiceChange = lang => {
    setSelectedVoice(lang);
  };

  // Open external link in the in-app browser
  // Link: https://github.com/proyecto26/react-native-inappbrowser
  const openExternalLink = async url => {
    InAppBrowser.open(url, LINK_OPTIONS);
  };

  return (
    <ScrollView alwaysBounceVertical={false}>
      <VStack>
        <SectionTitle
          backgroundColor="gray.300"
          color="gray.700"
          fontWeight="normal"
          isSettingPage
          title="Language"
        />
        <VStack>
          <SettingItem
            isSelected={selectedLanguage === 'en'}
            onPress={() => onLanguageChange('en')}
            text="English"
          />
          <SettingItem
            isLast
            isSelected={selectedLanguage === 'cn'}
            onPress={() => onLanguageChange('cn')}
            text="中文"
          />
        </VStack>
      </VStack>
      <VStack>
        <SectionTitle
          backgroundColor="gray.300"
          color="gray.700"
          fontWeight="normal"
          isSettingPage
          title="Voice"
        />
        <VStack>
          <SettingItem
            isSelected={selectedVoice === 'en'}
            onPress={() => onVoiceChange('en')}
            text="English"
          />
          <SettingItem
            isSelected={selectedVoice === 'cn'}
            onPress={() => onVoiceChange('cn')}
            text="中文"
          />
          <SettingItem
            isLast
            isSelected={selectedVoice === 'my'}
            onPress={() => onVoiceChange('my')}
            text="Malay"
          />
        </VStack>
      </VStack>
      <VStack>
        <SectionTitle
          backgroundColor="gray.300"
          color="gray.700"
          fontWeight="normal"
          isSettingPage
          title="Other"
        />
        <HStack
          alignItems="center"
          borderBottomColor="gray.200"
          borderBottomWidth="1"
          justifyContent="space-between"
          paddingX={4}
          paddingY={2}>
          <Text>Keep Screen On</Text>
          <Switch
            isChecked={screenOn}
            onToggle={() => dispatch(setScreenOn(!screenOn))}
            onTrackColor="green.500"
            size={Platform.OS === 'ios' ? 'sm' : 'md'}
          />
        </HStack>
        <Pressable
          alignItems="center"
          borderBottomColor="gray.200"
          borderBottomWidth="1"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          onPress={() => openExternalLink('https://google.com')}
          paddingX={4}
          paddingY={3}>
          <HStack alignItems="center" space={2}>
            <FontAwesome color="#fbbf24" name="star" size={20} />
            <Text>Rate for 4DNum!</Text>
          </HStack>
          <Entypo name="chevron-small-right" size={24} color="gray" />
        </Pressable>
        <Pressable
          alignItems="center"
          borderBottomColor="gray.200"
          borderBottomWidth="1"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          onPress={() => openExternalLink(PRIVACY_URL)}
          paddingX={4}
          paddingY={3}>
          <HStack alignItems="center" space={2}>
            <FontAwesome5 color="#0478BB" name="info-circle" size={20} />
            <Text>Privacy Policy</Text>
          </HStack>
          <Entypo name="chevron-small-right" size={24} color="gray" />
        </Pressable>
        <HStack
          alignItems="center"
          borderBottomColor="gray.200"
          borderBottomWidth="1"
          justifyContent="space-between"
          paddingX={4}
          paddingY={3}>
          <HStack alignItems="center" space={2} marginLeft="0.5">
            {Platform.OS === 'ios' ? (
              <FontAwesome color="gray" name="apple" size={20} />
            ) : (
              <FontAwesome color="gray" name="android" size={20} />
            )}
            <Text marginLeft="0.5">Version {APP.VERSION}</Text>
          </HStack>
        </HStack>
      </VStack>
    </ScrollView>
  );
};

export default SettingScreen;
