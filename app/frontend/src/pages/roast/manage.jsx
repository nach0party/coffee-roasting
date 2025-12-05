import { Fragment, useEffect, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import api from "../../api/coffee-roasting-api";
import toast from "react-hot-toast";

import { CoffeeRoastingMenu } from "../../components/menu";
import CoffeRoastingModal from "../../components/modal";
import MenuItem from "@mui/material/MenuItem";
import { RoastBar } from "../../components/roastBar";
import { RoastTargetTimePicker } from "../../components/roastTargetTimePicker";

// TODO if this roast is "completed" we should mark everything as read only
export const ManageRoast = () => {
  let navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  // could grab event types via api if it's easier to maintain
  // This is ordered by liklihood, and we will compare last event to this one
  // TODO maybe rank them in an object or something to make it more clear / maintainable?
  const allEventTypes = {
    BEGIN: "begin",
    PAUSE: "pause",
    DRY_PHASE: "dry_phase",
    FIRST_CRACK: "first_crack",
    SECOND_CRACK: "second_crack",
    DROP: "drop",
  };

  const availableEventTypes = [
    "pause",
    "dry_phase",
    "first_crack",
    "second_crack",
  ];

  const [roast, setRoast] = useState();
  const [loading, setLoading] = useState(true);
  const [openNewEventModal, setOpenNewEventModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState();
  // TODO maybe define the default in just 1 place
  const [selectedEventType, setSelectedEventType] = useState(
    availableEventTypes[0]
  );
  const [openDeleteRoastModal, setOpenDeleteRoastModal] = useState(false);

  const getRoast = async () => {
    const response = await api.roasts.get(id);
    setRoast(response.data);
    setCurrentEvent(response.data.roast_event[0]);
  };

  useEffect(() => {
    const initialize = async () => {
      await getRoast();
      setLoading(false);
    };
    initialize();
  }, []);

  const beginRoast = async () => {
    // setLoading(true);
    try {
      await api.roasts.beginRoast(id);
      await getRoast();
      toast.success("Roast has begun");
    } catch (error) {
      // TODO setup a service for using toast...
      toast.error("There was an error");
      console.error(error);
    } finally {
      // setLoading(false);
    }
  };

  // I hate making 2 api calls, however, for some reason setRoast on the
  // response.data of the start / end endpoints did not refresh the data...
  const endRoast = async () => {
    // setLoading(true);
    try {
      await api.roasts.endRoast(id);
      await getRoast();
    } catch (error) {
      toast.error("There was an error");
      console.error(error);
    } finally {
      // setLoading(false);
    }
  };

  // TODO we need to make sure we close out the old roast event...
  // TODO lets make this a modal / UI modal
  const addRoastEvent = async (eventType) => {
    try {
      await api.roastEvents.create({ roast: roast.id, type: eventType });
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
      const response = await api.roasts.delete(id);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Returns a nicely named event type.
   */

  // const allEventTypes = {
  //   BEGIN: "begin",
  //   PAUSE: "pause",
  //   DRY_PHASE : "dry_phase",
  //   FIRST_CRACK : "first_crack",
  //   SECOND_CRACK : "second_crack",
  //   DROP : "drop",
  // };

  const friendlyEventType = (name) => {
    if (name === allEventTypes.BEGIN) {
      return "Begin";
    } else if (name === allEventTypes.PAUSE) {
      return "Pause";
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

  const disableStartRoast = () => {
    if (roast.started_when) {
      return true;
    }
    return false;
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

  const disableEndRoast = () => {
    if (!roast.started_when || roast.ended_when) {
      return true;
    }
    return false;
  };

  console.log(roast, "roast");
  console.log(currentEvent, "currentEvent");
  console.log(selectedEventType, "selectedEventType");

  // TODO need to set a target temperature!
  // https://mui.com/x/react-charts/ definitely want to leverage this
  // TODO need a bean component
  // TODO need roast events / add / edit events
  return (
    <CoffeeRoastingMenu>
      {!loading && (
        <>
          <RoastTargetTimePicker />
          <Button
            onClick={async () => {
              await beginRoast();
            }}
            disabled={disableStartRoast()}
          >
            Begin Roast
          </Button>
          <Typography>Started when</Typography>
          <Typography>
            {roast.started_when ? roast.started_when : "--"}
          </Typography>
          <Typography>Ended when</Typography>
          <Typography>{roast.ended_when ? roast.ended_when : "--"}</Typography>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {roast.roast_event.map((event) => {
              return (
                <ListItem key={event.id} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src="/coffee-being-roasted.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${event.type} ${event.started_when} ${
                      event.ended_when ? event.ended_when : "--"
                    }`}
                    secondary={
                      <Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: "text.primary", display: "inline" }}
                        >
                          Notes:
                        </Typography>
                        {event.notes}
                      </Fragment>
                    }
                  />
                  <Button
                    disabled={disableEvents()}
                    onClick={() => {
                      console.log(`clicked ${event.id}`);
                    }}
                  >
                    Edit
                  </Button>
                </ListItem>
              );
            })}
          </List>
          <Button
            disabled={disableEvents()}
            onClick={async () => {
              setOpenNewEventModal(true);
            }}
          >
            Add Event
          </Button>
          <Button
            disabled={disableEndRoast()}
            onClick={async () => {
              await endRoast();
            }}
          >
            End Roast
          </Button>
          <Button
            onClick={async () => {
              setOpenDeleteRoastModal(true);
              // await deleteRoast();
            }}
          >
            Delete Roast
          </Button>
          <RoastBar />
        </>
      )}
      <CoffeRoastingModal
        open={openNewEventModal}
        setOpen={setOpenNewEventModal}
        title={<Typography>New Event</Typography>}
        content={
          <>
            <TextField
              // disabled={disableForm()}
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
    </CoffeeRoastingMenu>
  );
};
