import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { formatDate } from "../utils";
// import Button from "@mui/material/Button";

export const BeginRoastEvent = ({ roast, event }) => {
  return (
    <ListItem sx={{ height: 80 }} key={event.id} alignItems="flex-start">
      <ListItemAvatar>
        <Avatar src="/coffee-being-roasted.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary={<Typography>Roast Begins:</Typography>}
        secondary={<Typography>{formatDate(event.started_when)}</Typography>}
      />
      {/* <Button
        onClick={() => {
          console.log("edit clicked");
        }}
      >
        Edit
      </Button>
      <Button
        onClick={() => {
          console.log("remove clicked");
        }}
      >
        Remove
      </Button> */}
    </ListItem>
  );
};
