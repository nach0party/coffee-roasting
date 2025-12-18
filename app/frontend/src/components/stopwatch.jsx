import { useState, useEffect, useRef } from "react";
import { Typography } from "@mui/material";
import { differenceInMilliseconds } from "date-fns";

export const Stopwatch = ({
  startTime,
  endTime,
  run,
  setRun,
  sx,
  variant,
  hide,
}) => {
  if (hide) {
    return null;
  }

  const start = new Date(startTime);
  let now = new Date();
  // Make sure you pin the end time
  // Do not allow the stopwatch to run no matter what if there is a real end time...
  if (endTime) {
    now = new Date(endTime);
    setRun(false);
  }
  const startingMilliseconds = differenceInMilliseconds(now, start);
  const [time, setTime] = useState(startingMilliseconds);
  const timerRef = useRef(null);

  // TODO get this to be a bit more accurate, it's off by a few milliseconds
  // likely due to the way I'm doing the calculations
  useEffect(() => {
    if (run) {
      timerRef.current = setInterval(() => {
        setTime((startingMilliseconds) => {
          return startingMilliseconds + 10;
        });
      }, 10);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [run]);

  const formatTime = (ms) => {
    const totalCentiseconds = Math.floor(ms / 10);
    const centiseconds = totalCentiseconds % 100;
    const totalSeconds = Math.floor(totalCentiseconds / 100);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600);
    const pad = (num, length = 2) => String(num).padStart(length, "0");

    if (hours > 0) {
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(
        centiseconds
      )}`;
    }
    return `${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`;
  };

  return (
    <Typography variant={variant} sx={sx}>
      {formatTime(time)}
    </Typography>
  );
};
