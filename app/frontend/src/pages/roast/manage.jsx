import React, { useEffect, useCallback, useState } from "react";

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
import { useParams } from "react-router";

import { CoffeeRoastingMenu } from "../../components/menu";
import CoffeRoastingModal from "../../components/modal";
import MenuItem from "@mui/material/MenuItem";

// TODO if this roast is "completed" we should mark everything as read only
export const ManageRoast = () => {
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

  /***
   * Only allow events if we've started a raost but have not dropped / completed it.
   */
  const disableEvents = () => {
    if (roast.started_when && !roast.ended_when) {
      return false;
    }
    return true;
  };

  console.log(roast, "roast");
  console.log(currentEvent, "currentEvent");
  console.log(selectedEventType, "selectedEventType");

  // https://mui.com/x/react-charts/ definitely want to leverage this
  // TODO need a bean component
  // TODO need roast events / add / edit events
  return (
    <CoffeeRoastingMenu>
      {!loading && (
        <>
          <Button
            onClick={async () => {
              await beginRoast();
            }}
            disabled={roast.started_when}
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
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: "text.primary", display: "inline" }}
                        >
                          Notes:
                        </Typography>
                        {event.notes}
                      </React.Fragment>
                    }
                  />
                  <Button
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
            onClick={async () => {
              setOpenNewEventModal(true);
            }}
          >
            Add Event
          </Button>
          <Button
            onClick={async () => {
              await endRoast();
            }}
          >
            End Roast
          </Button>
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
    </CoffeeRoastingMenu>
  );
};
