import { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const populateMinutes = () => {
  let newMinute = 10;
  const minuteArray = [];
  while (newMinute <= 20) {
    minuteArray.push(newMinute);
    newMinute = newMinute + 1;
  }
  return minuteArray;
};

const minutes = populateMinutes();

const populateSeconds = () => {
  let newSecond = 1;
  const secondArray = [];
  while (newSecond <= 60) {
    secondArray.push(newSecond);
    newSecond = newSecond + 1;
  }
  return secondArray;
};

const seconds = populateSeconds();
console.log(minutes, "minutes");
console.log(seconds, "seconds");

/**
 * Allows you to pick expected minutes - seconds that the roast will go for.
 * We use this to calculate the target time later to give input on how close the user is to
 * having their roast completed when they view the page.
 * @returns
 */
export const RoastTargetTimePicker = () => {
  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      {minutes && (
        <div>
          <TextField
            select
            label="Minutes"
            defaultValue={15}
            helperText="Please select your minutes to roast"
          >
            {minutes.map((minute) => (
              <MenuItem key={minute} value={minute} defaultValue={minute[13]}>
                {minute}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Seconds"
            defaultValue={seconds[0]}
            helperText="Please select your seconds to roast"
          >
            {seconds.map((second) => (
              <MenuItem key={second} value={second} defaultValue={second[0]}>
                {second}
              </MenuItem>
            ))}
          </TextField>
        </div>
      )}
    </Box>
  );
};
