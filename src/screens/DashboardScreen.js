import React from 'react';
import {ScrollView} from 'native-base';
import DashboardRow from '../components/DashboardRow';
import c from '../constants/companies';

const DashboardScreen = () => {
  return (
    <ScrollView alwaysBounceVertical={false}>
      {c.map(company => (
        <DashboardRow
          key={company.id}
          companyCode={company.code}
          companyName={company.name_en}
          source={company.image}
        />
      ))}
    </ScrollView>
  );
};

export default DashboardScreen;
