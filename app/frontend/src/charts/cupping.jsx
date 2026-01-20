import { useTheme } from '@mui/material/styles';
import { RadarChart } from '@mui/x-charts/RadarChart';

/**
 * This will break if you provide duplicate label / series data so be cautious with providing data.
 * @param {*} param0
 * @returns
 */
export const CoffeeCuppingRadar = ({ data }) => {
  const muiTheme = useTheme();
  const brandOrange = muiTheme.palette.primary.main;

  return (
    <>
      {data?.label && data?.series_data && data?.metrics && (
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
      )}
    </>
  );
};
