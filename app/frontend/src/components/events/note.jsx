import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { formatDate } from "../utils";
import TextField from "@mui/material/TextField";

export const NoteRoastEvent = ({ roast, event }) => {
  return (
    <ListItem sx={{ height: 80 }} key={event.id} alignItems="flex-start">
      <ListItemAvatar>
        <Avatar src="/coffee-being-roasted.jpg" />
      </ListItemAvatar>
      <ListItemText
        sx={{ width: 450 }}
        primary={<Typography>Note</Typography>}
        secondary={
          <Typography>
            {event.started_when ? formatDate(event.started_when) : "-- "}
            {event.ended_when ? formatDate(event.ended_when) : "-- "}
          </Typography>
        }
      />
      <TextField
        label="Notes"
        defaultValue={""}
        // helperText={`Feel free to leave any general notes`}
        fullWidth
        multiline
        variant="outlined"
        // rows="4"
        slotProps={{
          input: {
            sx: {
              resize: "vertical",
              // minHeight: 100,
              // maxHeight: 400,
            },
          },
        }}
      />
    </ListItem>
  );
};
