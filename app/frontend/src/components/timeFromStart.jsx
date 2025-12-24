import { Grid } from "@mui/material";
import { differenceInSeconds } from "date-fns";

/**
 * TODO should we just calculate this on the record instead?
 
 */
export const TimeFromStart = ({ roastStart, eventCreated }) => {
  // TODO maybe throw some of this logic into a util function?
  const start = new Date(roastStart);
  const end = new Date(eventCreated);
  const totalSeconds = Math.abs(differenceInSeconds(end, start));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  return (
    <Grid
      sx={(theme) => ({
        color: theme.palette.primary.main,
      })}
    >
      {formattedTime}
    </Grid>
  );
};
