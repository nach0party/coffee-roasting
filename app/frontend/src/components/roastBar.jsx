import { useState, useEffect } from "react";
// import { compareAsc } from "date-fns";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const LinearProgressWithLabel = (props) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

/**
 * TODO this will become a lot more complex, but, this should show what we TRIED to do vs what we did...
 * TODO how to display "over" target (I think we change the bar and the way it works...)
 * @param {*} param0
 * @returns
 */
export const RoastBar = ({ startedWhen, targetWhen, hide }) => {
  if (hide) {
    return null;
  }

  const [progress, setProgress] = useState(10);
  const [loading, setLoading] = useState(true);

  // TODO we should stop calculating IF we have an ended when time, and keep the bar still
  // TODO we can use start / end / target to determine accuracy and closeness of value of the prediction vs what was done
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(calculateProgress());
      setLoading(false);
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  /**
   * Calculates the progress bar, consider using date-fns to help simplify this but this does work right now.
   * @returns
   */
  const calculateProgress = () => {
    const start = new Date(startedWhen);
    const target = new Date(targetWhen);
    const now = new Date();

    const startMs = start.getTime();
    const targetMs = target.getTime();
    const currentMs = now.getTime();
    const totalDuration = targetMs - startMs;

    const elapsedTimeMs = currentMs - startMs;
    const progressRatio = elapsedTimeMs / totalDuration;

    const percentage = Math.round(progressRatio * 100);
    return Math.max(0, Math.min(100, percentage));
  };

  return (
    <Box sx={{ width: "100%" }}>
      {!loading && <LinearProgressWithLabel value={progress} />}
    </Box>
  );
};
