import { useEffect, useState } from 'react';
import { RadarChart } from '@mui/x-charts/RadarChart';
import api from '../api/coffee-roasting-api';

// TODO rename this file / component
// TODO do we need a endpoint to generate this data?
export const CoffeeCuppingRadar = ({ profileId, reload }) => {
  const [analytics, setAnalytics] = useState();

  const getData = async () => {
    const response = await api.roastProfileFlavors.getAnalytics();
  };

  // you can flip the reload bool back and forth to control the reload functionality
  // alternatively could just set it to an incremental counter to enforce useEffect reload
  useEffect(() => {
    const initialize = async () => {
      await getData();
    };

    if (reload) {
      initialize();
    }
  }, [reload]);

  return (
    <RadarChart
      height={300}
      series={[{ label: 'Lisa', data: [120, 98, 86, 99, 85, 65] }]}
      radar={{
        max: 120,
        metrics: [
          'Math',
          'Chinese',
          'English',
          'Geography',
          'Physics',
          'History',
        ],
      }}
    />
  );
};
