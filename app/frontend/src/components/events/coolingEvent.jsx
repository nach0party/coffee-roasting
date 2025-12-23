import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { formatStartDate } from "../utils";
import { allEventTypes } from "./utils";

export const CoolingEvent = ({ event }) => {
  let title = "";
  if (event.type === allEventTypes.COOLING_START) {
    title = "Cooling Starts";
  } else if (event.type === allEventTypes.COOLING_STOP) {
    title = "Cooling Ends";
  }

  return (
    <ListItem sx={{ height: 80 }} key={event.id} alignItems="center">
      <ListItemAvatar>
        <Avatar src="/coffee-being-roasted.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography sx={{ color: "primary.light" }}>{title}</Typography>
        }
        secondary={
          <Typography>{formatStartDate(event.created_when)}</Typography>
        }
      />
    </ListItem>
  );
};
