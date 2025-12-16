import { useState } from "react";

import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import api from "../../api/coffee-roasting-api";

export const NoteRoastEvent = ({ roast, event }) => {
  const [notes, setNotes] = useState(event.notes);

  const saveNotes = async () => {
    try {
      await api.roastEvents.partialUpdate(event.id, { notes: notes });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ListItem sx={{ minHeight: 100 }} key={event.id} alignItems="center">
      <ListItemAvatar>
        <Avatar src="/coffee-being-roasted.jpg" />
      </ListItemAvatar>
      <Stack alignItems={"flex-end"} sx={{ width: "100%" }}>
        <ListItemText
          sx={{ width: "100%" }}
          secondary={
            <Typography sx={{ color: "primary.light" }}>Note:</Typography>
          }
        />
        <TextField
          defaultValue={notes}
          sx={{ width: "100%" }}
          onChange={(e) => {
            setNotes(e.target.value);
          }}
          onBlur={async () => {
            await saveNotes();
          }}
          variant="standard"
          fullWidth
        />
      </Stack>
    </ListItem>
  );
};
