import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";

import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TimelineIcon from "@mui/icons-material/Timeline";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";

import api from "../../api/coffee-roasting-api";
import { CoffeeRoastingMenu } from "../../components/menu";
import { RoastBar } from "../../components/roastBar";
import { RoastTargetTimePicker } from "../../components/roastTargetTimePicker";
import { CoffeRoastingModal } from "../../components/modal";
import { RoastEventItem } from "../../components/events/roastEventItem";

/**
 * Quick little reference so we can define some logic and quickly change the UI.
 */
const RoastState = {
  PREP: "prep",
  PRESTART: "pre-started",
  STARTED: "started",
  ENDED: "ended",
};

// TODO if this roast is "completed" we should mark everything as read only
// TODO separate the roasts from the events, it's just easier to handle them separately at this point
export const ManageRoast = () => {
  let navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  // could grab event types via api if it's easier to maintain
  // This is ordered by liklihood, and we will compare last event to this one
  // TODO maybe rank them in an object or something to make it more clear / maintainable?
  // TODO move to util
  const allEventTypes = {
    BEGIN: "begin",
    NOTE: "note",
    DRY_PHASE: "dry_phase",
    FIRST_CRACK: "first_crack",
    SECOND_CRACK: "second_crack",
    DROP: "drop",
  };

  const availableEventTypes = [
    "note",
    "dry_phase",
    "first_crack",
    "second_crack",
  ];

  const [roast, setRoast] = useState();
  const [roastState, setRoastState] = useState();
  const [loading, setLoading] = useState(true);
  const [openNewEventModal, setOpenNewEventModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState();
  const [generalNotes, setGeneralNotes] = useState();
  // TODO maybe define the default in just 1 place
  const [selectedEventType, setSelectedEventType] = useState(
    availableEventTypes[0]
  );
  const [openDeleteRoastModal, setOpenDeleteRoastModal] = useState(false);

  // We use strings to handle the 00 and also it concatenates all
  // into a string to be passed to the API, easier this way.
  const [openTargetModal, setOpenTargetModal] = useState(false);
  const [targetMinute, setTargetMinute] = useState("13");
  const [targetSecond, setTargetSecond] = useState("00");

  const getRoast = async () => {
    const response = await api.roasts.get(id);
    setRoast(response.data);
    setGeneralNotes(response.data.notes);
    setCurrentEvent(response.data.roast_event[0]);
  };

  useEffect(() => {
    const initialize = async () => {
      await getRoast();
      setLoading(false);
    };
    initialize();
  }, []);

  useEffect(() => {
    if (roast) {
      setRoastState(determineRoastState());
    }
  }, [roast]);

  // get roast returns events too... so, likely need to separate that into its own API call and whatnot...
  const updateTargetTime = async () => {
    try {
      await api.roasts.partialUpdate(id, {
        target_duration: `${targetMinute}:${targetSecond}`,
      });
      await getRoast();
    } catch (error) {
      console.error(error);
    }
  };

  const updateGeneralNotes = async () => {
    try {
      await api.roasts.partialUpdate(roast.id, { notes: generalNotes });
    } catch (error) {
      console.error(error);
    }
  };

  const beginRoast = async () => {
    try {
      await api.roasts.beginRoast(id);
      await getRoast();
      toast.success("Roast has begun");
    } catch (error) {
      // TODO not sure if I care for toast or would prefer just the MUI component...
      // TODO setup a service for using toast...
      toast.error("There was an error");
      console.error(error);
    }
  };

  // I hate making 2 api calls, however, for some reason setRoast on the
  // response.data of the start / end endpoints did not refresh the data...
  const endRoast = async () => {
    try {
      await api.roasts.endRoast(id);
      await getRoast();
    } catch (error) {
      toast.error("There was an error");
      console.error(error);
    }
  };

  // TODO we need to make sure we close out the old roast event...
  // TODO lets make this a modal / UI modal
  const addRoastEvent = async (eventType) => {
    try {
      const now = new Date();
      await api.roastEvents.partialUpdate(currentEvent.id, { ended_when: now });
      await api.roastEvents.create({
        roast: roast.id,
        type: eventType,
        started_when: now,
      });
      await getRoast();
    } catch (error) {
      console.error(error);
    } finally {
      setSelectedEventType(availableEventTypes[0]);
      setOpenNewEventModal(false);
    }
  };

  const deleteRoast = async () => {
    try {
      await api.roasts.delete(id);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const friendlyEventType = (name) => {
    if (name === allEventTypes.BEGIN) {
      return "Begin";
    } else if (name === allEventTypes.NOTE) {
      return "Note";
    } else if (name === allEventTypes.DRY_PHASE) {
      return "Dry Phase";
    } else if (name === allEventTypes.FIRST_CRACK) {
      return "First Crack";
    } else if (name === allEventTypes.SECOND_CRACK) {
      return "Second Crack";
    } else if (name === allEventTypes.DROP) {
      return "Drop";
    }
  };

  /***
   * Only allow events if we've started a raost but have not dropped / completed it.
   */
  const disableEvents = () => {
    if (roast.started_when && !roast.ended_when) {
      return false;
    }
    return true;
  };

  const disableTargets = () => {
    if (roast.started_when) {
      return true;
    }
    return false;
  };

  const hideRoastBar = () => {
    if (!roast.started_when) {
      return true;
    }
    return false;
  };

  const determineRoastState = () => {
    if (!roast.target_duration && !roast.started_when) {
      return RoastState.PREP;
    } else if (roast.target_duration && !roast.started_when) {
      return RoastState.PRESTART;
    } else if (
      roast.target_duration &&
      roast.started_when &&
      !roast.ended_when
    ) {
      return RoastState.STARTED;
    }
    return RoastState.ENDED;
  };

  const handleTopRightButtonDisplayState = () => {
    if (roastState === RoastState.PREP) {
      return "Set Target Time";
    } else if (roastState === RoastState.PRESTART) {
      return "Start Roast";
    } else if (roastState === RoastState.STARTED) {
      return "End Roast";
    } else if (roastState === RoastState.ENDED) {
      return "Delete Roast";
    }
  };

  const handleTopRightButtonFunctionalityState = async () => {
    if (roastState === RoastState.PREP) {
      setOpenTargetModal(true);
    } else if (roastState === RoastState.PRESTART) {
      await beginRoast();
    } else if (roastState === RoastState.STARTED) {
      await endRoast();
    } else if (roastState === RoastState.ENDED) {
      setOpenDeleteRoastModal(true);
    }
  };

  console.log(currentEvent, "currentEvent");

  return (
    <CoffeeRoastingMenu
      title={"Manage Roast"}
      rightSideMenuBar={
        <Button
          onClick={async () => {
            await handleTopRightButtonFunctionalityState();
          }}
        >
          {handleTopRightButtonDisplayState()}
        </Button>
      }
    >
      {!loading && (
        <>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
            <AccessTimeIcon /> Roast Progress
            <RoastBar
              hide={hideRoastBar()}
              startedWhen={roast.started_when}
              targetWhen={roast.target_when}
              endedWhen={roast.ended_when}
            />
          </Grid>
          <Grid sx={{ p: 3 }} size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
            <TimelineIcon /> Roast Event Timeline
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {roast.roast_event.map((event) => {
                return (
                  <RoastEventItem key={event.id} roast={roast} event={event} />
                );
              })}
            </List>
          </Grid>
          {!roast.ended_when && (
            <Button
              disabled={disableEvents()}
              onClick={async () => {
                setOpenNewEventModal(true);
              }}
            >
              Add Event
            </Button>
          )}
          {roast.ended_when && (
            <Grid
              size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
              sx={{ p: 3 }}
            >
              <Divider sx={{ pb: 3 }}>
                <Typography>General Notes</Typography>
              </Divider>
              <Grid
                size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
                sx={{ pb: 3 }}
              >
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                  <TextField
                    onBlur={async () => {
                      await updateGeneralNotes();
                    }}
                    onChange={(e) => {
                      setGeneralNotes(e.target.value);
                    }}
                    label="Notes"
                    value={generalNotes}
                    helperText={`Feel free to leave any general notes`}
                    fullWidth
                    multiline
                    variant="filled"
                    rows="4"
                    slotProps={{
                      input: {
                        sx: {
                          resize: "vertical",
                          minHeight: 100,
                          maxHeight: 400,
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
          <CoffeRoastingModal
            open={openTargetModal}
            setOpen={setOpenTargetModal}
            title="Set Your Target Time"
            content={
              <RoastTargetTimePicker
                disabled={disableTargets()}
                minute={targetMinute}
                setMinute={setTargetMinute}
                second={targetSecond}
                setSecond={setTargetSecond}
              />
            }
            actions={
              <Grid>
                <Button
                  onClick={async () => {
                    try {
                      await updateTargetTime();
                      setOpenTargetModal(false);
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                >
                  Set Target
                </Button>
              </Grid>
            }
          />
          <CoffeRoastingModal
            open={openNewEventModal}
            setOpen={setOpenNewEventModal}
            title={<Typography>New Event</Typography>}
            content={
              <>
                <TextField
                  select
                  label="Origin"
                  defaultValue={availableEventTypes[0]}
                  helperText={`What part of the roast is starting?`}
                >
                  {availableEventTypes.map((eventType, index) => {
                    return (
                      <MenuItem
                        onClick={() => {
                          setSelectedEventType(eventType);
                        }}
                        key={index}
                        value={eventType}
                      >
                        {friendlyEventType(eventType)}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </>
            }
            actions={
              <>
                <Button
                  onClick={() => {
                    setOpenNewEventModal(false);
                  }}
                >
                  Back
                </Button>
                <Button
                  onClick={async () => {
                    await addRoastEvent(selectedEventType);
                  }}
                >
                  Start Event
                </Button>
              </>
            }
          />
          <CoffeRoastingModal
            open={openDeleteRoastModal}
            setOpen={setOpenDeleteRoastModal}
            title={<Typography>Delete Roast?</Typography>}
            content={
              <Typography>
                Are you absolutely certain you want to delete the roast?
              </Typography>
            }
            actions={
              <>
                <Button
                  onClick={() => {
                    setOpenDeleteRoastModal(false);
                  }}
                >
                  Nope
                </Button>
                <Button
                  onClick={async () => {
                    await deleteRoast(selectedEventType);
                  }}
                >
                  I've made my peace
                </Button>
              </>
            }
          />
        </>
      )}
    </CoffeeRoastingMenu>
  );
};
