import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LinearProgress from "@mui/material/LinearProgress";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";

/***
 * Handles completed roasts, more or less
 * a card to manage a roast in general.
 */
export const CompletedRoastCard = ({ roast }) => {
  let navigate = useNavigate();

  const openRoast = (id) => {
    navigate(`/roast/${id}`);
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "2px solid blue",
      }}
    >
      <CardActionArea
        onClick={() => {
          openRoast(roast.id);
        }}
      >
        <CardMedia
          component="img"
          height={140}
          image="/coffee-being-roasted.jpg"
        />
      </CardActionArea>
      <CardContent>
        <Typography variant="h6" component="div">
          {roast.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          Status: {"In Progress"}
        </Typography>

        <Box sx={{ mt: 2 }}>
          {/** Roast temp / time would be awesome, expected time and the expected temp */}
          <Typography variant="caption" color="primary">
            Current Temp: 455 | Time Elapsed: 12:50
          </Typography>
          <LinearProgress
            variant="determinate"
            value={"50"} // TODO figure out how to determine general progress based on time, start collectin averages
            color="warning"
            sx={{ height: 10, borderRadius: 5, mt: 1 }}
          />
          <Typography variant="body2" align="right">
            {roast.progress}%
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Final Temp: {roast.temp} | Total Time: {roast.time}
        </Typography>
      </CardContent>
    </Card>
  );
};
