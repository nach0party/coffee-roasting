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

// TODO if this roast is "completed" we should mark everything as read only
export const ManageRoast = () => {
  const params = useParams();
  const id = params.id;

  const [roast, setRoast] = useState();
  const [loading, setLoading] = useState(true);

  const getRoast = useCallback(async () => {
    const response = await api.roasts.get(id);
    setRoast(response.data);
  });

  useEffect(() => {
    const initialize = async () => {
      await getRoast();
      setLoading(false);
    };
    initialize();
  }, []);

  const beginRoast = async () => {
    try {
      await api.roasts.beginRoast(id);
      toast.success("Roast has begun");
    } catch (error) {
      // TODO setup a service for using toast...
      toast.error("There was an error");
      console.error(error);
    }
  };

  const endRoast = async () => {
    try {
      await api.roasts.endRoast(id);
    } catch (error) {
      toast.error("There was an error");
      console.error(error);
    }
  };

  console.log(roast, "roast");

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
              await endRoast();
            }}
          >
            End Roast
          </Button>
        </>
      )}
    </CoffeeRoastingMenu>
  );
};
