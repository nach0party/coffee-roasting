import { parseISO, format } from "date-fns";


/**
 * Calculates the progress percentage (0 to 100) between a start and target time.
 * If an end time is provided and is before the target time, the progress pins
 * at the moment the end time occurred.
 */
export const calculateRoastProgress = (startedWhen, targetWhen, endedWhen) => {
  const start = new Date(startedWhen);
  const target = new Date(targetWhen);
  const now = new Date();

  let momentOfMeasurement = now;
  if (endedWhen) {
    const end = new Date(endedWhen);
    if (end.getTime() < target.getTime()) {
      momentOfMeasurement = end;
    }
  }

  const startMs = start.getTime();
  const targetMs = target.getTime();
  const measurementMs = momentOfMeasurement.getTime();
  const totalDuration = targetMs - startMs;
  if (totalDuration <= 0) {
    return 0;
  }

  const elapsedTimeMs = measurementMs - startMs;
  const progressRatio = elapsedTimeMs / totalDuration;
  const percentage = Math.round(progressRatio * 100);
  return Math.max(0, Math.min(100, percentage));
};

/**
 * Takes an ISO 8601 timestamp and parses it into a nice looking time.
 * @param {*} timestamp
 */
export const formatDate = (timestamp) => {
  const date = parseISO(timestamp);
  return format(date, "EEEE, MMMM do, yyyy h:mm a");
};
