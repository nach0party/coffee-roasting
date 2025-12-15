import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

export const SecondCrackRoastEvent = ({ event }) => {
  return (
    <ListItem sx={{ height: 80 }} key={event.id} alignItems="flex-start">
      <ListItemAvatar>
        <Avatar src="/coffee-being-roasted.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary={<Typography>test</Typography>}
        secondary={<Typography>test</Typography>}
      />
    </ListItem>
  );
};
