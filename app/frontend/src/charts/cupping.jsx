import { RadarChart } from "@mui/x-charts/RadarChart";

/**
 * Don't make this a named import.
 * @returns
 */
export default function CoffeeCuppingRadar() {
  return (
    <RadarChart
      height={300}
      series={[{ label: "Lisa", data: [120, 98, 86, 99, 85, 65] }]}
      radar={{
        max: 120,
        metrics: [
          "Math",
          "Chinese",
          "English",
          "Geography",
          "Physics",
          "History",
        ],
      }}
    />
  );
}
