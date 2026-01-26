/**
 * Quick little reference so we can define some logic and quickly change the UI.
 */
export const RoastState = {
  PREP: "prep",
  PRESTART: "pre-started",
  STARTED: "started",
  ENDED: "ended",
};

/**
 * Assists in determining what roast states exist in the application.
 * TODO maybe should be backend driven for simplification purposes?
 * PROS: less custom code
 * CONS: more API calls to know state when it changes
 * @returns
 */
export const determineRoastState = (roast) => {
  if (!roast.target_duration && !roast.started_when) {
    return RoastState.PREP;
  } else if (roast.target_duration && !roast.started_when) {
    return RoastState.PRESTART;
  } else if (roast.target_duration && roast.started_when && !roast.ended_when) {
    return RoastState.STARTED;
  }
  return RoastState.ENDED;
};

/**
 * Just some friendly roast state translations.
 * TODO consider having this backend driven.
 * @param {*} roastData
 * @returns
 */
export const displayFriendlyRoastState = (roastData) => {
  const state = determineRoastState(roastData);
  if (state === RoastState.PREP) {
    return "Prepping";
  } else if (state === RoastState.PRESTART) {
    return "Pre-Start";
  } else if (state === RoastState.STARTED) {
    return "In Progress";
  } else if (state === RoastState.ENDED) {
    return "Complete";
  }
};
