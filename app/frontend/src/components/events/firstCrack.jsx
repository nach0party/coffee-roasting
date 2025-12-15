import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { formatDate } from "../utils";

export const FirstCrackRoastEvent = ({ event }) => {
  return (
    <ListItem sx={{ height: 80 }} key={event.id} alignItems="flex-start">
      <ListItemAvatar>
        <Avatar src="/coffee-being-roasted.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary={<Typography>Roast Begins:</Typography>}
        secondary={<Typography>{formatDate(event.started_when)}</Typography>}
      />
    </ListItem>
  );
};
