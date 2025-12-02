import React, { useEffect, useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";

import Grid from "@mui/material/Grid";
import api from "../../api/coffee-roasting-api";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { CoffeeRoastingMenu } from "../../components/menu";

// TODO if this roast is "completed" we should mark everything as read only
export const ManageRoast = () => {
  const params = useParams();
  const id = params.id;
  const [notes, setNotes] = useState();

  const getRoast = useCallback(async () => {
    const response = await api.roasts.get(id);
    setNotes(response.data.notes);
  });

  useEffect(() => {
    const initialize = async () => {
      await getRoast();
    };
    initialize();
  }, []);

  const beginRoast = async () => {
    try {
      const response = await api.roasts.beginRoast(id);
      console.log(response, "response");
    } catch (error) {
      // TODO setup a service for using toast...
      console.log(error?.response?.data, "error");
      toast.error("test");
      console.error(error);
    }
  };

  return (
    <CoffeeRoastingMenu>
      <Grid>Start Roast</Grid>
      <Grid>
        <Typography>Notes</Typography>
        <TextField value={notes} />
      </Grid>
      <Button
        onClick={async () => {
          await beginRoast();
        }}
      >
        Begin
      </Button>
    </CoffeeRoastingMenu>
  );
};
