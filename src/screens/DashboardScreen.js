import React, {useLayoutEffect, useState} from 'react';
import {ScrollView} from 'native-base';
import DashboardRow from '../components/DashboardRow';
import c from '../constants/companies';
import CustomButton from '../components/CustomButton';

const DashboardScreen = ({navigation}) => {
  const [reorderMode, setReorderMode] = useState(false);

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

  return (
    <ScrollView alwaysBounceVertical={false}>
      {c.map(company => (
        <DashboardRow
          key={company.id}
          companyCode={company.code}
          companyName={company.name_en}
          inReorderMode={reorderMode}
          source={company.image}
        />
      ))}
    </ScrollView>
  );
};

export default DashboardScreen;
