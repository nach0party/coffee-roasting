import React, { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router";

import { CoffeeRoastingMenu } from "../../components/menu";
import Grid from "@mui/material/Grid";
import api from "../../api/coffee-roasting-api";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// TODO if this roast is "completed" we should mark everything as read only
export const ManageRoast = () => {
  const params = useParams();
  const id = params.id;

  const [notes, setNotes] = useState();

  const getRoast = useCallback(async () => {
    const response = await api.roasts.get(id);
    setNotes(response.data.notes);
    console.log(response, "response");
  });

  useEffect(() => {
    const initialize = async () => {
      await getRoast();
    };
    initialize();
  }, []);

  console.log(id, "id");

  return (
    <CoffeeRoastingMenu>
      <Grid>Start Roast</Grid>
      <Grid>
        <Typography>Notes</Typography>
        <TextField value={notes} />
      </Grid>
      <Button>Start</Button>
    </CoffeeRoastingMenu>
  );
};
