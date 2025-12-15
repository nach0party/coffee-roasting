import { BeginRoastEvent } from "./begin";
import { NoteRoastEvent } from "./note";
import { DryPhaseRoastEvent } from "./dryPhase";
import { FirstCrackRoastEvent } from "./firstCrack";
import { SecondCrackRoastEvent } from "./secondCrack";
import { DropRoastEvent } from "./drop";
import Stack from "@mui/material/Stack";

const allEventTypes = {
  BEGIN: "begin",
  NOTE: "note",
  DRY_PHASE: "dry_phase",
  FIRST_CRACK: "first_crack",
  SECOND_CRACK: "second_crack",
  DROP: "drop",
};

/**
 * Just handles / centralizes some routing around the different event types.
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
      {event.type === allEventTypes.DRY_PHASE && (
        <DryPhaseRoastEvent roast={roast} event={event} />
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
    </Stack>
  );
};
