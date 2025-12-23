import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { formatStartDate } from "../utils";

export const EmergencyStopEvent = ({ event }) => {
  return (
    <ListItem sx={{ height: 80 }} key={event.id} alignItems="center">
      <ListItemAvatar>
        <Avatar src="/coffee-being-roasted.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography sx={{ color: "primary.light" }}>
            Emergency Stop
          </Typography>
        }
        secondary={
          <Typography>{formatStartDate(event.created_when)}</Typography>
        }
      />
    </ListItem>
  );
};
