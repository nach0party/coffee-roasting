import React, { useCallback, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CoffeeRoastingMenu } from "../../components/menu";
import api from "../../api/coffee-roasting-api";
import "./dashboard.css";
import LinearProgress from "@mui/material/LinearProgress";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";

export function CoffeeRoastingDashboard() {
  const [activeRoasts, setActiveRoasts] = useState([]);

  // TODO consider moving this into context, or simplifying
  // the concept of checking for "an active roast"
  const checkForActiveRoasts = useCallback(async () => {
    const response = await api.roasts.list({ has_begun: true });
    setActiveRoasts(response.data.results);
  });

  useEffect(() => {
    const initialize = async () => {
      checkForActiveRoasts();
    };
    initialize();
  }, []);

  // console.log(activeRoasts, "activeRoasts");

  // TODO remove all the inline styling...
  return (
    <CoffeeRoastingMenu hasActiveRoasts={activeRoasts.length > 0}>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Active Roasting Events: ({activeRoasts.length})
        </Typography>
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {activeRoasts.map((roast) => (
            <ActiveRoastCard roast={roast} />
          ))}
        </Grid>

        <Typography variant="h4" gutterBottom>
          Completed Roasts ({activeRoasts.length})
        </Typography>
        <Grid container spacing={3}>
          {activeRoasts.map((roast) => (
            <Grid item xs={12} sm={6} md={4} key={roast.id}>
              <CompletedRoastCard roast={roast} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </CoffeeRoastingMenu>
  );
}

// TODO make inactive roast card...
const ActiveRoastCard = ({ roast }) => {
  console.log(roast, "roast");
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "2px solid orange",
      }}
      className={"active-roast-card"}
    >
      <CardActionArea>
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

// TODO make inactive roast card...
const CompletedRoastCard = ({ roast }) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "2px solid blue",
      }}
      // className={"active-roast-card"}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height={140}
          image="/public/coffee-being-roasted.jpg"
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
