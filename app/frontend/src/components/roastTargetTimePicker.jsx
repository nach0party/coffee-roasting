import { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";

const populateMinutes = () => {
  let newMinute = 10;
  const minuteArray = [];
  while (newMinute <= 20) {
    let stringMinute = String(newMinute);
    minuteArray.push(stringMinute);
    newMinute = newMinute + 1;
  }
  return minuteArray;
};

const minutes = populateMinutes();

const populateSeconds = () => {
  let newSecond = 0;
  const secondArray = [];
  while (newSecond <= 60) {
    let stringSecond = String(newSecond);
    if (newSecond <= 9) {
      stringSecond = `0${stringSecond}`;
    }
    secondArray.push(stringSecond);
    newSecond = newSecond + 1;
  }
  return secondArray;
};

const seconds = populateSeconds();

/**
 * Allows you to pick expected minutes - seconds that the roast will go for.
 * We use this to calculate the target time later to give input on how close the user is to
 * having their roast completed when they view the page.
 * @returns
 */
export const RoastTargetTimePicker = ({
  minute,
  setMinute,
  second,
  setSecond,
  disabled,
}) => {
  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      {minutes && (
        <Grid
          container
          spacing={0.5}
          columnGap={0}
          sx={{ justifyContent: "flex-start" }}
        >
          <Grid size="auto">
            {/* <Grid size={{ xs: 12, md: 12, lg: 6, xl: 6 }}> */}
            <TextField
              disabled={disabled}
              select
              label="Minutes"
              defaultValue={minute}
              helperText="Please select your minutes to roast"
            >
              {minutes.map((possibleMinute) => (
                <MenuItem
                  onClick={() => {
                    setMinute(possibleMinute);
                  }}
                  key={possibleMinute}
                  value={possibleMinute}
                  defaultValue={minute}
                >
                  {possibleMinute}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size="auto">
            {/* <Grid size={{ xs: 12, md: 12, lg: 6, xl: 6 }}> */}
            <TextField
              disabled={disabled}
              select
              label="Seconds"
              defaultValue={second}
              helperText="Please select your seconds to roast"
            >
              {seconds.map((availableSecond) => (
                <MenuItem
                  onClick={async () => {
                    setSecond(availableSecond);
                  }}
                  key={availableSecond}
                  value={availableSecond}
                  defaultValue={second}
                >
                  {availableSecond}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
