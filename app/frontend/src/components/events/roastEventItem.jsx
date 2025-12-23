import Stack from "@mui/material/Stack";

import { BeginRoastEvent } from "./begin";
import { NoteRoastEvent } from "./note";
import { DryPhaseRoastEvent } from "./dryPhase";
import { FirstCrackRoastEvent } from "./firstCrack";
import { SecondCrackRoastEvent } from "./secondCrack";
import { DropRoastEvent } from "./drop";
import { allEventTypes } from "./utils";
import { EmergencyStopEvent } from "./emergencyStop";
import { CoolingEvent } from "./coolingEvent";

/**
 * Just handles / centralizes some routing and granular control of
 * an event based component around the different event types.
 */
export const RoastEventItem = ({ roast, event }) => {
  return (
    <Stack sx={{ width: "100%" }}>
      {event.type === allEventTypes.BEGIN && (
        <BeginRoastEvent roast={roast} event={event} />
      )}
      {event.type === allEventTypes.NOTE && (
        <NoteRoastEvent roast={roast} event={event} />
      )}
      {event.type === allEventTypes.DRY_PHASE_START && (
        <DryPhaseRoastEvent roast={roast} event={event} />
      )}
      {event.type === allEventTypes.DRY_PHASE_END && (
        <DryPhaseRoastEvent roast={roast} event={event} />
      )}
      {event.type === allEventTypes.EMERGENCY_STOP && (
        <EmergencyStopEvent roast={roast} event={event} />
      )}
      {event.type === allEventTypes.FIRST_CRACK && (
        <FirstCrackRoastEvent roast={roast} event={event} />
      )}
      {event.type === allEventTypes.SECOND_CRACK && (
        <SecondCrackRoastEvent roast={roast} event={event} />
      )}
      {event.type === allEventTypes.DROP && (
        <DropRoastEvent roast={roast} event={event} />
      )}
      {event.type === allEventTypes.COOLING_START && (
        <CoolingEvent roast={roast} event={event} />
      )}
      {event.type === allEventTypes.COOLING_STOP && (
        <CoolingEvent roast={roast} event={event} />
      )}
    </Stack>
  );
};
