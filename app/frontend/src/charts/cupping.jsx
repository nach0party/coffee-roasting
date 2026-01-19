import { useTheme } from '@mui/material/styles';
import { RadarChart } from '@mui/x-charts/RadarChart';

// TODO rename this file / component
// TODO do we need a endpoint to generate this data?
export const CoffeeCuppingRadar = ({ data }) => {
  const muiTheme = useTheme();
  const brandOrange = muiTheme.palette.primary.main;

  console.log(data, 'data');

  return (
    <RadarChart
      colors={() => {
        return [brandOrange];
      }}
      shape="sharp"
      height={300}
      series={[{ label: data?.label || '', data: data?.series_data || [] }]}
      radar={{
        max: 100,
        metrics: data?.metrics || [],
      }}
    />
  );
};
