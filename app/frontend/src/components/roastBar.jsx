import { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { calculateRoastProgress } from "./utils";

/**
 * TODO this will become a lot more complex, but, this should show what we TRIED to do vs what we did...
 * TODO how to display "over" target (I think we change the bar and the way it works...)
 * @param {*} param0
 * @returns
 */
export const RoastBar = ({ startedWhen, targetWhen, endedWhen, hide }) => {
  if (hide) {
    return null;
  }

  const [progress, setProgress] = useState(
    calculateRoastProgress(startedWhen, targetWhen, endedWhen)
  );

  // TODO we should stop calculating IF we have an ended when time, and keep the bar still
  // TODO we can use start / end / target to determine accuracy and closeness of value of the prediction vs what was done
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(calculateRoastProgress(startedWhen, targetWhen, endedWhen));
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {`${Math.round(progress)}%`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
